---
created: 2026-01-30
status: TODO
priority: High
tags:
  - AI
  - Agent
  - FunctionCalling
  - Python
  - task
due: 2026-01-30
---

# 📅 Day 2: Function Calling 原生实战

## 🎯 目标
抛弃基于正则表达式 (Regex) 的 `Action: ...` 解析方式，掌握 LLM 原生支持的 **Tool Use / Function Calling** 能力。了解如何用 JSON Schema 定义工具，并让模型输出结构化的调用指令。

## ✅ 待办事项
- [ ] 理解 Function Calling 原理 (对比 ReAct 文本模式的优势)
- [ ] 学习 Google Gemini SDK 的 `tools` 配置写法
- [ ] **重构代码:** 创建 `day2_function_calling.py`
    - [ ] 定义工具函数的声明 (Declaration)
    - [ ] 移除 System Prompt 中的 Few-Shot 示例 (因为原生支持不需要教)
    - [ ] 实现自动调用循环 (Automatic Function Calling)
- [ ] 对比测试：准确率与速度是否有提升？

## 📝 关联笔记
- [[01_Function_Calling_原理与实战]]
