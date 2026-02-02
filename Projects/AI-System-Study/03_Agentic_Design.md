---
title: AI Engineer 2026 - 03 Agentic Design
created: 2026-02-02
status: todo
priority: high
tags: [AI, Learning, Project, Agent]
---

> 📚 关联知识库: [[Areas/AI体系/AI应用工程师/03_智能体与协议/README|03_智能体与协议]]
> 💻 关联代码库: [[Areas/AI体系/AICode/03_Agent/README|Code: 03_Agent]]

# 任务 03: Agent 智能体与工具链

## 1. 📘 理论 (Theory)
- **Agent Loop**: 感知 (Perceive) -> 思考 (Think) -> 行动 (Act) -> 观察 (Observe)。
- **ReAct Pattern**: Synergizing Reasoning and Acting in Language Models.

## 2. ⚙️ 原理 (Mechanisms)
- **Function Calling**: LLM 是如何“知道”它可以调用函数的？（Schema 定义）。
- **MCP (Model Context Protocol)**: Client-Host-Server 架构解析。

## 3. 🌍 应用场景 (Use Cases)
- **数据分析师**: 自动写 SQL 查询数据库并画图。
- **联网助手**: 搜索网页、总结新闻、发送日报。

## 4. 💻 实战 (Code Kata)

### 练习 1: 手写 ReAct Loop (不依赖框架)
仅使用 OpenAI API，手写一个 `while` 循环，实现：
1. 用户提问。
2. 模型判断是否需要调用工具。
3. 执行工具（如 `get_weather`）。
4. 将结果追加到消息历史。
5. 模型生成最终回答。

### 练习 2: 构建 MCP Server
使用 Python SDK 创建一个简单的 MCP Server，暴露一个 `calculate_bmi(height, weight)` 工具，并在本地 Client 中调试。

### 练习 3: 多智能体 (Multi-Agent)
使用 CrewAI 或 LangGraph，创建一个“研究员 + 撰稿人”组合，自动化生成博客文章。

## ✅ Definition of Done
- [ ] 彻底搞懂 Function Calling 的 JSON 结构。
- [ ] 成功运行自制的 MCP Server。
- [ ] 体验过 Multi-Agent 的协作流程。

## 📅 Actionable Tasks (3 Weeks)

### Week 1: 智能体思维
- [ ] 深入理解 ReAct (Reasoning + Acting) 论文思想 #task 📅 2026-03-19
- [ ] 手写 Python `while` 循环模拟 Agent 思考过程 #task 📅 2026-03-22

### Week 2: 工具与协议
- [ ] 学习 OpenAI Function Calling JSON Schema #task 📅 2026-03-26
- [ ] 阅读 MCP (Model Context Protocol) 官方文档 #task 📅 2026-03-29

### Week 3: 构建实战
- [ ] 开发一个简单的 MCP Server (如计算器或天气查询) #task 📅 2026-04-02
- [ ] 尝试 Multi-Agent 框架 (CrewAI/LangGraph) Demo #task 📅 2026-04-05
- [ ] 模块 03 复盘总结 #task 📅 2026-04-05
