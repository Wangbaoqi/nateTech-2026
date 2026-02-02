# AI Engineer 2026 权威课程大纲

> **Status**: Active
> **Source**: Roadmap.sh + Atlas Expert Fusion
> **Goal**: 从 API 调用者进化为系统架构师。

## 阶段一：LLM 基础与工程化思维 (Foundations)
> 建立对 LLM 的正确认知，掌握与大模型交互的“自然法则”。

- **1.1 LLM 剖析 (Anatomy)**
    - [理论] Transformer 架构回顾 (Attention is All You Need)。
    - [原理] Tokenization (BPE, Tiktoken), Context Window, Temperature。
    - [实战] 手写一个简单的 Tokenizer；使用 Transformers 库加载本地模型。
- **1.2 高级提示工程 (Advanced Prompting)**
    - [理论] In-Context Learning (ICL)。
    - [场景] 结构化数据提取、复杂逻辑推理。
    - [实战] 实现 CoT (思维链) 和 ToT (思维树) 的对比测试。

## 阶段二：RAG 系统架构与优化 (RAG Engineering)
> 解决模型幻觉与知识过时问题，构建企业级知识库。

- **2.1 检索增强生成 (Naive RAG)**
    - [理论] 向量空间模型 (Vector Space Model)。
    - [原理] Embedding 模型 (OpenAI vs HuggingFace), 相似度计算 (Cosine/Dot)。
    - [实战] 使用 ChromaDB + LangChain 构建 PDF 问答助手。
- **2.2 高级 RAG (Advanced RAG)**
    - [理论] 召回率 (Recall) vs 准确率 (Precision) 的平衡。
    - [场景] 复杂文档处理、多跳推理。
    - [实战] 实现 HyDE (假设文档嵌入)、Re-ranking (重排序)、Parent Document Retriever。

## 阶段三：Agent 智能体与工具链 (Agentic Design)
> 赋予模型手脚，从“对话”走向“行动”。

- **3.1 Agent 核心模式**
    - [理论] ReAct (Reasoning + Acting) 范式。
    - [原理] Function Calling / Tool Use 的底层实现。
    - [场景] 自动化办公、数据分析。
    - [实战] 从零实现一个能够查询天气并发送邮件的 Agent (不使用框架)。
- **3.2 协议与多智能体**
    - [理论] MCP (Model Context Protocol) 详解。
    - [实战] 开发一个符合 MCP 标准的 Server。
    - [实战] 使用 LangGraph / CrewAI 构建多智能体协作流 (Writer + Editor)。

## 阶段四：微调与私有化部署 (Fine-tuning & Ops)
> 掌握模型定制化能力，打造垂直领域专家。

- **4.1 高效微调 (PEFT)**
    - [原理] LoRA, QLoRA 矩阵分解原理。
    - [场景] 医疗/法律/垂直领域问答。
    - [实战] 使用 Unsloth/Axolotl 微调 Llama-3/Mistral 模型。
- **4.2 量化与推理加速**
    - [原理] FP16 vs INT8 vs AWQ。
    - [实战] 使用 vLLM / Ollama 进行高并发推理部署。

## 阶段五：评估与监控 (Evaluation & Observability)
> 如何证明你的 AI 系统是好用的？

- **5.1 自动化评估 (LLM-as-a-Judge)**
    - [理论] Ragas 框架指标 (Faithfulness, Answer Relevance)。
    - [实战] 构建自动化测试集，评估 RAG 系统的性能。
- **5.2 监控与追踪**
    - [实战] 接入 LangSmith / Arize Phoenix 进行 Trace 追踪。

---
*Created by Atlas | 2026-02-02*
