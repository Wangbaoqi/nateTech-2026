import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 配置客户端
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("❌ 未找到 GEMINI_API_KEY，请检查 .env 文件！")

# 新 SDK: 直接实例化 Client
client = genai.Client(api_key=api_key)

# ==========================================
# 1. 定义工具 (Define Tools)
# ==========================================

def get_exchange_rate(currency_from: str, currency_to: str):
    """
    Get the current exchange rate between two currencies.

    Args:
        currency_from: The base currency code (e.g., 'USD', 'CNY')
        currency_to: The target currency code (e.g., 'EUR', 'JPY')
    """
    # 模拟真实数据
    mock_rates = {
        "USD-CNY": 7.25,
        "CNY-USD": 0.138,
        "BTC-USD": 95000.0
    }

    key = f"{currency_from.upper()}-{currency_to.upper()}"
    rate = mock_rates.get(key, "Unknown")

    print(f"\n🔨 [Tool Executing] Fetching rate for {key}: {rate}")

    return {"rate": rate, "pair": key}

# ==========================================
# 2. 运行对话 (Run Chat)
# ==========================================

def ask_gemini_new_sdk(user_query):
    print(f"\n👤 [User]: {user_query}")
    print("🤖 [Gemini] Thinking...", end="", flush=True)

    try:
        # 新 SDK: 统一入口 generate_content
        response = client.models.generate_content(
            model='gemini-2.0-flash', # 如果报错模型不存在，可以改回 'gemini-1.5-flash'
            contents=user_query,
            config=types.GenerateContentConfig(
                tools=[get_exchange_rate], # 直接传函数列表
                automatic_function_calling=types.AutomaticFunctionCallingConfig(
                    disable=False # 开启自动调用
                )
            )
        )

        print(f"\n🤖 [Gemini]: {response.text}")

    except Exception as e:
        print(f"\n❌ Error: {str(e)}")

if __name__ == "__main__":
    print("🚀 Google Gen AI SDK (v1.x) Demo Started!")

    # 测试 1: 简单的问好
    ask_gemini_new_sdk("Hi, who are you?")

    # 测试 2: 触发工具调用
    ask_gemini_new_sdk("Can you tell me how much is 100 USD in CNY right now?")

    # 测试 3: 更复杂的推理
    ask_gemini_new_sdk("If I have 1 Bitcoin, how many USD is that?")
