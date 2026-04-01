# AI 应用工程师 5 个月进阶学习计划 (Learning Plan)

> **关于此计划：**
> 本计划基于您当前的 9 大知识模块设计。按照先基础、后架构、再智能体、最后全栈工程与上线的顺序层层递进。
> **TaskNotes 兼容：** 所有的任务项都使用了 Obsidian 任务管理格式 `- [ ] #task`，您可以结合 Dataview 或 Task 插件在全局看板中跟踪进度。

---

## 🎯 第 1 个月：大模型基石与交互 (Foundations & LLM APIs)
**目标：** 搞懂 AI 工程师的定位，熟练使用商业 API 和开源模型，掌握高级 Prompt 技巧。
**关联目录：** `01_Introdction`, `02_WorkingWithLLM`, `03_AI Models`

### Week 1-2：角色认知与 LLM 核心交互
- [ ] #task 阅读并整理 01_Introdction 下的所有文档（What is, Roles, Impact等），明确学习目标。
- [ ] #task 掌握基础与高级提示词工程 (Prompt Engineering)，包括 Few-Shot, Chain-of-Thought (CoT)。
- [ ] #task 注册并使用 OpenAI / Anthropic API，编写 Python 脚本实现基础的文本生成与多轮对话记忆。
- [ ] #task 学习并实现 LLM API 的流式输出 (Streaming Response) 并在终端或简单前端展示。
- [ ] #task 学习如何处理 API 调用的异常控制（Rate Limits, 重试机制, Token 计算）。

### Week 3-4：AI 模型生态与本地部署
- [ ] #task 研究 03_AI Models，对比闭源模型与开源模型（Llama 3, Qwen）的区别与选型场景。
- [ ] #task 学习并使用 Hugging Face 平台，掌握如何查找、下载模型。
- [ ] #task 使用 Ollama 或 LM Studio 在本地电脑成功运行一个开源轻量级模型 (如 Llama-3-8B)。
- [ ] #task 了解模型量化基础 (GGUF, AWQ)，并对比不同量化级别对显存和速度的影响。

---

## 🎯 第 2 个月：外挂大脑与 RAG 架构 (Data & RAG Engineering)
**目标：** 解决大模型的“幻觉”和“知识更新”问题，从零手写企业级知识库问答系统。
**关联目录：** `04_Embeddings and Vector Databases`, `05_RGAs`

### Week 1-2：向量化与数据库
- [ ] #task 深入理解 Embedding 的数学与空间原理（文本是如何变成向量的）。
- [ ] #task 实践文本预处理：清洗 PDF/Markdown 数据，并编写不同的分块策略 (Chunking Strategies)。
- [ ] #task 学习并部署一款向量数据库（如本地化部署 Chroma/Milvus，或使用云端 Pinecone）。
- [ ] #task 将切分后的文档向量化并存入 Vector DB，完成基于余弦相似度 (Cosine Similarity) 的基础检索。

### Week 3-4：RAG 架构进阶
- [ ] #task 在 05_RGAs 模块中，搭建基础的 Naive RAG 流水线（检索 -> 拼接 Prompt -> LLM 生成）。
- [ ] #task 学习并实现 Advanced RAG 技巧：查询重写 (Query Rewriting)、多路召回 (Hybrid Search: Keyword + Vector)。
- [ ] #task 学习 RAG 的重排序机制 (Reranking)，集成 BGE-Reranker 提升检索相关性。
- [ ] #task 了解最新的 Graph RAG (图谱检索增强) 概念及其与传统向量检索的互补性。

---

## 🎯 第 3 个月：智能体与自动化工作流 (Autonomous Agents)
**目标：** 让 LLM 长出“手和脚”，能够自主调用工具、规划路径并解决复杂问题。
**关联目录：** `06_AI Agents`

### Week 1-2：工具调用 (Function Calling)
- [ ] #task 深入学习 OpenAI 的 Function Calling (工具调用) 机制原理。
- [ ] #task 编写 3 个基础外部工具（如：获取天气API、计算器、网页搜索），并让模型成功调用。
- [ ] #task 学习 MCP (Model Context Protocol) 协议的概念，了解未来 AI 工具的标准接入方式。

### Week 3-4：Agent 框架与多智能体系统
- [ ] #task 学习 Agent 的核心组件：规划 (Planning)、记忆 (Memory) 和 反思 (Reflection/ReAct)。
- [ ] #task 学习 LangChain 或 LlamaIndex 的 Agent 模块，构建一个简单的单体 Agent。
- [ ] #task 学习基于图状态的智能体框架（如 LangGraph），构建一个具备循环与条件判断的复杂工作流。
- [ ] #task (可选) 探索多智能体框架（如 CrewAI 或 AutoGen），实现两个 Agent 互相协作完成任务（如一个写代码，一个做 Code Review）。

---

## 🎯 第 4 个月：全模态与系统护栏 (Multimodal & Safety)
**目标：** 突破纯文本限制，处理音视频/图片；并为 AI 系统加上安全护栏，使其达到生产级可用。
**关联目录：** `07_AI Safety and Ethics`, `08_Multmodal AI`

### Week 1-2：多模态技术 (Multimodal)
- [ ] #task 了解 VLM (视觉语言模型) 如 GPT-4o 或 Claude 3.5 Sonnet 的图像理解能力。
- [ ] #task 编写脚本提取图片中的结构化数据（如将发票图片转为 JSON 格式）。
- [ ] #task 学习使用 Whisper 等音频模型进行语音识别 (ASR) 与总结。
- [ ] #task (可选) 探索文生图 (Stable Diffusion/Midjourney API) 在产品中的集成方式。

### Week 3-4：AI 安全与护栏 (Safety & Ethics)
- [ ] #task 学习什么是 Prompt Injection (提示词注入) 及常见的攻击手段 (Jailbreaking)。
- [ ] #task 实现输入/输出护栏 (Guardrails)，如使用 Llama Guard 或自定义规则拦截敏感/不当词汇。
- [ ] #task 了解数据脱敏技术，在将用户数据发往闭源 API 之前进行 PII (个人隐私信息) 清洗。

---

## 🎯 第 5 个月：MLOps、评估与毕业项目 (LLMOps & Capstone)
**目标：** 掌握工程化监控与量化评估体系，完成一个完整的端到端 AI 产品。
**关联目录：** `09_Development Tools`

### Week 1-2：开发工具与评估体系
- [ ] #task 学习 LLMOps 概念，集成 LangSmith 或 Langfuse 监控 AI 应用的 Trace 和 Token 消耗。
- [ ] #task 抛弃“肉眼评估”，学习并使用 Ragas 等框架搭建自动化的评估流水线。
- [ ] #task 利用 LLM-as-a-Judge 技术，量化测试前几个月构建的 RAG 系统的准确率和幻觉率。

### Week 3-4：Capstone 毕业项目落地
- [ ] #task 确定一个具备实际应用价值的毕业项目（例如：个人私有数据智能助手、自动化运维 Agent、行业报告分析工具）。
- [ ] #task 完成项目的后端 API 封装 (使用 FastAPI) 和前端界面 (使用 Vercel AI SDK 或 Streamlit/Gradio)。
- [ ] #task 将项目容器化 (Docker) 并部署到云服务器，配置 CI/CD 流水线。
- [ ] #task 撰写项目复盘文档与架构图，归档至 `06_实战案例库` (如果存在该目录)。