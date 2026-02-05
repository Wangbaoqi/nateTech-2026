require('dotenv').config(); // 加载 .env 环境变量 (私钥/API Key)
const { ethers } = require('ethers'); // 以太坊库 (v5)
const { ClobClient } = require('@polymarket/clob-client'); // Polymarket 官方 SDK
const axios = require('axios'); // HTTP 请求库
const fs = require('fs'); // 文件系统
const path = require('path'); // 路径处理

/**
 * 🤖 Polymarket "Theta Eater" Bot (v3.1 - 注释版)
 * ------------------------------------------------
 * 策略名称: 时间吞噬者 (Theta Eater)
 * 目标市场: 加密货币 15分钟 超短线预测 (Crypto 15m Markets)
 * 核心逻辑: 做空波动率。在临近到期时，如果现价距离目标价有安全距离，买入 "No" (赌不会突破)。
 * 当前模式: Paper Trading (模拟盘) - 只记录日志，不消耗资金。
 */

// --- 全局配置 ---
const CONFIG = {
    CHAIN_ID: 137, // Polygon Mainnet ID
    RPC_URL: "https://polygon-rpc.com", // 节点地址
    
    // 资金管理
    MAX_POSITION_USDC: parseFloat(process.env.MAX_POSITION_USDC || 10), // 单笔最大投入 ($)
    MIN_PROFIT_MARGIN: 0.04, // 最小利润空间 (即买入 No 价格 <= $0.96)
    
    // 策略参数 (核心风控)
    TIME_WINDOW: { MIN: 120, MAX: 300 }, // 窗口期: 倒数 2分钟 - 5分钟 (太早没肉，太晚没流动性)
    PRICE_GAP: { MIN: 0.0015, MAX: 0.0050 }, // 安全边际: 0.15% - 0.5% (太近容易穿仓，太远价格归零)
    
    // 外部数据源
    BINANCE_API: "https://api.binance.com/api/v3/ticker/price",
    
    // 日志路径
    LOG_FILE: path.join(__dirname, '../result.json')
};

class ThetaEater {
    constructor() {
        this.wallet = null;      // Ethers 钱包实例
        this.clobClient = null;  // Polymarket SDK 客户端
        this.activeOrders = new Set(); // 本地锁：防止对同一个 ConditionID 重复下单
    }

    /**
     * 初始化：连接钱包与交易所
     */
    async init() {
        console.log("🔌 Connecting (Paper Mode)...");
        
        // 1. 连接 Polygon 网络 (Ethers v5 写法)
        const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        
        // 2. 准备 API 凭证
        const creds = {
            key: process.env.POLYMARKET_API_KEY,
            secret: process.env.POLYMARKET_API_SECRET,
            passphrase: process.env.POLYMARKET_API_PASSPHRASE
        };

        // 3. 初始化 CLOB Client (L2 下单专用)
        this.clobClient = new ClobClient(
            "https://clob.polymarket.com",
            CONFIG.CHAIN_ID,
            this.wallet,
            creds
        );
        
        console.log(`✅ Bot Ready: ${this.wallet.address}`);
        console.log(`📝 Logging to: ${CONFIG.LOG_FILE}`);
    }

    /**
     * 启动主循环
     */
    async run() {
        await this.init();
        // 设置定时器: 每 5 秒执行一次完整扫描
        setInterval(() => this.scanCycle(), 5000);
        console.log("🚀 Scanning for Theta opportunities...");
    }

    /**
     * 核心循环: 扫描 -> 评估 -> (记录/下单)
     */
    async scanCycle() {
        try {
            // 1. 获取 Binance 实时价格 (ETH)
            const ethPrice = await this.getBinancePrice("ETHUSDT");
            
            // 2. 获取当前活跃的 15m 市场 (Slug Sniper)
            const markets = await this.fetchActive15mMarkets();
            
            // 3. 遍历评估 (目前主要针对 ETH)
            for (const m of markets) {
                if (m.question.includes("ETH")) {
                    await this.evaluate(m, ethPrice);
                }
            }
        } catch (e) {
            console.error(`⚠️ Scan Cycle Error: ${e.message}`);
        }
    }

    /**
     * 获取目标市场: 使用 "Slug Sniper" 算法精准定位
     * 不再扫描整个列表，而是计算下一个到期的时间戳直接请求
     */
    async fetchActive15mMarkets() {
        try {
            // A. 计算下一个 15 分钟刻度 (UTC)
            const now = new Date();
            const minutes = now.getUTCMinutes();
            // 向上取整到最近的 15, 30, 45, 60
            const nextQuarter = Math.ceil((minutes + 1) / 15) * 15; 
            
            const targetDate = new Date(now);
            targetDate.setUTCMinutes(nextQuarter, 0, 0); // 设置为整分0秒
            
            // 如果计算出的时间太近 (小于最小窗口)，直接跳到再下一个刻度
            if (targetDate.getTime() < now.getTime() + CONFIG.TIME_WINDOW.MIN * 1000) {
                targetDate.setUTCMinutes(targetDate.getUTCMinutes() + 15);
            }

            const timestamp = Math.floor(targetDate.getTime() / 1000);
            
            // B. 拼接 Slug (例如: eth-updown-15m-1770280200)
            const slug = `eth-updown-15m-${timestamp}`;
            
            // C. 请求 Gamma API (REST)
            const url = `https://gamma-api.polymarket.com/markets?slug=${slug}`;
            const res = await axios.get(url);
            
            // 如果返回空，说明该时间点的市场还没创建(或还没开放)
            if (!res.data || res.data.length === 0) return [];

            const m = res.data[0];
            
            // D. 数据清洗: 提取关键的 Token ID (用于下单)
            // Gamma API 返回的 clobTokenIds 是个 JSON 字符串
            let noTokenId = null;
            if (m.clobTokenIds) {
                try {
                    const ids = JSON.parse(m.clobTokenIds);
                    // [0] = Yes/Up, [1] = No/Down
                    // 我们的策略是买 No，所以取下标 1
                    if (Array.isArray(ids) && ids.length > 1) {
                        noTokenId = ids[1]; 
                    }
                } catch(e) {
                    console.error("Token ID Parse Error:", e.message);
                }
            }

            // 返回精简结构
            return [{
                conditionId: m.conditionId,
                question: m.question,
                endDate: m.endDate, // 到期时间 (ISO)
                startDate: m.startDate, // 开始时间 (ISO)
                noTokenId: noTokenId 
            }];

        } catch (e) { 
            // 404 是正常现象(市场未生成)，其他错误需关注
            if (e.response && e.response.status !== 404) {
                console.error("Fetch Error:", e.message);
            }
            return []; 
        }
    }

    /**
     * 策略评估核心: 决定买不买
     */
    async evaluate(market, currentPrice) {
        // 基础检查: 如果没有 Token ID，无法交易
        if (!market.noTokenId) return;

        // 1. 计算剩余时间 (秒)
        const timeLeft = (new Date(market.endDate).getTime() - Date.now()) / 1000;
        
        // 2. 确定 Strike Price (行权价/基准价)
        let strikePrice = this.extractStrikePrice(market.question);

        // 如果标题里没写具体数字 (Up/Down 类型)，则去 Binance 查历史 K 线
        if (!strikePrice && (market.question.includes("Up or Down") || market.question.includes("Up/Down"))) {
            const startTime = new Date(market.startDate).getTime();
            strikePrice = await this.getBinanceHistoricalPrice("ETHUSDT", startTime);
        }

        if (!strikePrice) return; // 无法确定基准价，跳过

        // 3. 方向判断: 只做 OTM (虚值)
        // 只有当 [现价 < 目标价] 时，Up 获胜概率低，No (Down) 获胜概率高
        if (currentPrice >= strikePrice) return; // 此时是 ITM，不做

        // 4. 计算价差比例 (Gap)
        const gap = (strikePrice - currentPrice) / currentPrice;
        
        // 实时输出监控状态
        process.stdout.write(`\r👀 Watching: Gap ${(gap*100).toFixed(3)}% | Time ${timeLeft.toFixed(0)}s`);

        // 5. Gap 过滤
        if (gap < CONFIG.PRICE_GAP.MIN || gap > CONFIG.PRICE_GAP.MAX) return;

        // 6. 检查 Orderbook (是否有便宜筹码)
        try {
            const ob = await this.clobClient.getOrderBook(market.noTokenId);
            // 检查卖单 (Asks)
            if (!ob.asks || ob.asks.length === 0) return;

            const bestAsk = parseFloat(ob.asks[0].price); // 最低卖价
            const profit = 1 - bestAsk; // 如果赢了能赚多少 (1 - 成本)

            // 7. 利润达标 -> 触发信号
            if (profit >= CONFIG.MIN_PROFIT_MARGIN) {
                await this.logOpportunity(market, bestAsk, profit, timeLeft, gap, currentPrice, strikePrice);
            }
        } catch (e) {
            // 网络抖动忽略
        }
    }

    /**
     * 记录交易信号 (Paper Trading)
     */
    async logOpportunity(market, price, profit, timeLeft, gap, currentPrice, strike) {
        // 防止重复刷屏
        if (this.activeOrders.has(market.conditionId)) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            question: market.question,
            action: "BUY NO", // 策略固定动作
            price_no: price,
            profit_per_share: profit.toFixed(4),
            gap_percent: (gap * 100).toFixed(4),
            time_left_sec: timeLeft.toFixed(0),
            market_price: currentPrice,
            strike_price: strike,
            result: "PAPER_TRADE" // 标记为模拟
        };

        console.log(`\n🎯 OPPORTUNITY FOUND: ${JSON.stringify(logEntry)}`);
        
        // 写入文件
        fs.appendFileSync(CONFIG.LOG_FILE, JSON.stringify(logEntry) + ",\n");

        // 锁定该市场 60秒，防止重复记录
        this.activeOrders.add(market.conditionId);
        setTimeout(() => this.activeOrders.delete(market.conditionId), 60000);
    }

    // --- 辅助函数 ---

    /**
     * 从 Binance 获取指定时间的历史开盘价
     */
    async getBinanceHistoricalPrice(symbol, timestampMs) {
        try {
            const url = `https://api.binance.com/api/v3/klines`;
            const res = await axios.get(url, {
                params: {
                    symbol: symbol,
                    interval: '1m',
                    startTime: timestampMs, // 传入开始时间
                    limit: 1 // 只取一根 K 线
                }
            });
            if (res.data && res.data.length > 0) {
                // K线数据格式: [Open time, Open, High, Low, Close, ...]
                return parseFloat(res.data[0][1]); // 取 Open Price
            }
            return null;
        } catch (e) { return null; }
    }

    /**
     * 从标题提取目标价 (例如 "above $2500")
     */
    extractStrikePrice(q) {
        const match = q.match(/\$(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : null;
    }

    /**
     * 获取 Binance 实时价格
     */
    async getBinancePrice(symbol) {
        try {
            const res = await axios.get(`${CONFIG.BINANCE_API}?symbol=${symbol}`);
            return parseFloat(res.data.price);
        } catch (e) { return 0; }
    }
}

// 启动机器人
new ThetaEater().run();
