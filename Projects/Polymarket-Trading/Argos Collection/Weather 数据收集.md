# 多数据源天气预测收集方案分析

本文档基于 `weather_flow_plus.js` 脚本的分析，总结了目前获取天气预测数据的几种方式、API 细节，并对代码进行了重构设计。

## 1. 数据源概览与 API 详情

### 1.1 Wunderground (网页数据抓取)
- **官网**: [https://www.wunderground.com/](https://www.wunderground.com/)
- **API文档**: 无官方免费 API，脚本采用的是直接抓取网页 HTML 并解析内部 JSON 状态。
- **调用示例**:
  - **入参**: `target.wunderUrl` (如 `https://www.wunderground.com/forecast/us/...`)。请求头需携带浏览器 `User-Agent`，且经常需要使用代理。
  - **出参解释**: 脚本提取 `#app-root-state` 节点下的 JSON。核心字段 `b.validTimeLocal` (本地时间戳数组) 与 `b.calendarDayTemperatureMax` (每日最高温度数组，固定为华氏度 F)。
  - **WebSocket (WS) 支持**: 不支持。此为纯 HTTP 抓取。

### 1.2 Open-Meteo
- **官网**: [https://open-meteo.com/](https://open-meteo.com/)
- **API文档**: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)
- **调用示例**:
  - **入参**: `latitude` (纬度), `longitude` (经度), `daily=temperature_2m_max`, `forecast_days=5`, `timezone=auto`, `temperature_unit` (celsius 或 fahrenheit)。
  - **出参解释**: 返回 JSON，`daily.time` (日期字符串数组)，`daily.temperature_2m_max` (最高温度数组)。
  - **WebSocket (WS) 支持**: 不支持。基于 RESTful 架构。

#### 1.2.1 Open-Meteo (多模型 Multi-model)
- **特性**: 允许指定不同气象机构的预测模型（如 ECMWF, GFS, ICON）。
- **调用示例**:
  - **入参**: 在基础入参上增加 `models=ecmwf_ifs025` (或 `gfs_seamless`, `icon_seamless` 等)。
  - **出参解释**: 结构与基础版一致，但数据值基于指定模型计算输出。

### 1.3 MET Norway (挪威气象局)
- **官网**: [https://www.met.no/en](https://www.met.no/en)
- **API文档**: [https://api.met.no/weatherapi/locationforecast/2.0/documentation](https://api.met.no/weatherapi/locationforecast/2.0/documentation)
- **调用示例**:
  - **入参**: `lat` (纬度), `lon` (经度)。**强制要求**请求头包含真实联系方式的 `User-Agent`（如 `news-tracker/1.0 (contact: ...)`）。
  - **出参解释**: 返回逐小时的时间序列数据。需遍历 `properties.timeseries`，提取 `time` (ISO 时间) 和 `data.instant.details.air_temperature` (固定摄氏度 C)，并在客户端按日期聚合找出每日最高温。
  - **WebSocket (WS) 支持**: 不支持。基于 RESTful 架构。

### 1.4 NOAA (美国国家海洋和大气管理局)
- **官网**: [https://www.weather.gov/](https://www.weather.gov/)
- **API文档**: [https://www.weather.gov/documentation/services-web-api](https://www.weather.gov/documentation/services-web-api)
- **调用示例 (两步调用)**:
  - **Step 1 入参**: 经纬度 `https://api.weather.gov/points/{lat},{lon}`。
  - **Step 1 出参**: 返回网格信息 `properties.gridId`, `gridX`, `gridY`。
  - **Step 2 入参**: 使用网格信息请求预测数据 `https://api.weather.gov/gridpoints/{gridId}/{gridX},{gridY}/forecast`。
  - **Step 2 出参**: 返回时间段数组 `properties.periods`。过滤 `isDaytime === true` 的时段，提取 `startTime` 和 `temperature` (固定华氏度 F)。
  - **WebSocket (WS) 支持**: 不支持。基于 RESTful 架构。

---

## 2. 核心数据抽象与公共方法提取

### 2.1 共同数据特征
无论是爬虫还是何种官方 API，它们本质上都需要以下核心特征：
- **公共入参特征**: 
  - `lat` / `lon` (目标经纬度)
  - `tz` (目标城市时区)
  - `unit` (期望的最终温度单位：`C` 摄氏度 或 `F` 华氏度)
- **公共出参特征 (统一格式)**:
  - 为了方便聚合对比，所有方法的最终输出都可以且应该规整为：`Array<{ date: 'YYYY-MM-DD', high: number }>`

### 2.2 公共方法提取设计 (Adapter 模式)
因为所有来源最终都能抽象为 `(TargetConfig) => Promise<DailyForecast[]>`，我们可以提取一个标准的适配器接口 `WeatherAdapter`，让每个 API 实现统一的 `fetch(target)` 方法，将温度转换和数据清洗封装在内部，从而彻底解耦主逻辑。

---

## 3. 脚本重构方案 (面向对象 + Adapter 模式)

下面是重构后的核心代码结构演示，引入了适配器模式和职责单一原则：

```javascript
import axios from 'axios';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';

// ==========================================
// 1. 核心工具类与通用转换
// ==========================================
const TempUtils = {
    fToC: (f) => Math.round((f - 32) * 5 / 9),
    cToF: (c) => Math.round((c * 9 / 5) + 32)
};

// ==========================================
// 2. 基础适配器接口 (Adapter Pattern)
// ==========================================
class BaseWeatherAdapter {
    constructor(name) { this.name = name; }
    /**
     * @param {Object} target { lat, lon, tz, unit, wunderUrl, type }
     * @returns {Promise<Array<{date: string, high: number}>>}
     */
    async fetch(target) { throw new Error('Not implemented'); }
}

// ==========================================
// 3. 具体适配器实现 (各个击破)
// ==========================================

class OpenMeteoAdapter extends BaseWeatherAdapter {
    constructor() { super('open_meteo'); }
    async fetch(target) {
        const unitParam = target.unit === 'F' ? 'fahrenheit' : 'celsius';
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${target.lat}&longitude=${target.lon}&daily=temperature_2m_max&timezone=auto&forecast_days=5&temperature_unit=${unitParam}`;
        const { data } = await axios.get(url, { timeout: 8000 });
        
        return data.daily.time.map((dateStr, i) => ({
            date: dateStr,
            high: Math.round(data.daily.temperature_2m_max[i])
        })).filter(x => x.date && typeof x.high === 'number');
    }
}

class NOAAAdapter extends BaseWeatherAdapter {
    constructor() { super('noaa'); }
    async fetch(target) {
        if (target.type !== 'us') return []; // 仅美国适用
        
        // Step 1: Get Grid
        const pointRes = await axios.get(`https://api.weather.gov/points/${target.lat},${target.lon}`, {
            headers: { 'User-Agent': 'PolyBot_Forecast/1.0' }, timeout: 8000
        });
        const { gridId, gridX, gridY } = pointRes.data.properties;
        
        // Step 2: Get Forecast
        const foreRes = await axios.get(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`, {
            headers: { 'User-Agent': 'PolyBot_Forecast/1.0' }, timeout: 8000
        });

        const seenDates = new Set();
        return foreRes.data.properties.periods
            .filter(p => p.isDaytime)
            .reduce((acc, p) => {
                const dateStr = dayjs(p.startTime).tz(target.tz).format('YYYY-MM-DD');
                if (!seenDates.has(dateStr)) {
                    seenDates.add(dateStr);
                    let temp = p.temperature; // Raw F
                    if (target.unit === 'C') temp = TempUtils.fToC(temp);
                    acc.push({ date: dateStr, high: temp });
                }
                return acc;
            }, []);
    }
}

// TODO: 同理实现 MetNorwayAdapter 和 WundergroundAdapter...
class MetNorwayAdapter extends BaseWeatherAdapter { /* ... */ }
class WundergroundAdapter extends BaseWeatherAdapter { /* ... */ }

// ==========================================
// 4. 重构后的主业务逻辑
// ==========================================
class WeatherForecastCollector {
    constructor(targets) {
        this.targets = targets;
        // 注册已启用的适配器
        this.adapters = [
            new OpenMeteoAdapter(),
            new NOAAAdapter(),
            // new MetNorwayAdapter(),
            // new WundergroundAdapter()
        ];
    }

    async run() {
        for (const target of this.targets) {
            // 并发请求所有适配器
            const results = await Promise.allSettled(
                this.adapters.map(adapter => adapter.fetch(target))
            );

            // 统一的数据聚合视角
            const finalData = {};
            this.adapters.forEach((adapter, index) => {
                const res = results[index];
                if (res.status === 'fulfilled' && res.value.length > 0) {
                    finalData[adapter.name] = res.value;
                }
            });

            console.log(`[${target.station}] 数据采集完成，准备入库 Redis...`, finalData);
            // 这里执行 Redis HMSET 等落库逻辑，数据结构已完全对齐
        }
    }
}
```

### 重构收益
1. **单一职责原则 (SRP)**: 主循环不再关心具体 API 是爬虫还是 HTTP 请求，只负责“调度”和“聚合落库”。
2. **开闭原则 (OCP)**: 若未来需要新增 Apple Weather 或 AccuWeather，只需新增一个 Adapter 放入数组，主逻辑 `run()` 方法一行不改。
3. **数据一致性强**: 强制所有 Adapter 屏蔽内部温度单位转换细节，统一输出标准格式 `Array<{date, high}>`，告别主流程里的 `if (unit === 'C') fToC()` 意大利面条代码。
