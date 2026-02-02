---
title: AI Engineer 2026 - 05 Eval & Ops
created: 2026-02-02
status: todo
priority: medium
tags: [AI, Learning, Project, Ops]
---

> 📚 关联知识库: [[Areas/AI体系/AI应用工程师/05_评估与运维/README|05_评估与运维]]
> 💻 关联代码库: [[Areas/AI体系/AICode/05_EvalOps/README|Code: 05_EvalOps]]

# 任务 05: 评估与运维 (LLMOps)

## 1. 📘 理论 (Theory)
- **Evaluation Difficulty**: 为什么评估生成式 AI 这么难？
- **LLM-as-a-Judge**: 让强大的模型（如 GPT-4）去给小模型的回答打分。

## 2. ⚙️ 原理 (Mechanisms)
- **RAG Metrics**: 
    - Context Recall (召回内容是否覆盖答案)
    - Faithfulness (回答是否忠实于原文)
    - Answer Relevance (回答是否切题)

## 3. 🌍 应用场景 (Use Cases)
- **版本迭代**: 升级 RAG 策略后，如何确保效果是提升的而不是倒退？
- **线上监控**: 发现用户投诉回答质量差时，如何追踪？

## 4. 💻 实战 (Code Kata)

### 练习 1: Ragas 自动化评估
1. 准备一个测试集（问题 + 标准答案）。
2. 运行你的 RAG 系统生成回答。
3. 使用 Ragas 库计算 Faithfulness 和 Answer Relevance 分数。

### 练习 2: Trace 追踪
接入 LangSmith 或 Phoenix，观察一个复杂 Agent 任务的完整调用链，分析 Token 消耗和延迟瓶颈。

## ✅ Definition of Done
- [ ] 建立一套自动化的 RAG 评分脚本。
- [ ] 学会看 Trace 视图分析问题。

## 📅 Actionable Tasks (3 Weeks)

### Week 1: 评估体系
- [ ] 学习 LLM-as-a-Judge 概念 #task 📅 2026-04-30
- [ ] 了解 RAG 核心指标 (Faithfulness, Relevance) #task 📅 2026-05-03

### Week 2: 自动化测试
- [ ] 搭建 Ragas 评估环境 #task 📅 2026-05-07
- [ ] 对之前的 RAG 项目进行打分测试 #task 📅 2026-05-10

### Week 3: 运维监控
- [ ] 注册并配置 LangSmith 或 Phoenix #task 📅 2026-05-14
- [ ] 观察 Trace 链路，分析 Token 消耗 #task 📅 2026-05-17
- [ ] 全课程复盘与毕业总结 #task 📅 2026-05-17
