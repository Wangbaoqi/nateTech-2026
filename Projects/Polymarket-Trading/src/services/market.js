const axios = require('axios');
const { toET, formatET } = require('../utils/time');
const dayjs = require('dayjs');

// API Endpoints
const GAMMA_API = "https://gamma-api.polymarket.com/markets";
const CLOB_API = "https://clob.polymarket.com/book";

/**
 * 扫描活跃市场
 * @param {number} limit 
 * @param {boolean} filterNoise - 是否过滤短线噪音(默认true)。策略端如果专门做短线，请传false。
 */
async function scanActiveMarkets(limit = 5, filterNoise = true) {
    try {
        const desc = filterNoise ? "过滤短线" : "保留全部";
        console.log(`[Scanner] 正在扫描热门市场 (深度: ${limit}, ${desc})...`);
        
        const { data } = await axios.get(GAMMA_API, {
            params: {
                limit: limit, 
                active: true,
                closed: false,
                order: 'liquidity', 
                descending: true
            }
        });

        // 过滤逻辑
        let filtered = data;
        if (filterNoise) {
            filtered = data.filter(m => {
                const title = m.question.toLowerCase();
                const isShortTermNoise = title.includes("up or down") || title.includes("5m") || title.includes("15m");
                return !isShortTermNoise;
            });
            console.log(`[Scanner] 原始数据: ${data.length} 条 | 过滤后: ${filtered.length} 条`);
        } else {
            console.log(`[Scanner] 原始数据: ${data.length} 条 (无过滤)`);
        }

        const targetMarkets = filtered; 
        // 注意：这里就不再做 slice(0, limit) 了，因为 API 已经限流了，且我们在外部控制 limit

        return targetMarkets.map(m => {
            const endET = m.endDate ? toET(m.endDate) : null;
            return {
                id: m.id,
                conditionId: m.conditionId, 
                question: m.question,
                slug: m.slug,
                tokenIds: m.clobTokenIds ? JSON.parse(m.clobTokenIds) : [],
                prices: m.outcomePrices,
                volume: m.volume,
                endDateRaw: m.endDate, 
                startDateRaw: m.startDate, 
                endDateET: endET ? formatET(endET) : 'N/A',
                isExpiringSoon: endET ? endET.diff(dayjs(), 'hour') < 24 : false
            };
        });
    } catch (e) {
        console.error("[Scanner] Error:", e.message);
        return [];
    }
}

/**
 * 深度分析与滑点计算
 * @param {string} tokenId - CLOB Token ID
 * @param {number} amountUSD - 模拟交易金额
 */
async function analyzeDepth(tokenId, amountUSD = 1000) {
    try {
        const { data } = await axios.get(CLOB_API, {
            params: { token_id: tokenId }
        });

        const { bids, asks } = data;
        if (!asks || asks.length === 0) return { error: "No liquidity (Asks empty)" };

        // 1. 基础价差
        const bestBid = bids.length ? parseFloat(bids[0].price) : 0;
        const bestAsk = parseFloat(asks[0].price);
        const spread = bestBid > 0 ? (bestAsk - bestBid) : 0;
        const spreadPercent = bestBid > 0 ? ((spread / bestAsk) * 100).toFixed(2) : "N/A";

        // 2. 模拟滑点
        let spent = 0;
        let acquired = 0;
        
        for (const order of asks) {
            const p = parseFloat(order.price);
            const s = parseFloat(order.size);
            
            if (spent + (p * s) <= amountUSD) {
                spent += p * s;
                acquired += s;
            } else {
                const remain = amountUSD - spent;
                spent += remain;
                acquired += remain / p;
                break; 
            }
        }

        const avgPrice = acquired > 0 ? (spent / acquired) : bestAsk;
        const slippage = ((avgPrice - bestAsk) / bestAsk) * 100;

        return {
            bestBid,
            bestAsk,
            spread: spread.toFixed(4),
            spreadPercent: `${spreadPercent}%`,
            slippage: `${slippage.toFixed(3)}% (on $${amountUSD} buy)`,
            avgEntryPrice: avgPrice.toFixed(4)
        };

    } catch (e) {
        console.error("[Analyzer] Error:", e.message);
        return { error: e.message };
    }
}

module.exports = {
    scanActiveMarkets,
    analyzeDepth
};
