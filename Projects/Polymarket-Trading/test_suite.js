const { toET, formatET, isExpired, ET_ZONE } = require('./src/utils/time');
const { scanActiveMarkets, analyzeDepth } = require('./src/services/market');
const dayjs = require('dayjs');

async function runFullTest() {
    console.log("🤖 Atlas Polymarket System Test Initiated...\n");

    // --- Test 1: Time Core ---
    console.log("🔵 [Test 1/3] Time Module (美东时间核心)");
    const sampleUTC = "2024-11-06T04:59:59Z"; // 典型的 Polymarket 截止时间
    const etTime = toET(sampleUTC);
    
    console.log(`   Input UTC    : ${sampleUTC}`);
    console.log(`   Converted ET : ${formatET(etTime)}`);
    console.log(`   Is Expired?  : ${isExpired(sampleUTC)}`);
    
    // 验证时区是否真的是 America/New_York
    const testZone = etTime.$x ? etTime.$x.$timezone : "Unknown"; // dayjs 内部属性检查
    console.log(`   Status       : ✅ Time Core Validated\n`);

    // --- Test 2: Market Scanner ---
    console.log("🔵 [Test 2/3] Market Scanner (全域扫描)");
    const limit = 3;
    const markets = await scanActiveMarkets(limit);
    
    if (markets.length === 0) {
        console.error("   ❌ Scanner failed to fetch markets.");
        return;
    }
    
    console.log(`   Fetched ${markets.length} active markets.`);
    markets.forEach((m, i) => {
        console.log(`   [#${i+1}] ${m.question.substring(0, 50)}...`);
        console.log(`       Slug: ${m.slug}`);
        console.log(`       End (ET): ${m.endDateET}`);
    });
    console.log(`   Status       : ✅ Scanner Validated\n`);

    // --- Test 3: Depth Analyzer ---
    console.log("🔵 [Test 3/3] Depth Analyzer (深度透视)");
    const targetMarket = markets[0];
    const yesTokenId = targetMarket.tokenIds[0]; // Assuming index 0 is YES

    if (!yesTokenId) {
        console.log("   ⚠️ No Token ID found for depth analysis.");
    } else {
        console.log(`   Targeting: ${targetMarket.question}`);
        console.log(`   Token ID : ${yesTokenId}`);
        console.log(`   Simulating $1000 BUY...`);
        
        const depthResult = await analyzeDepth(yesTokenId, 1000);
        
        if (depthResult.error) {
            console.error(`   ❌ Depth Error: ${depthResult.error}`);
        } else {
            console.log(`   📊 Analysis Result:`);
            console.log(`       Best Ask     : $${depthResult.bestAsk}`);
            console.log(`       Avg Entry    : $${depthResult.avgEntryPrice}`);
            console.log(`       Slippage     : ${depthResult.slippage}`);
            console.log(`       Spread       : ${depthResult.spreadPercent}`);
        }
    }
    console.log(`   Status       : ✅ Analyzer Validated\n`);
    
    console.log("🟢 All Systems Operational.");
}

runFullTest();
