---
title: AI Engineer 2026 - 04 Fine Tuning
created: 2026-02-02
status: todo
priority: medium
tags: [AI, Learning, Project, FineTuning]
---

> 📚 关联知识库: [[Areas/AI体系/AI应用工程师/04_微调与部署/README|04_微调与部署]]
> 💻 关联代码库: [[Areas/AI体系/AICode/04_FineTuning/README|Code: 04_FineTuning]]

# 任务 04: 微调与量化

## 1. 📘 理论 (Theory)
- **Pre-training vs Fine-tuning**: 区别是什么？
- **PEFT (Parameter-Efficient Fine-Tuning)**: 为什么不需要训练所有参数？LoRA 原理。

## 2. ⚙️ 原理 (Mechanisms)
- **Rank (r) & Alpha**: LoRA 的超参数含义。
- **Quantization**: FP32 -> FP16 -> INT8 -> INT4 的精度损失与显存节省。

## 3. 🌍 应用场景 (Use Cases)
- **风格迁移**: 让模型说话像“鲁迅”或“马斯克”。
- **指令微调 (Instruct Tuning)**: 增强模型遵循特定格式指令的能力。

## 4. 💻 实战 (Code Kata)

### 练习 1: 使用 Unsloth 微调 Llama-3
1. 准备数据集 (Alpaca 格式 JSONL)。
2. 使用 Unsloth 库加载 Llama-3-8B (4bit)。
3. 配置 LoRA 参数。
4. 训练并保存适配器 (Adapter)。
5. 加载微调后的模型进行推理。

### 练习 2: 模型量化部署
使用 `llama.cpp` 将微调后的模型转换为 GGUF 格式，并在本地运行。

## ✅ Definition of Done
- [ ] 跑通一个微调流程。
- [ ] 理解 LoRA 适配器是如何挂载到基座模型上的。

## 📅 Actionable Tasks (3 Weeks)

### Week 1: 微调理论
- [ ] 学习 Pre-training vs SFT vs RLHF 区别 #task 📅 2026-04-09
- [ ] 理解 PEFT 和 LoRA 的矩阵分解数学原理 #task 📅 2026-04-12

### Week 2: 数据准备
- [ ] 学习 Alpaca/ShareGPT 数据集格式 #task 📅 2026-04-16
- [ ] 准备一份小型的垂直领域数据集 (JSONL) #task 📅 2026-04-19

### Week 3: 训练与推理
- [ ] 使用 Unsloth 跑通 Llama-3 微调流程 #task 📅 2026-04-23
- [ ] 学习 GGUF 量化并导出模型 #task 📅 2026-04-26
- [ ] 模块 04 复盘总结 #task 📅 2026-04-26
