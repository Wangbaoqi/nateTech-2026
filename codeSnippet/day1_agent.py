import os
import re
import time
from google import genai
from dotenv import load_dotenv
from google.genai.errors import ClientError

# 加载 .env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("❌ 错误: 未找到 GEMINI_API_KEY")
    exit(1)

client = genai.Client(api_key=API_KEY)

# --- 1. 定义 Prompt ---
SYSTEM_PROMPT = """
你是一个拥有工具的智能助手。
回答用户问题时，请严格遵守以下格式：

Thought: 思考我目前需要做什么
Action: 工具名称: 参数
Observation: 工具返回的结果（由用户提供，不要自己生成）

... (重复上述步骤)

Final Answer: 给用户的最终答案

你可以使用的工具：
1. calculate: 用于数学计算，参数为数学表达式，例如: 2 + 2
2. get_length: 计算字符串长度，参数为字符串
3. get_weather: 获取城市天气，参数为城市名称，例如: "北京"

示例：
User: 3乘以4再加上"hello"的长度是多少，然后告诉我今天上海的天气适合穿什么？
Thought: 我需要先计算3乘以4
Action: calculate: 3 * 4
Observation: 12
Thought: 现在我需要计算"hello"的长度
Action: get_length: "hello"
Observation: 5
Thought: 现在我有两个结果12和5，需要把它们加起来
Action: calculate: 12 + 5
Observation: 17
Thought: 现在我需要获取上海的天气
Action: get_weather: "上海"
Observation: 小雨, 20°C
Thought: 根据天气情况(20度小雨)，我应该建议穿长袖和带伞
Final Answer: 结果是 17，上海今天小雨，20度，建议穿长袖并带伞。
"""

# --- 2. 定义工具集 ---
def calculate(expression):
    try:
        return str(eval(expression, {"__builtins__": None}, {}))
    except Exception as e:
        return f"Error: {e}"

def get_length(text):
    text = text.strip('"').strip("'")
    return str(len(text))

def get_weather(city):
    # 去掉可能的引号
    city = city.strip().strip("'").strip('"')

    # 模拟数据库
    mock_weather = {
        "北京": "晴朗, 25°C",
        "上海": "小雨, 20°C",
        "深圳": "多云, 30°C"
    }
    return mock_weather.get(city, "未找到该城市天气")

tools = {
    "calculate": calculate,
    "get_length": get_length,
    "get_weather": get_weather
}

# --- 3. 带重试机制的生成函数 ---
def generate_with_retry(model_name, contents, config, max_retries=3):
    """
    带有指数退避的 API 调用封装
    """
    delay = 10 # 初始等待 10 秒

    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=config
            )
            return response
        except ClientError as e:
            # 检查是否是 429 (Resource Exhausted)
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                print(f"⚠️  触发限流 (429)，等待 {delay} 秒后重试 (尝试 {attempt+1}/{max_retries})...")
                time.sleep(delay)
                delay *= 2 # 等待时间翻倍: 10s -> 20s -> 40s
            else:
                raise e # 其他错误直接抛出

    raise Exception("重试次数耗尽，任务失败。")

# --- 4. 核心 Agent 循环 ---
def run_agent(query):
    # 强制使用 Flash 模型，速度快且限额通常较高
    MODEL_NAME = "gemini-2.0-flash"

    print(f"🤖 Agent 启动 (SDK: google-genai), 模型: {MODEL_NAME}")
    print("-" * 50)

    history_text = SYSTEM_PROMPT + f"\nUser: {query}\n"

    max_steps = 10
    for i in range(max_steps):
        # 每次请求前有一个基础间隔，避免秒级并发
        if i > 0:
            time.sleep(2)

        try:
            # 使用重试机制调用
            response = generate_with_retry(
                model_name=MODEL_NAME,
                contents=history_text,
                config={
                    "stop_sequences": ["Observation:"],
                    "temperature": 0.1
                }
            )

            response_text = response.text.strip()
            print(f"🧠 [Step {i+1}] AI 思考:\n{response_text}")

            history_text += f"{response_text}\n"

            if "Final Answer:" in response_text:
                return response_text.split("Final Answer:")[1].strip()

            match = re.search(r"Action:\s*(\w+):\s*(.*)", response_text)

            if match:
                tool_name = match.group(1)
                tool_args = match.group(2).strip()

                print(f"🛠️  执行工具: {tool_name} | 参数: {tool_args}")

                if tool_name in tools:
                    result = tools[tool_name](tool_args)
                else:
                    result = f"Error: Tool '{tool_name}' not found"

                print(f"👀 观察结果: {result}")
                print("-" * 20)

                history_text += f"Observation: {result}\n"
        except Exception as e:
            print(f"❌ 严重错误: {e}")
            break

    return "❌ 任务失败"

if __name__ == "__main__":
    user_query = "请帮我计算 (12 * 90) + 'Artificial Intelligence' 这个单词的长度是多少？然后告诉我北京今天的天气，适合穿什么衣服？"
    print(run_agent(user_query))
