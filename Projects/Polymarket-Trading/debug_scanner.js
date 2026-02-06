const axios = require('axios');
const GAMMA_API = "https://gamma-api.polymarket.com/markets";

async function debug() {
    try {
        console.log("Fetching top 20 markets by liquidity...");
        const { data } = await axios.get(GAMMA_API, {
            params: {
                limit: 20, 
                active: true, 
                closed: false, 
                order: 'liquidity', 
                descending: true
            }
        });
        
        console.log(`Received ${data.length} records.`);
        
        data.forEach((m, i) => {
            console.log(`[${i}] ${m.question}`);
        });
        
    } catch (e) {
        console.error("API Error:", e.message);
    }
}
debug();
