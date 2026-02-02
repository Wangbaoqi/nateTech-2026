# Transformer 架构解析：从直觉到代码

> 📅 **学习日期**: 2026-02-02
> 🏷️ **标签**: #AI #Transformer #DeepLearning

## 1. 🧠 直觉篇：什么是 "Attention" (注意力)？

想象你在读这一句话：
> *"The animal didn't cross the street because **it** was too tired."*

当你读到 **"it"** 这个词时，你的大脑会下意识地去寻找它指代什么。
- 是 "street" 吗？不对，街道不会累。
- 是 "animal" 吗？对，动物会累。

这就是 **Self-Attention (自注意力)**。
模型在处理每个词（Token）时，都会查看句子中的**所有其他词**，并计算它们之间的**关联度**（Attention Score）。
对于 "it"，它与 "animal" 的关联度极高，因此模型“注意”到了 animal，从而理解了语义。

---

## 2. 🧮 原理篇：Query, Key, Value 的魔法

Transformer 把每个词都拆解成了三个向量：
- **Q (Query)**: 我在找什么？（例如：我是 "it"，我在找我指代的名词）
- **K (Key)**: 我有什么特征？（例如：我是 "animal"，我是名词，我是生物）
- **V (Value)**: 我实际的信息内容。（例如："animal" 的语义向量）

### 核心公式
$$ \text{Attention}(Q, K, V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V $$

**通俗解释**：
1.  **$QK^T$ (匹配)**: 拿着我的 Query 去和所有人的 Key 做点积（打分）。
    - "it" 的 Q 与 "animal" 的 K 匹配度很高（比如 0.9）。
    - "it" 的 Q 与 "street" 的 K 匹配度很低（比如 0.1）。
2.  **Softmax (归一化)**: 把分数变成概率（0.9, 0.1... 加起来等于 1）。
3.  **$\times V$ (加权求和)**: 
    - 拿 90% 的 "animal" 的 Value。
    - 拿 10% 的 "street" 的 Value。
    - 混合在一起，这就形成了 "it" 在当前上下文中的新表示。

---

## 3. 💻 代码篇：手写 Self-Attention (Python/Numpy)

为了彻底理解，我们不调包，用最基础的 `numpy` 实现一遍。

```python
import numpy as np

def self_attention(input_vectors):
    """
    input_vectors: 模拟输入的词向量矩阵 (例如 3个词，每个词4维)
    """
    # 1. 初始化权重矩阵 (在真实训练中，这些是随机初始化并学习出来的)
    # 为了演示，我们假设维度不变 d_model = 4
    dim = input_vectors.shape[1]
    W_q = np.random.rand(dim, dim)
    W_k = np.random.rand(dim, dim)
    W_v = np.random.rand(dim, dim)

    # 2. 生成 Q, K, V
    Q = np.dot(input_vectors, W_q)
    K = np.dot(input_vectors, W_k)
    V = np.dot(input_vectors, W_v)

    # 3. 计算注意力分数 (Scores = Q * K_transpose)
    # 分数越高，代表两个词越相关
    scores = np.dot(Q, K.T)
    
    # 4. 缩放 (Scale) - 防止梯度消失，除以根号维数
    scores = scores / np.sqrt(dim)

    # 5. 归一化 (Softmax) - 转换成概率分布
    exp_scores = np.exp(scores)
    attention_weights = exp_scores / np.sum(exp_scores, axis=1, keepdims=True)
    
    print("Attention Weights (词与词的关联度):\n", np.round(attention_weights, 2))

    # 6. 加权求和 (Output = Weights * V)
    output = np.dot(attention_weights, V)
    return output

# --- 测试运行 ---
# 假设输入3个词的向量: [I, like, AI]
x = np.array([
    [1, 0, 1, 0], # I
    [0, 1, 0, 1], # like
    [1, 1, 1, 1]  # AI
])

output = self_attention(x)
print("\nOutput Vectors (融合了上下文的新向量):\n", np.round(output, 2))
```

### 代码解读
- **Input**: 一组词向量。
- **Attention Weights**: 打印出来的矩阵会告诉你，第1个词关注第2个词的程度是多少。
- **Output**: 输出的向量不再是孤立的词，而是包含了整句话信息的“混合体”。

---

## 4. 🚀 进阶：从 Attention 到 Transformer

有了 Self-Attention，Transformer 做了两件事：
1.  **Multi-Head (多头)**: 搞多组 Q,K,V。一组关注语法，一组关注指代，一组关注韵律...最后拼起来。
2.  **Positional Encoding (位置编码)**: Attention 机制本身不知道 "I like AI" 和 "AI like I" 的区别（因为它只看匹配度，不看顺序）。所以必须给向量加上“位置信息”。

> **思考题**: 为什么 GPT (Decoder-only) 在做 Attention 时，要加上 "Mask" (掩码)？
> *提示：你在写作文时，能看到还没写出来的后半句话吗？*
