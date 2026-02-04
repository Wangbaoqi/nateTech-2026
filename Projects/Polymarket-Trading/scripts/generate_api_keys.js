require('dotenv').config();
const { ethers } = require('ethers');
const { ClobClient } = require('@polymarket/clob-client');

async function main() {
    try {
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) throw new Error("PRIVATE_KEY missing");

        console.log("🔐 Connecting wallet (Ethers v5)...");
        
        // --- Ethers v5 写法 (JsonRpcProvider) ---
        const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
        const wallet = new ethers.Wallet(privateKey, provider);
        
        console.log(`✅ Wallet: ${wallet.address}`);
        console.log("⏳ Init Client...");

        // ClobClient v5 构造函数
        const client = new ClobClient(
            "https://clob.polymarket.com",
            137,
            wallet // 传入 v5 Wallet
        );

        console.log("✍️ Requesting API Key...");
        const creds = await client.createApiKey(); // v5 自动处理 L2 Key 派生

        console.log("\n🎉 KEYS GENERATED:");
        console.log(`POLYMARKET_API_KEY=${creds.key}`);
        console.log(`POLYMARKET_API_SECRET=${creds.secret}`);
        console.log(`POLYMARKET_API_PASSPHRASE=${creds.passphrase}`);

    } catch (error) {
        console.error("\n❌ FAILED:", error.message);
        if (error.stack) console.error(error.stack);
    }
}

main();
