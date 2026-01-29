# AI 全栈专家学习路线图 (2026版)

## 🎯 学习目标
从原理到实战，彻底掌握 AI Agent 开发体系。不仅会用，更懂得通过代码构建属于自己的智能系统。

## 📚 模块一：01_底层原理 (Deep Dive)
> **目标：** 祛魅。理解 LLM 不是魔法，是矩阵乘法与统计学。
- [ ] **Transformer 架构解构**
    - Encoder-Decoder vs Decoder-only (GPT)
    - Self-Attention 机制详解 (Q, K, V 矩阵变换)
    - Positional Encoding (ROPE 等位置编码)
- [ ] **训练与推理**
    - Pre-training vs SFT (监督微调) vs RLHF (人类反馈强化学习)
    - 推理优化：KV Cache, PagedAttention (vLLM 原理)
    - 量化技术 (Quantization): FP16, INT8, GPTQ, AWQ
- [ ] **Embedding 与 向量数据库**
    - 语义空间的数学意义
    - 向量相似度计算 (Cosine Similarity)

## 🗣️ 模块二：02_提示工程 (Prompt Engineering)
> **目标：** 学会与模型“对齐”，榨干模型潜能。
- [ ] **基础范式**
    - Zero-shot, Few-shot
    - COT (Chain of Thought) 思维链
- [ ] **高级框架**
    - TOT (Tree of Thoughts)
    - ReAct (Reasoning + Acting)
    - Reflexion (自我反思机制)
- [ ] **结构化提示**
    - XML/JSON 约束技巧
    - System Prompt 最佳实践 (Role, Context, Constraints, Style)

## 🔌 模块三：03_协议与标准 (MCP & Interface)
> **目标：** 掌握 AI 与世界连接的通用语言。
- [ ] **MCP (Model Context Protocol)**
    - Anthropic 提出的上下文互操作标准
    - Client, Server, Resource 概念解析
- [ ] **Function Calling (工具调用)**
    - 原理：LLM 如何输出 JSON 格式的函数参数
    - OpenAI Tool Use Schema
- [ ] **Structured Output**
    - 强制 JSON 输出 (Zod, Pydantic)

## 🛠️ 模块四：04_技能开发 (Skills & Tools)
> **目标：** 赋予 AI 具体的行动能力（Clawdbot Skill 开发实战）。
- [ ] **工具设计原则**
    - 原子性 (Atomicity)
    - 容错性 (Error Handling)
    - 描述即文档 (Description Engineering)
- [ ] **实战案例**
    - 开发一个“实时股票查询” Skill
    - 开发一个“本地文件操作” Skill

## 🤖 模块五：05_Agent 架构 (System Design)
> **目标：** 构建能够独立解决复杂问题的智能体。
- [ ] **核心组件**
    - Planning (规划): 任务拆解
    - Memory (记忆): Short-term vs Long-term
    - Tools (工具)
- [ ] **架构模式**
    - Single Agent (AutoGPT 模式)
    - Multi-Agent (AutoGen, CrewAI 模式)
    - User-in-the-loop (人机协作)
- [ ] **RAG (检索增强生成)**
    - Naive RAG vs Advanced RAG (HyDE, Re-ranking)

## 🛡️ 模块六：06_实战案例库 (Case Studies)
- [ ] 构建个人 AI 知识库助手
- [ ] 开发自动化 Code Review Agent
- [ ] Web3 链上数据分析 Agent
