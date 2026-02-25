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