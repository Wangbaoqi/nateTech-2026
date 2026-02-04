require('dotenv').config();
const { ethers } = require('ethers');
const { ClobClient, Side } = require('@polymarket/clob-client');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * 🤖 Polymarket "Theta Eater" Bot (Paper Trading Mode)
 * Log results to result.json instead of trading.
 */

const CONFIG = {
    CHAIN_ID: 137,
    RPC_URL: "https://polygon-rpc.com",
    MAX_POSITION_USDC: parseFloat(process.env.MAX_POSITION_USDC || 10),
    MIN_PROFIT_MARGIN: 0.04,
    
    TIME_WINDOW: { MIN: 120, MAX: 300 }, 
    PRICE_GAP: { MIN: 0.0015, MAX: 0.0050 }, 
    
    BINANCE_API: "https://api.binance.com/api/v3/ticker/price",
    LOG_FILE: path.join(__dirname, '../result.json') // 结果保存路径
};

class ThetaEater {
    constructor() {
        this.wallet = null;
        this.clobClient = null;
        this.activeOrders = new Set(); 
    }

    async init() {
        console.log("🔌 Connecting (Paper Mode)...");
        const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        
        const creds = {
            key: process.env.POLYMARKET_API_KEY,
            secret: process.env.POLYMARKET_API_SECRET,
            passphrase: process.env.POLYMARKET_API_PASSPHRASE
        };

        this.clobClient = new ClobClient(
            "https://clob.polymarket.com",
            CONFIG.CHAIN_ID,
            this.wallet,
            creds
        );
        
        console.log(`✅ Bot Ready: ${this.wallet.address}`);
        console.log(`📝 Logging opportunities to: ${CONFIG.LOG_FILE}`);
    }

    async run() {
        await this.init();
        // 5秒扫描一次
        setInterval(() => this.scanCycle(), 5000);
        console.log("🚀 Scanning for Theta opportunities...");
    }

    async scanCycle() {
        try {
            const [ethPrice, btcPrice] = await Promise.all([
                this.getBinancePrice("ETHUSDT"),
                this.getBinancePrice("BTCUSDT")
            ]);

            const markets = await this.fetchActive15mMarkets();
            
            if (markets.length > 0) {
                // console.log(`🔍 Scanned ${markets.length} market. ETH: $${ethPrice}`);
            }

            for (const m of markets) {
                const currentPrice = m.question.includes("ETH") ? ethPrice : btcPrice;
                await this.evaluate(m, currentPrice);
            }

        } catch (e) {
            console.error(`\n⚠️ Scan Error: ${e.message}`);
        }
    }

    async fetchActive15mMarkets() {
        try {
            // Slug Sniper (UTC)
            const now = new Date();
            const minutes = now.getUTCMinutes();
            const nextQuarter = Math.ceil((minutes + 1) / 15) * 15; 
            
            const targetDate = new Date(now);
            targetDate.setUTCMinutes(nextQuarter, 0, 0);
            
            if (targetDate.getTime() < now.getTime() + CONFIG.TIME_WINDOW.MIN * 1000) {
                targetDate.setUTCMinutes(targetDate.getUTCMinutes() + 15);
            }

            const timestamp = Math.floor(targetDate.getTime() / 1000);
            const slug = `eth-updown-15m-${timestamp}`;
            
            const url = `https://gamma-api.polymarket.com/markets?slug=${slug}`;
            const res = await axios.get(url);
            
            if (!res.data || res.data.length === 0) return [];

            const m = res.data[0];
            return [{
                conditionId: m.conditionId,
                question: m.question,
                endDate: m.endDate,
                noTokenId: m.tokens?.[1]?.tokenId
            }];

        } catch (e) {
            return [];
        }
    }

    async evaluate(market, currentPrice) {
        if (!market.noTokenId) return;

        const timeLeft = (new Date(market.endDate).getTime() - Date.now()) / 1000;
        const strike = this.extractStrikePrice(market.question);
        if (!strike) return;

        if (currentPrice >= strike) return; 

        const gap = (strike - currentPrice) / currentPrice;
        
        // 日志: 即使没达到阈值，也可以打个 log 看看当前 Gap
        process.stdout.write(`\r👀 Watching: Gap ${(gap*100).toFixed(3)}% | Time ${timeLeft.toFixed(0)}s`);

        if (gap < CONFIG.PRICE_GAP.MIN || gap > CONFIG.PRICE_GAP.MAX) return;

        try {
            const ob = await this.clobClient.getOrderBook(market.noTokenId);
            if (!ob.asks || ob.asks.length === 0) return;

            const bestAsk = parseFloat(ob.asks[0].price); 
            const profit = 1 - bestAsk; 

            if (profit >= CONFIG.MIN_PROFIT_MARGIN) {
                await this.logOpportunity(market, bestAsk, profit, timeLeft, gap, currentPrice, strike);
            }
        } catch (e) {}
    }

    async logOpportunity(market, price, profit, timeLeft, gap, currentPrice, strike) {
        if (this.activeOrders.has(market.conditionId)) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            question: market.question,
            action: "BUY NO",
            price_no: price,
            profit_per_share: profit.toFixed(4),
            gap_percent: (gap * 100).toFixed(4),
            time_left_sec: timeLeft.toFixed(0),
            market_price: currentPrice,
            strike_price: strike,
            result: "PAPER_TRADE"
        };

        console.log(`\n🎯 PAPER TRADE RECORDED: ${JSON.stringify(logEntry)}`);

        // 追加写入文件
        fs.appendFileSync(CONFIG.LOG_FILE, JSON.stringify(logEntry) + ",\n");

        this.activeOrders.add(market.conditionId);
        setTimeout(() => this.activeOrders.delete(market.conditionId), 60000);
    }

    extractStrikePrice(q) {
        const match = q.match(/\$(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : null;
    }

    async getBinancePrice(symbol) {
        try {
            const res = await axios.get(`${CONFIG.BINANCE_API}?symbol=${symbol}`);
            return parseFloat(res.data.price);
        } catch (e) { return 0; }
    }
}

new ThetaEater().run();
