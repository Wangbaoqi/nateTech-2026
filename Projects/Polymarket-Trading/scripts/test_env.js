require('dotenv').config();
const { ethers } = require('ethers');
const { ClobClient } = require('@polymarket/clob-client');

try {
    console.log("🔍 Checking Ethers Version:");
    console.log("   - ethers.version:", ethers.version);
    
    // 检查 JsonRpcProvider 是否存在 (v5 特征)
    if (!ethers.providers || !ethers.providers.JsonRpcProvider) {
        throw new Error("ethers.providers.JsonRpcProvider not found! You are likely using v6.");
    }
    console.log("✅ Ethers v5 detected.");

    console.log("🔍 Checking ClobClient:");
    const dummyWallet = ethers.Wallet.createRandom();
    const client = new ClobClient("https://clob.polymarket.com", 137, dummyWallet);
    console.log("✅ Client instantiated.");

} catch (e) {
    console.error("❌ TEST FAILED:", e.message);
    process.exit(1);
}
