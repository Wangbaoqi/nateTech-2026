# ReAct 实战：从零手写最小化 Agent

## 1. 什么是 ReAct？(Reason + Act)

> **一句话定义：** ReAct 是一种让 AI 在解决问题时 **"边想边做"** 的框架。它强迫模型显式地写出推理过程 (Thought)，并根据推理结果去调用工具 (Action)，再根据工具的反馈 (Observation) 修正自己的下一步计划。

### 1.1 为什么需要 ReAct？(The "Why")
在 ReAct 之前，LLM 有两个极端：
*   **纯推理 (CoT, Chain of Thought):** 模型只会空想。它能推导出逻辑，但无法获取外部信息（如实时股价、天气），容易产生幻觉。
*   **纯行动 (Tool Learning):** 模型只负责调用 API。但如果任务复杂（比如“先查天气再订票”），模型往往不知道该先调哪个，容易乱操作。

**ReAct 的突破：** 它将 **Thinking (大脑)** 和 **Acting (手脚)** 结合在了一个交替的循环中。

### 1.2 ReAct 核心循环 (The Loop)
一个标准的 ReAct Agent 永远在做这三件事的循环，直到任务完成：
1.  **Thought (思考):** "我现在缺什么信息？我下一步该干嘛？"
2.  **Action (行动):** "我决定调用这个工具，参数是..."
3.  **Observation (观察):** "工具返回了结果，我看到了..."

### 1.3 适用场景与效果
*   **✅ 最佳场景：** 任何需要 **外部知识** (Web Search) 或 **交互操作** (Database/API) 的复杂任务。
    *   *例子:* "帮我分析竞对公司 A 最新的财报，并计算其净利润率。" (下载财报 -> 读取数据 -> 计算)
*   **❌ 不适用：** 纯创意写作或纯逻辑与现实世界无关的问题。
*   **效果：**
    *   **减少幻觉:** 遇到不懂的，它会倾向于去查工具，而不是瞎编。
    *   **可解释性:** 你能看到 Agent 的每一步思考，Debug 极其方便。
    *   **容错性:** 如果工具报错，Agent 会思考 "出错了，我该重试还是换个工具？"，而不是直接崩溃。

## 2. 核心 Prompt 设计
Agent 的灵魂不在 Python 代码，而在 Prompt。我们需要教模型“如何思考”。

```python
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

示例：
User: 3乘以4再加上"hello"的长度是多少？
Thought: 我需要先计算3乘以4
Action: calculate: 3 * 4
Observation: 12
Thought: 现在我需要计算"hello"的长度
Action: get_length: "hello"
Observation: 5
Thought: 现在我有两个结果12和5，需要把它们加起来
Action: calculate: 12 + 5
Observation: 17
Thought: 我已经得到最终结果了
Final Answer: 结果是 17
"""
```

## 3. Python 实现 (Micro-Agent)
这是最简化的 Agent 运行时 (Runtime) 代码。

```python
import re

# 模拟 LLM 调用 (在实际代码中替换为 openai.chat.completions.create)
# 这里为了演示，我们假设 LLM 会逐步返回内容
class MockLLM:
    def chat(self, history):
        # 这里只是伪代码，实际运行时需要接入真实的 API (如 Gemini/GPT-4)
        pass

# 定义工具集
def calculate(expression):
    try:
        return str(eval(expression))
    except:
        return "Error"

def get_length(text):
    return str(len(text))

tools = {
    "calculate": calculate,
    "get_length": get_length
}

# 核心 Agent 循环
def run_agent(query, llm_client):
    history = SYSTEM_PROMPT + f"\nUser: {query}\n"
    print(f"User: {query}")

    max_steps = 5
    for i in range(max_steps):
        # 1. 让 LLM 思考并决定行动
        response = llm_client.chat(history) 
        # (假设 response 包含了 Thought 和 Action)
        
        print(f"AI: {response}")
        
        # 2. 解析 Action
        # 正则匹配: Action: tool_name: args
        match = re.search(r"Action: (\w+): (.*)", response)
        
        if "Final Answer:" in response:
            return response.split("Final Answer:")[1].strip()
        
        if match:
            tool_name = match.group(1)
            tool_args = match.group(2)
            
            # 3. 执行工具 (Action)
            if tool_name in tools:
                result = tools[tool_name](tool_args)
                
                # 4. 将结果反馈给 LLM (Observation)
                observation = f"Observation: {result}"
                print(f"System: {observation}")
                
                history += f"{response}\n{observation}\n"
            else:
                history += f"{response}\nObservation: Error: Tool not found\n"
        else:
            # 如果没有 Action，直接把回复加入历史
            history += f"{response}\n"
            
    return "Timeout: 未能在规定步数内解决问题"

```

## 4. 关键点剖析
1.  **Stop Sequence (停止符):**
    在调用真实 API 时，一定要设置 `stop=["Observation:"]`。
    **为什么？** 防止 LLM 自作聪明，自己把 `Observation` 也生成了（产生幻觉）。必须强迫它停下来，等待我们执行 Python 代码把真实结果填进去。

2.  **上下文堆叠 (Context Accumulation):**
    `history += ...` 是关键。Agent 的“短期记忆”就是这个不断变长的字符串。如果任务太长，Context Window 爆了怎么办？(这就是后续 Memory 模块要解决的问题)。

## 5. 作业
创建一个 `agent_demo.py` 文件，接入你自己的 API Key (OpenAI 或 Gemini)，跑通这个流程。

**挑战：** 尝试增加一个 `get_weather` 工具（可以只返回模拟数据），让 Agent 回答“今天北京的天气适合穿什么？”
