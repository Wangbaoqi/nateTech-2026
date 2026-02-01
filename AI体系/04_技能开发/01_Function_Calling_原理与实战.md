# 01_Function Calling 原理与实战

## 1. 理论基础 (Theory)

### 什么是 Function Calling?
Function Calling（函数调用，也称 Tool Use）是现代 LLM (Large Language Model) 最重要的能力之一。
简而言之：**它让 LLM 从“只会说话”变成了“能动手做事”。**

### 原理拆解 (The Loop)
LLM 本身无法联网，也无法执行代码。Tool Use 的本质是一个 **"Request-Execute-Response"** 的三步循环：

1.  **定义 (Define):** 开发者告诉 LLM：“我有这几个工具（函数），名字叫 A, B，参数是 X, Y。”（通常通过 system prompt 或 API 参数传入 JSON Schema）。
2.  **决策 (Think & Call):** LLM 在聊天过程中，发现用户的问题需要用到工具，于是它**不直接回答问题**，而是返回一个特殊的 JSON 数据包：“请帮我调用工具 A，参数是 X=1”。
3.  **执行 (Execute):** 宿主程序（您的 Python 脚本）捕获到这个 JSON，**在本地执行**对应的 Python 函数，拿到结果。
4.  **反馈 (Observe):** 宿主程序把函数运行的结果（字符串）再次喂给 LLM。
5.  **回答 (Final Response):** LLM 看到结果后，结合上下文，生成最终给用户的自然语言回复。

### 解决什么问题？
1.  **幻觉 (Hallucination):** 以前问“今天天气怎么样”，AI 只能瞎编。现在它会调用 `get_weather`。
2.  **时效性:** LLM 的训练数据是截止到过去的，工具让它能获取实时信息。
3.  **计算能力:** LLM 算术很差，工具让它能调用计算器。

---

## 2. 官方知识支撑 (References)
*   **OpenAI:** [Function calling](https://platform.openai.com/docs/guides/function-calling) - 定义了业界标准的 JSON Schema 格式。
*   **Anthropic:** [Tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) - 强调了 Chain of Thought (CoT) 在工具调用前的思考过程。
*   **Google Gemini:** [Function calling](https://ai.google.dev/gemini-api/docs/function-calling) - 我们的代码示例将基于此或通用的 OpenAI 格式。

---

## 3. 实战场景 (Use Cases)

| 场景 | 用户 Query | LLM 动作 | 工具函数 |
| :--- | :--- | :--- | :--- |
| **数学计算** | "3.14 的 5 次方是多少？" | Call `calculator` | `pow(3.14, 5)` |
| **实时信息** | "现在的比特币价格？" | Call `get_crypto_price` | `requests.get('binance...')` |
| **系统操作** | "帮我把这两个文件打包" | Call `zip_files` | `subprocess.run(['zip'...])` |

---

## 4. 代码实战 (Code Walkthrough)

> 代码路径：`../../AI代码/04_技能开发/01_hello_tool.py`

我们将实现一个最简单的 **"模拟天气查询"**。
虽然没有真的连气象局 API，但它完整展示了 **Tool Definition -> LLM Decision -> Execution** 的全过程。

### Python vs JS 语法对照点
在阅读代码时请注意：
1.  **类型提示 (Type Hints):** Python 的 `def func(a: int) -> str:` 类似于 TypeScript 的 `function func(a: number): string`。虽然 Python 运行时不强制校验，但对 LLM 理解工具定义非常有帮助。
2.  **装饰器 (Decorators):** Python 的 `@tool` 类似于 JS 的高阶函数 (Higher-Order Components) 或 Java 的注解，用于自动把函数注册进 LLM 的工具列表。
