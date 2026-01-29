# ReAct 实战：从零手写最小化 Agent

## 1. 什么是 ReAct？
> 论文来源：[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)

在 ReAct 出现之前，LLM 要么只会空想（CoT，思维链），要么只会蛮干（直接输出 API 调用）。
**ReAct (Reason + Act)** 将两者结合，让模型遵循一个循环：
1.  **Thought (思考):** 我现在需要做什么？
2.  **Action (行动):** 调用什么工具？参数是什么？
3.  **Observation (观察):** 工具返回了什么结果？
4.  ...回到第 1 步，直到解决问题。

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
