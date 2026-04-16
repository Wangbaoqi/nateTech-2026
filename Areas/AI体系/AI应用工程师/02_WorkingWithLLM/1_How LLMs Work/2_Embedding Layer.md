## 2.1 词 Token 转化为向量：从身份证到坐标系

如果说 Token 是计算机给词发的“数字身份证”（如“猫”=101，“狗”=102），那么 **Embedding（嵌入）** 就是给这些 ID 分配了在多维空间中的**精确坐标**。

在大模型中，词不再是一个孤立的数字，而是一串包含几百甚至上千维度的“属性清单”（特征向量）：

*   **Token ID:** `101` (猫)
*   **Embedding 向量:** `[0.12, -0.85, 0.44, 0.03, ...]` (假设 512 维)

想象一下这张属性清单的内部含义：
*   **维度 1 (动物性):** 0.98 (非常接近动物)
*   **维度 2 (毛茸茸):** 0.92 (极高)
*   **维度 3 (飞行能力):** -0.95 (几乎不会飞)
*   **维度 102 (傲娇程度):** 0.88 (较高)

**为什么要向量化？** 因为计算机无法直接对比“猫”和“狗”，但它可以计算 `[0.12, -0.85, ...]` 和 `[0.15, -0.82, ...]` 之间的数值差异。Embedding 层本质上是一个巨大的**权重查找表（Look-up Table）**：输入 ID，输出一串浮点数。


## 2.2 向量空间与语义距离

一旦词变成了坐标，它们就有了位置关系。语义越相近的词，在空间中的“位置”越靠近。

### 1. 距离的度量：不仅仅是长度
在 AI 中，评估两个词是否相似通常不看它们的直线跨度，而是看它们的**夹角**。
*   **余弦相似度 (Cosine Similarity)**：在大模型中最常用的度量标准。如果两个向量指向几乎相同的方向，则相似度接近 1。
*   **欧几里得距离 (Euclidean Distance)**：计算两个点之间的直线物理距离。

### 2. 神奇的向量算术
Embeddings 捕捉到了世界运行的逻辑规律。最经典的实验结果：
`国王` - `男人` + `女人` ≈ `女王`

这意味着模型理解了“国王”相对于“男人”的差值，其实就是“皇权”这一抽象特征。当你把这个特征加在“女人”身上时，它能精准找到“女王”的位置。


## 2.3 动态上下文：静态 vs. 动态

早期的嵌入技术（如 2013 年的 Word2Vec）是**静态**的。无论“苹果”是指水果还是手机，它的向量永远固定。

**Transformer 时代的动态魔法：**
在大模型中，Embedding 具有“变形”能力。

*   **初始状态（Static Embedding）**：“苹果”进入模型时，是一个通用的表示，既包含水果味，也包含科技感。
*   **上下文交互（Contextualization）**：当模型读取到相邻词是“乔布斯”或“发布会”时，**自注意力机制（Self-Attention）** 会实时调整向量的权重。
*   **最终形态（Dynamic Vector）**：经过多层计算，该向量变成了“一个科技巨头公司”的专属表示。

这种动态特性让模型能理解双关语（Puns）和隐喻，因为它不仅看词本身，更根据周围的“语义场”实时调整词义的重心。

## 2.4 Embedding 中的向量

### 2.4.1 什么是向量

在计算机的世界里，**向量（Vector）** 其实就是一组有顺序的数字列表。

*   **1维向量 (标量)**：就像温度计上的一个刻度 `[25]`。
*   **2维向量**：就像地图上的坐标 `[经度, 纬度]`（如 `[121.47, 31.23]` 代表上海）。
*   **3维向量**：就像空间中的一个点 `[x, y, z]`。

简单来说，向量就是**空间中的一个点**。

### 2.4.2 大模型中的向量

在 LLM 的语义宇宙中，维度要高得多。Google 的 `gemini-embedding-001` 模型默认输出的是 **1536 维**的向量。

这 1536 个数字分别代表了词汇在不同维度的“特征”。虽然人类无法想象 1536 维的空间长什么样，但模型正是通过这些高维坐标来捕捉极其细微的语义差异（如政治倾向、文学风格、时间敏感度等）。

你可以通过以下 Python 代码获取一段话的 1536 维向量：

```python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

def get_embedding(text: str):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=types.EmbedContentConfig(
            task_type="SEMANTIC_SIMILARITY",
            output_dimensionality=1536, # 默认 1536 维
        ),
    )
    return result.embeddings[0].values

# 获取“人工智能”的 Embedding
vector = get_embedding("人工智能")
print(f"向量维度: {len(vector)}") # 输出: 1536
print(f"前 5 个数字: {vector[:5]}")
```

### 2.4.3 向量之间的运算：计算语义相似度

知道了坐标，下一步就是计算两个点之间的“距离”。在 Embedding 领域，我们最常用的数学工具是 **余弦相似度 (Cosine Similarity)**。

它计算的是两个向量（箭头）之间的夹角余弦值。
*   值越接近 **1**，说明两个词的含义越像。
*   值越接近 **0**，说明它们毫无关系。

以下是手动实现及计算示例：

```python
import numpy as np

def cosine_similarity(vec1, vec2):
    """手动实现余弦相似度公式"""
    vec1, vec2 = np.array(vec1), np.array(vec2)
    # 分子：点积；分母：模长之积
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

# 准备三组对比
v_ai = get_embedding("人工智能")
v_llm = get_embedding("大语言模型")
v_food = get_embedding("炸鸡啤酒")

print(f"AI vs LLM 相似度: {cosine_similarity(v_ai, v_llm):.4f}")    # 结果通常 > 0.8
print(f"AI vs 炸鸡 相似度: {cosine_similarity(v_ai, v_food):.4f}")   # 结果通常较小
```


## 2.5 Embedding 的现实世界应用

理解 Embedding 对 AI 应用工程师至关重要，因为它是许多核心功能的基石：

1.  **推荐系统**：将用户兴趣和商品都转化为向量。计算用户向量与商品向量的**点积（Dot Product）**，分值越高，匹配度越高。
2.  **语义搜索 (RAG)**：不再匹配关键词（如“咖啡机”），而是检索语义最接近的文档片段。即使文档里写的是“意式浓缩设备”，由于它们在空间中位置相近，模型依然能找出来。
3.  **多模态理解**：通过特殊的对齐技术（如 CLIP），让“一张猫的照片”和“猫这个词”共享同一个向量空间坐标。
4.  **异常检测**：在金融欺诈检测中，合规交易通常聚在一起，而欺诈行为的 Embedding 往往会漂向偏远的孤立地带。

### 2.6 代码示例

### 2.6.1 查看向量之间的相似度

```python

def get_embedding(text: str, dim: int = 1536) -> list[float]:
    """获取文本的embedding"""
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=types.EmbedContentConfig(
            task_type="SEMANTIC_SIMILARITY",
            output_dimensionality=dim,
        ),
    )
    return result.embeddings


def custom_similarity_main():
    """自定义计算相似度"""
    texts = [
        "Hello world",
        "Transformer",
        "人工智能",
        "大语言模型",
        "中文比英文消耗更多Token吗？",
    ]
    query = "人工智能"

    embeddings = {text: get_embedding(text).pop().values for text in texts}

    # print(f"embeddings: {embeddings}")
    similarities = [
        (text, cus_cosine_similarity(embeddings[text], embeddings[query]))
        for text in texts
        if text != query
    ]

    print(f"similarities: {similarities}")
    # 按相似度从高到低排序
    similarities.sort(key=lambda x: x[1], reverse=True)

    print(f"\n查询词: '{query}'")
    print("-" * 30)
    print("相似度排名:")
    for i, (text, score) in enumerate(similarities, 1):
        print(f"{i}. {text}: {score:.4f}")

```



一个polymartet量化交易的页面，整体样式要具有科技、极客的感觉。
包含如下板块内容：
- 数据展示板块
	- 展示方式：多维表格
	- 展示内容：不同城市的不同数据源的不同日期的温度
- 策略展示板块
	- 展示方式：水平方向左右卡片
	- 展示内容：
		- 左侧卡片展示策略列表数据，以及其运行状态
		- 右侧卡片展示策略结果数据，不同城市不同日期最终计算的温度
- 策略执行版本：
	- 展示方式：数据流方式，要有动态效果
		- 左侧动态展示不同market数据
		- 中间动态展示策略执行效果
		- 右侧展示market的执行成功或者失败数据
	- 展示数据：如展示方式里
- 持仓数据板块：
	- 展示方式：自行定义设计
	- 展示数据：
		- 所有持仓数据
		- 账户余额
		- 盈利数据
		- 亏损数据