const { ClobClient } = require('@polymarket/clob-client');
const { ethers } = require('ethers');
require('dotenv').config();

console.log("🛠 Debugging ClobClient Constructor...");

// 1. 定义参数
const host = "https://clob.polymarket.com";
const chainId = 137;
const privateKey = process.env.PRIVATE_KEY;

// 2. 检查参数类型
console.log(`- Host: "${host}" (Type: ${typeof host})`);
console.log(`- ChainId: ${chainId} (Type: ${typeof chainId})`);

if (!privateKey) {
    console.error("❌ PRIVATE_KEY is empty!");
    process.exit(1);
}

// 3. 构建 Wallet
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
const wallet = new ethers.Wallet(privateKey, provider);
console.log(`- Wallet: ${wallet.address} (Object OK)`);

// 4. 尝试初始化 (带 Try-Catch)
try {
    // 关键：有些旧版本 SDK 把参数封装在对象里，有些是散列参数
    // 我们先试现在的写法
    console.log("👉 Attempt 1: new ClobClient(host, chainId, wallet)");
    const client = new ClobClient(host, chainId, wallet);
    console.log("✅ Client created successfully!");
} catch (e) {
    console.error("❌ Attempt 1 Failed:", e.message);
    
    // 尝试备用写法: 如果 SDK 版本很新，可能需要传对象？(虽然源码显示是散列)
}
