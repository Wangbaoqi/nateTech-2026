require('dotenv').config();
const { ethers } = require('ethers');
const { ClobClient } = require('@polymarket/clob-client');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { scanActiveMarkets } = require('./services/market');

const CONFIG = {
    CHAIN_ID: 137, 
    RPC_URL: "https://polygon-rpc.com", 
    LOG_FILE: path.join(__dirname, '../result.json'),
    BINANCE_API: "https://api.binance.com/api/v3/ticker/price"
};

class ThetaEater {
    constructor() {
        this.wallet = null;      
        this.clobClient = null;  
        this.activeOrders = new Set(); 
    }

    async init() {
        console.log("🔌 Connecting (Paper Mode)...");
        if (!process.env.PRIVATE_KEY) {
            console.warn("⚠️  WARNING: PRIVATE_KEY not found. Using random wallet.");
        }

        const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);
        this.wallet = process.env.PRIVATE_KEY 
            ? new ethers.Wallet(process.env.PRIVATE_KEY, provider)
            : ethers.Wallet.createRandom().connect(provider);

        const creds = {
            key: process.env.POLYMARKET_API_KEY || "",
            secret: process.env.POLYMARKET_API_SECRET || "",
            passphrase: process.env.POLYMARKET_API_PASSPHRASE || ""
        };

        this.clobClient = new ClobClient(
            "https://clob.polymarket.com",
            CONFIG.CHAIN_ID,
            this.wallet,
            creds
        );
        console.log(`✅ Bot Ready: ${this.wallet.address}`);
    }

    async run() {
        await this.init();
        this.scanCycle(); 
        setInterval(() => this.scanCycle(), 5000);
        console.log("🚀 Scanning for Theta opportunities...");
    }

    async scanCycle() {
        try {
            // 1. 获取价格 (并行启动，稍微快一点)
            // 更好的做法是接 Binance WebSocket，但目前先优化流程
            const [ethPrice, markets] = await Promise.all([
                this.getBinancePrice("ETHUSDT"),
                this.fetchActive15mMarkets()
            ]);

            console.log(`[Cycle] ETH: $${ethPrice} | Active Markets: ${markets.length}`);

            // 2. 并发评估 (Parallel Evaluation)
            // 不再使用 for...of await，而是 map + Promise.all
            // 这样 20 个市场的网络请求会同时发出
            const evaluationPromises = markets.map(m => this.evaluate(m, ethPrice));
            
            // 等待所有评估完成 (或者其实不需要等待，让它们各自跑也行，为了日志整洁还是等一下)
            await Promise.all(evaluationPromises);

        } catch (e) {
            console.error(`⚠️ Scan Cycle Error: ${e.message}`);
        }
    }

    // 宽松版 Fetch: 只要是 ETH Up/Down 全抓回来，evaluate 里再细分
    async fetchActive15mMarkets() {
        try {
            const rawMarkets = await scanActiveMarkets(300, false);
            const targets = rawMarkets.filter(m => {
                const q = m.question.toLowerCase();
                return (q.includes("ethereum") || q.includes("eth")) && (q.includes("up or down"));
            });
            return targets.map(m => ({
                id: m.id,
                question: m.question,
                startDate: m.startDateRaw,
                endDate: m.endDateRaw,
                tokenIds: m.tokenIds
            }));
        } catch (e) { return []; }
    }

    async evaluate(market, currentPrice) {
        if (!market.endDate || !market.startDate) return;
        
        const now = Date.now();
        const startTime = new Date(market.startDate).getTime();
        const endTime = new Date(market.endDate).getTime();
        const timeLeft = (endTime - now) / 1000;

        // 状态过滤: 只看正在进行中 (Live) 且还没结束的
        if (now < startTime) return; // 还没开始
        if (timeLeft <= 0) return;   // 已经结束

        // 2. 获取基准价 (Start Price)
        const startPrice = await this.getBinanceHistoricalPrice("ETHUSDT", startTime);
        if (!startPrice) return;

        // 3. 判定当前趋势
        const isWinningUp = currentPrice >= startPrice;
        const delta = currentPrice - startPrice;
        const deltaPercent = (delta / startPrice) * 100;

        // 4. 策略逻辑: 仅在临期 ( < 10分钟 ) 介入
        if (timeLeft > 600) {
             // process.stdout.write(`\r⏳ Waiting... ${market.question.substring(0,15)} | ${timeLeft.toFixed(0)}s left`);
             return;
        }

        if (!market.tokenIds || market.tokenIds.length < 2) return;
        const tokenIdUp = market.tokenIds[0];
        const tokenIdDown = market.tokenIds[1];

        // 确定顺势方向
        let targetTokenId, targetDirection;
        
        // 安全垫: 至少偏离 0.1% 才认为趋势确立
        if (Math.abs(deltaPercent) < 0.1) {
            process.stdout.write(`\r⚖️ [Flat] ${timeLeft.toFixed(0)}s left | Delta ${deltaPercent.toFixed(3)}% (Risky)`);
            return;
        }

        if (isWinningUp) {
            targetTokenId = tokenIdUp;
            targetDirection = "BUY UP (Yes)";
        } else {
            targetTokenId = tokenIdDown;
            targetDirection = "BUY DOWN (No)";
        }

        // 5. 检查盘口
        try {
            const ob = await this.clobClient.getOrderBook(targetTokenId);
            if (!ob.asks || ob.asks.length === 0) return;

            const bestAsk = parseFloat(ob.asks[0].price);

            // 策略核心: 捡漏
            // 胜率极高时，如果你能以 < 0.92 买入，那就是送钱
            if (bestAsk < 0.92) {
                 await this.logOpportunity({
                    question: market.question,
                    direction: targetDirection,
                    price: bestAsk,
                    startPrice: startPrice,
                    currentPrice: currentPrice,
                    delta: deltaPercent.toFixed(4) + "%",
                    timeLeft: timeLeft.toFixed(0) + "s"
                 });
            } else {
                process.stdout.write(`\r👀 [Watch] ${targetDirection} @ $${bestAsk} | Delta ${deltaPercent.toFixed(3)}%`);
            }
        } catch (e) {
            // ignore
        }
    }

    async logOpportunity(data) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...data,
            result: "PAPER_TRADE"
        };
        console.log(`\n💰 SIGNAL: ${JSON.stringify(logEntry)}`);
        fs.appendFileSync(CONFIG.LOG_FILE, JSON.stringify(logEntry) + ",\n");
    }

    async getBinanceHistoricalPrice(symbol, timestampMs) {
        try {
            const url = `https://api.binance.com/api/v3/klines`;
            const res = await axios.get(url, {
                params: {
                    symbol: symbol,
                    interval: '1m',
                    startTime: timestampMs, 
                    limit: 1 
                }
            });
            if (res.data && res.data.length > 0) {
                return parseFloat(res.data[0][1]); 
            }
            return null;
        } catch (e) { return null; }
    }

    async getBinancePrice(symbol) {
        try {
            const res = await axios.get(`${CONFIG.BINANCE_API}?symbol=${symbol}`);
            return parseFloat(res.data.price);
        } catch (e) { return 0; }
    }
}

new ThetaEater().run();
