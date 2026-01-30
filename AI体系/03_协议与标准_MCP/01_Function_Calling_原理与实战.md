# Function Calling: 让 LLM 真正长出“手”

## 1. 痛点：正则表达式的局限
在 Day 1 中，我们用 `Action: tool_name: args` 这种文本格式来让 AI 调用工具。
**缺点很明显：**
1.  **不稳定：** 模型可能少写个冒号，或者参数里忘记加引号，导致正则匹配失败 (`AttributeError`)。
2.  **类型不安全：** 所有参数都是字符串，Python 这边还需要自己转换 (`int()`, `eval()`)，容易报错。
3.  **Token 浪费：** 每次都要在 System Prompt 里写一大堆 "Thought/Action" 的示例，占用上下文。

## 2. 什么是 Function Calling (Tool Use)？
这是 OpenAI 于 2023 年引入（随后 Gemini/Claude 跟进）的一项原生能力。
**核心逻辑：**
*   **输入时：** 你不再需要写 Prompt 告诉模型“怎么调用工具”。你只需要把工具的 **定义 (Schema)** 传给模型 API。
*   **输出时：** 模型不再返回普通的文本，而是返回一个特殊的结构化对象 (Function Call Object)，里面包含精准的函数名和 JSON 格式的参数。

### 2.1 流程对比
*   **ReAct (文本模式):**
    > User: 天气? -> LLM: "Action: get_weather: 北京" -> Regex解析 -> Python执行
*   **Function Calling (原生模式):**
    > User: 天气? + Tools定义 -> LLM: (特殊帧: `name='get_weather', args={'city': '北京'}`) -> Python直接执行

## 3. Gemini SDK 写法 (Python)
Gemini 的 `google-genai` SDK 对此封装得非常优雅。

```python
# 1. 定义普通的 Python 函数
def get_weather(city: str):
    """查询某个城市的天气信息"""
    return "晴朗"

# 2. 直接把函数传给 client (它会自动提取函数名、文档注释、参数类型生成 Schema)
response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents='北京天气怎么样？',
    config={
        'tools': [get_weather] # <--- 关键！直接传函数对象
    }
)

# 3. 检查模型是否想调用工具
for part in response.candidates[0].content.parts:
    if part.function_call:
        print(f"模型想调用: {part.function_call.name}")
        print(f"参数: {part.function_call.args}")
```

## 4. 优势
1.  **更准：** 模型经过专门训练，极少出现参数格式错误。
2.  **更省：** 不需要写复杂的 System Prompt 示例。
3.  **原生支持多步：** Gemini 支持 "Automatic Function Calling"，甚至不需要你写循环，SDK 可以自动帮你调完函数并把结果喂回给模型（Auto-reply）。

## 5. 任务
请参考 `day2_function_calling.py`，体验这种“全自动”的快感。
