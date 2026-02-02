---
title: AI Engineer 2026 - 02 RAG Engineering
created: 2026-02-02
status: todo
priority: high
tags: [AI, Learning, Project, RAG]
---

> 📚 关联知识库: [[Areas/AI体系/AI应用工程师/02_RAG架构与工程/README|02_RAG架构与工程]]
> 💻 关联代码库: [[Areas/AI体系/AICode/02_RAG/README|Code: 02_RAG]]

# 任务 02: RAG 系统架构与优化

## 1. 📘 理论 (Theory)
- **RAG vs Fine-tuning**: 什么时候该用哪个？（知识更新频率 vs 领域适配需求）。
- **Vector Database**: 向量数据库原理，HNSW 索引算法简介。

## 2. ⚙️ 原理 (Mechanisms)
- **Embeddings**: 文本如何变成向量？Cosine Similarity 是如何计算的？
- **Chunking**: 切分策略（Fixed-size, Recursive, Semantic）对检索效果的影响。

## 3. 🌍 应用场景 (Use Cases)
- **企业知识库**: 基于公司 Wiki 和 PDF 文档的问答助手。
- **法律/医疗助手**: 需要引用精确原文的场景。

## 4. 💻 实战 (Code Kata)

### 练习 1: 基础 RAG 流水线
使用 LangChain 或 LlamaIndex：
1. 加载一个 PDF 文件。
2. 使用 OpenAI Embeddings 进行向量化。
3. 存入 ChromaDB (或 FAISS)。
4. 提问并检索相关片段。
5. 将片段喂给 LLM 生成答案。

### 练习 2: Advanced RAG - HyDE
实现 "Hypothetical Document Embeddings" (HyDE) 策略：先让 LLM 生成一个假设性答案，再用该答案去检索真实文档。

### 练习 3: Re-ranking (重排序)
在检索回 10 个片段后，引入一个 Cross-Encoder (如 BGE-Reranker) 对片段进行精排，取 Top-3。

## ✅ Definition of Done
- [ ] 成功运行一个本地 RAG Demo。
- [ ] 理解 Chunk size 对结果的影响。
- [ ] 体验过 Re-ranking 带来的准确率提升。

## 📅 Actionable Tasks (3 Weeks)

### Week 1: 向量与存储
- [ ] 学习 Vector Embeddings 原理 (Cosine Similarity) #task 📅 2026-02-26
- [ ] Python 实战：使用 Numpy 计算向量相似度 #task 📅 2026-02-28
- [ ] 部署/安装 ChromaDB 或 FAISS #task 📅 2026-03-01

### Week 2: RAG 框架上手
- [ ] 学习 LangChain 或 LlamaIndex 基础概念 #task 📅 2026-03-05
- [ ] 跑通 "PDF to Answer" 最小闭环 Demo #task 📅 2026-03-08

### Week 3: 进阶优化
- [ ] 实验不同 Chunk Size 对检索的影响 #task 📅 2026-03-12
- [ ] 尝试 HyDE 策略或 Re-ranking 优化 #task 📅 2026-03-14
- [ ] 模块 02 复盘总结 #task 📅 2026-03-15
