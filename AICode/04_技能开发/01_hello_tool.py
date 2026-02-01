import json
import inspect

# ==========================================
# 1. 定义工具 (Define Tools)
# ==========================================

# [JS Comparison]
# JS: function get_weather(location, unit = "celsius") { ... }
def get_weather(location: str, unit: str = "celsius") -> str:
    """
    Get the current weather in a given location.

    Args:
        location: The city and state, e.g. San Francisco, CA
        unit: The temperature unit, either 'celsius' or 'fahrenheit'
    """
    # 模拟 API 调用
    # [JS Comparison] const weather_info = { ... }; return JSON.stringify(weather_info);
    if "Beijing" in location:
        return json.dumps({"location": "Beijing", "temperature": "25", "unit": unit, "condition": "Sunny"})
    elif "New York" in location:
        return json.dumps({"location": "New York", "temperature": "15", "unit": unit, "condition": "Cloudy"})
    else:
        return json.dumps({"location": location, "temperature": "unknown", "condition": "unknown"})

# 工具注册表 (Tool Registry)
# [JS Comparison] const tools = { "get_weather": get_weather };
available_tools = {
    "get_weather": get_weather
}

# ==========================================
# 2. 模拟 LLM (Simulated LLM)
# ==========================================

def simulated_llm_response(user_query: str):
    """
    这里模拟一个 LLM 的行为。在真实场景中，这里会调用 OpenAI/Gemini API。
    LLM 接收到 query 后，判断是否需要调用工具。
    """
    print(f"\n🤖 [LLM] Thinking about: '{user_query}'...")

    if "weather" in user_query.lower() or "天气" in user_query:
        # LLM 决定调用工具！它返回一个 JSON 结构
        # [JS Comparison] return { tool_calls: [{ name: "get_weather", arguments: "..." }] }
        return {
            "content": None,
            "tool_calls": [
                {
                    "name": "get_weather",
                    "arguments": '{"location": "Beijing", "unit": "celsius"}'
                    # 注意：LLM 可能会从 Query 中提取出 "Beijing"
                }
            ]
        }
    else:
        # 不需要工具，直接回答
        return {
            "content": "I can help you with that! (No tool needed)",
            "tool_calls": None
        }

# ==========================================
# 3. 主循环 (The Loop)
# ==========================================

def run_conversation(query: str):
    # Step 1: 发送消息给 LLM
    response_message = simulated_llm_response(query)

    # Step 2: 检查 LLM 是否想调用工具
    # [JS Comparison] if (response_message.tool_calls) { ... }
    tool_calls = response_message.get("tool_calls")

    if tool_calls:
        print(f"⚡️ [System] LLM wants to call a tool: {tool_calls[0]['name']}")

        # Step 3: 执行工具 (Execute)
        for tool_call in tool_calls:
            function_name = tool_call["name"]
            function_args = json.loads(tool_call["arguments"])

            # 从注册表中找到函数并执行
            function_to_call = available_tools.get(function_name)
            if function_to_call:
                print(f"🔨 [Action] Executing {function_name} with args: {function_args}")

                # [JS Comparison] const function_response = function_to_call(...Object.values(function_args));
                # Python 的 **kwargs 语法非常强大，可以直接把字典拆包成参数
                function_response = function_to_call(**function_args)

                print(f"📥 [Observe] Tool Output: {function_response}")

                # Step 4: 把结果喂回给 LLM (这里我们就简单打印了)
                print(f"📝 [Final] (Feeding output back to LLM to generate natural language response...)")
                print(f"🤖 [LLM] The weather in Beijing is sunny and 25°C.")
            else:
                print(f"❌ Error: Tool {function_name} not found.")
    else:
        print(f"🤖 [LLM] {response_message['content']}")

if __name__ == "__main__":
    # 场景 1: 问天气 (触发 Tool)
    run_conversation("What's the weather like in Beijing?")

    # 场景 2: 闲聊 (不触发 Tool)
    run_conversation("Tell me a joke.")
