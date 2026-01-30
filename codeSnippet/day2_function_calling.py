import os
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv

# 加载 .env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("❌ 错误: 未找到 GEMINI_API_KEY")
    exit(1)

client = genai.Client(api_key=API_KEY)

# --- 1. 定义工具函数 ---
# ⚠️ 注意：Gemini 会直接读取函数的 docstring (文档注释) 来理解工具的用途
# 所以，写好注释 = 写好 Prompt！

def calculate(expression: str) -> str:
    """
    用于执行数学计算。
    
    Args:
        expression: 数学表达式字符串，例如 '2 + 2' 或 '12 * 5'
    
    Returns:
        计算结果的字符串
    """
    print(f"🛠️  [Tool] 正被调用: calculate({expression})")
    try:
        return str(eval(expression, {"__builtins__": None}, {}))
    except Exception as e:
        return f"Error: {e}"

def get_weather(city: str) -> str:
    """
    查询指定城市的实时天气情况。
    
    Args:
        city: 城市名称，例如 '北京', 'Shanghai'
        
    Returns:
        包含天气状况和温度的描述字符串
    """
    print(f"🛠️  [Tool] 正被调用: get_weather({city})")
    # 模拟数据
    city = city.strip().strip("'").strip('"')
    mock_db = {
        "北京": "晴朗, 25°C",
        "上海": "小雨, 20°C",
        "深圳": "多云, 30°C",
        "London": "Foggy, 10°C"
    }
    return mock_db.get(city, f"未找到 {city} 的天气数据")

# 工具列表
tools_list = [calculate, get_weather]

# --- 2. 核心 Agent (原生模式) ---
def run_agent_native(query):
    print(f"🤖 Agent 启动 (Native Function Calling), 任务: {query}")
    print("-" * 50)
    
    # 初始化 Chat Session
    chat = client.chats.create(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
            tools=tools_list,
            temperature=0.1,
            # 🟢 新增：关闭安全过滤，防止无故拦截
            safety_settings=[
                types.SafetySetting(
                    category="HARM_CATEGORY_HARASSMENT",
                    threshold="BLOCK_NONE"
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_HATE_SPEECH",
                    threshold="BLOCK_NONE"
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold="BLOCK_NONE"
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold="BLOCK_NONE"
                ),
            ]
        )
    )
    
    # 第 1 轮：用户提问
    try:
        response = chat.send_message(query)
    except Exception as e:
        return f"❌ 发送消息失败: {e}"
    
    # 循环检查模型是否想调工具
    max_turns = 5
    for i in range(max_turns):
        
        # 🟢 新增：防御性检查，防止 candidates 为空
        if not response.candidates:
            print("⚠️ 警告: 模型未返回任何 Candidate (可能被安全策略拦截)")
            # 尝试打印 debug 信息
            print(f"Debug Info: {response}")
            return "❌ 模型拒绝回答"
            
        # 🟢 逻辑优化：检查混合内容 (Mixed Content)
        # 模型可能同时返回了文本回复 AND 工具调用
        # 或者只返回了文本，或者只返回了工具调用
        
        text_part = None
        fc_part = None
        
        for part in response.candidates[0].content.parts:
            if part.text:
                text_part = part.text
                print(f"🧠 [AI 思考/回复] {text_part}")
            if part.function_call:
                fc_part = part.function_call
        
        # 情况 1: 只有 Function Call -> 继续执行工具
        if fc_part and not text_part:
             pass # 继续下面的处理逻辑
             
        # 情况 2: 只有 Text -> 任务结束，返回结果
        if text_part and not fc_part:
            return text_part
            
        # 情况 3: 既有 Text 又有 Function Call -> 这是一个边缘情况
        # 这里的策略是：先打印文本，然后继续执行工具
        # 但如果文本里已经包含了“Final Answer”意味的内容，其实也可以结束了
        # 为了稳健，我们继续执行工具，让模型自己在下一轮决定是否结束
        
        if fc_part:
            tool_name = fc_part.name
            tool_args = fc_part.args
            
            print(f"🧠 [AI 决定] 调用工具: {tool_name} 参数(原始): {tool_args}")
            
            # 修复参数访问问题：将参数转换为标准字典
            args_dict = {}
            if tool_args:
                try:
                    args_dict = dict(tool_args)
                except:
                    args_dict = tool_args
            
            # 执行对应的 Python 函数
            function_result = None
            try:
                if tool_name == "calculate":
                    expr = args_dict.get("expression")
                    if expr:
                        function_result = calculate(expr)
                    else:
                        function_result = "Error: Missing argument 'expression'"
                        
                elif tool_name == "get_weather":
                    city = args_dict.get("city")
                    if city:
                        function_result = get_weather(city)
                    else:
                        function_result = "Error: Missing argument 'city'"
            except Exception as e:
                function_result = f"Error executing tool: {e}"
            
            print(f"👀 [系统] 工具返回: {function_result}")
            print("-" * 20)
            
            # 发回结果
            try:
                response = chat.send_message(
                    types.Part.from_function_response(
                        name=tool_name,
                        response={"result": function_result}
                    )
                )
            except Exception as e:
                # 🟢 如果发回结果后模型没反应了，或者报错了
                # 我们就假设刚才的 text_part 已经是最终答案了
                if text_part:
                    return text_part
                return f"❌ 对话中断: {e}"
            
        else:
            # 既没有 text 也没有 function call (极其罕见)
            return "❌ 空响应"

    return "❌ 超过最大轮数"

if __name__ == "__main__":
    user_query = "上海今天天气怎么样？如果是雨天，算一下 15 * 8 等于多少，我好准备买伞的钱。"
    final_res = run_agent_native(user_query)
    print("=" * 50)
    print(f"🎉 最终结果: {final_res}")
