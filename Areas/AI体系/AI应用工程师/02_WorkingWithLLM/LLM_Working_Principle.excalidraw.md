---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==妥善处理 JSON 可能会导致性能问题。此处提供的是绘图的逻辑结构，您可以使用 Excalidraw 插件根据以下逻辑快速拖拽生成：==

# LLM Working Principle Logic Map

1. **Input Stage**: 
   - [User Prompt] -> [Tokenizer] -> [Embedding Vector]
2. **Hidden Layer (The Black Box)**:
   - Multiple Transformer Blocks
   - **Crucial Part**: Self-Attention Matrix (Lines connecting word nodes with different opacity representing weights)
3. **Output Stage**:
   - [Logits (Probability Distribution)] -> [Sampling Strategy (Temperature/Top-P)] -> [Predicted Next Token]
4. **The Loop**:
   - Arrow from [Predicted Next Token] back to [Input Stage] (Auto-regressive generation)

# Text Elements
- "Next Token Prediction"
- "Context Window"
- "Parameters/Weights"
