---
title: AI Engineer 2026 - 01 LLM Foundations
created: 2026-02-02
status: todo
priority: high
tags: [AI, Learning, Project, LLM]
---

> 📚 关联知识库: [[Areas/AI体系/AI应用工程师/01_基础与提示工程/README|01_基础与提示工程]]
> 💻 关联代码库: [[Areas/AI体系/AICode/01_Foundations/README|Code: 01_Foundations]]

# 任务 01: LLM 基础与高级提示工程

## 1. 📘 理论 (Theory)
- **Transformer 本质**: 深入理解 Self-Attention 机制，为什么它能并行计算？Q/K/V 矩阵分别代表什么？
- **Context Window**: 什么是上下文窗口？超过窗口会发生什么？ROPE 旋转位置编码如何解决长文本问题？
- **Prompting Paradigms**: Zero-shot vs Few-shot vs CoT。

## 2. ⚙️ 原理 (Mechanisms)
- **Tokenization**: 
    - 学习 BPE (Byte Pair Encoding) 算法。
    - 实验：同一个句子在 OpenAI tiktoken 和 HuggingFace Tokenizer 下的区别。
- **Temperature & Top-P**: 采样策略如何影响输出的随机性和创造性。

## 3. 🌍 应用场景 (Use Cases)
- **非结构化转结构化**: 从杂乱的 PDF/网页中提取 JSON 数据。
- **复杂逻辑推理**: 使用 CoT 解决数学或逻辑谜题。
- **角色扮演**: System Prompt 的设计对输出风格的影响。

## 4. 💻 实战 (Code Kata)

### 练习 1: 手写 Tokenizer (Python)
不使用库，实现一个简单的基于字符或单词的 Tokenizer。

### 练习 2: 提示工程实验室
创建一个 Jupyter Notebook，对比以下 Prompt 的效果：
- Standard Prompt
- Chain of Thought (CoT)
- Few-shot Prompting (3-shot)

### 练习 3: 本地模型加载
使用 `transformers` 库加载一个小参数模型 (如 GPT-2 或 Qwen-0.5B)，并编写代码生成文本。

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
# Your code here...
```

## ✅ Definition of Done
- [ ] 理解 Transformer 架构图。
- [ ] 能够解释 Token 是什么。
- [ ] 完成上述 3 个代码练习。

## 📅 Actionable Tasks (3 Weeks)

### Week 1: 概念与 Python 预热
- [ ] 阅读 Transformer 核心架构文档 (Focus: Attention) #task 📅 2026-02-05
- [ ] 复习 Python 基础 (List, Dict, Numpy 数组操作) #task 📅 2026-02-07
- [ ] 配置本地 Python 开发环境 (Conda/Venv) #task 📅 2026-02-08

### Week 2: 原理深潜
- [ ] 实验：使用 Tiktoken 观察不同文本的 Token 长度 #task 📅 2026-02-12
- [ ] 学习 Prompt Engineering 核心技巧 (CoT, Few-Shot) #task 📅 2026-02-14
- [ ] 尝试使用 API 调用一次 LLM #task 📅 2026-02-15

### Week 3: 代码实战
- [ ] 完成 `01_tokenizer.py`：手写简单分词器 #task 📅 2026-02-19
- [ ] 完成 `02_prompt_lab.ipynb`：对比不同 Prompt 效果 #task 📅 2026-02-21
- [ ] 模块 01 复盘总结，整理笔记到 Areas #task 📅 2026-02-22
