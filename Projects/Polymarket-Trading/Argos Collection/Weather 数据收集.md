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

## 3. Redis存储数据结构


|         | open |     |     |     |
| ------- | ---- | --- | --- | --- |
| beijing |      |     |     |     |
