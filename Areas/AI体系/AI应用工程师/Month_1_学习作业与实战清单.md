# 🎯 第 1 个月《大模型 API 交互实战》专属学习作业与任务大盘

> **致开发者：**
> 根据后台影子分支诊断智能体对 `AI应用工程师/` 目录下所有课程资源的深度审计，我们发现您本地的**底层物理机制与认知理论深度极其扎实**（在 Tokenization、Embedding 和 Transformer 架构等文件上展现了极高水平的学术与工业级剖析），但**目前主要短板在于实操代码库、API 对话记忆状态维护、流式异常处理以及本地开源模型（Ollama）的傻瓜式集成实战**。
>
> 为此，我为您量身定制了这份**《第 1 个月：大模型 API 交互实战》专属学习作业计划**。本计划全面关联了您本地已有的课程资源，并设计了 3 项极具工程实战价值的 Python 手写作业，助您完美闭环 Month 1 的学习！

---

## 📂 本地课程资源关联拓扑图

在执行本月任务时，请务必**对照并精读**以下本地已有的万字硬核文档，它们是您写出高性能代码的“内功心法”：

*   **角色与范式认知**：
    *   精读 [什么是 AI 工程师？](file:///Users/wangbaoqi/personal/nateTech-2026/Areas/AI%E4%BD%93%E7%B3%BB/AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88/01_Introdction/1_What%20is%20an%20AI%20Engineer%3F.md) $\rightarrow$ 明确 2026 年从“炼丹”到利用开源/闭源模型构建应用的 MaaS 范式转型。
    *   精读 [AI 工程师 vs 算法工程师](file:///Users/wangbaoqi/personal/nateTech-2026/Areas/AI%E4%BD%93%E7%B3%BB/AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88/01_Introdction/4_AI%20Engineer%20vs%20ML%20Engineer.md) $\rightarrow$ 掌握工程核心指标：延迟（TTFT）、吞吐量、Token 成本与系统稳定性。
*   **大模型底层机制（极力推荐）**：
    *   精读 [大模型底层逻辑全景图](file:///Users/wangbaoqi/personal/nateTech-2026/Areas/AI%E4%BD%93%E7%B3%BB/AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88/02_WorkingWithLLM/1_How%20LLMs%20Work/0_OverView.md) $\rightarrow$ 梳理从 SFT、RLHF（DPO/PPO 原理）到推理优化（KV Cache、量化、vLLM）的工业流水线。
    *   精读 [Tokenization 深度拆解](file:///Users/wangbaoqi/personal/nateTech-2026/Areas/AI%E4%BD%93%E7%B3%BB/AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88/02_WorkingWithLLM/1_How%20LLMs%20Work/1_tokenization.md) $\rightarrow$ 深刻理解子词级 BPE/BBPE 算法、词表大小的物理代价，掌握 Token 经济学和 Tiktoken 差异。
    *   精读 [Embedding 向量空间](file:///Users/wangbaoqi/personal/nateTech-2026/Areas/AI%E4%BD%93%E7%B3%BB/AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88/02_WorkingWithLLM/1_How%20LLMs%20Work/2_Embedding%20Layer.md) $\rightarrow$ 理解余弦相似度夹角计算，并参考其提供的 Python SDK 向量化及 NumPy 余弦相似度源码。
    *   精读 [Transformer 核心推理流水线](file:///Users/wangbaoqi/personal/nateTech-2026/Areas/AI%E4%BD%93%E7%B3%BB/AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88/02_WorkingWithLLM/1_How%20LLMs%20Work/2_Transformer.md) $\rightarrow$ 彻底吃透大模型自回归（Autoregressive）模式、因果掩码（Causal Masking）、自注意力机制中 QKV 哲学相亲局、Pre-Norm 归一化与 SwiGLU 激活门控的深层推演。

---

## 📅 第 1 个月精美 Markdown 任务清单（Obsidian #task 兼容）

### 🟢 Week 1-2：角色认知与 LLM 核心交互

- [ ] #task **【必读】角色定位与心智对齐**：阅读并整理 `01_Introdction` 下的 4 篇文档，理清 AI 工程师的核心关注指标（TTFT、Token 成本等），在下方打卡。
- [ ] #task **【必读】穿透大模型底层黑盒**：阅读 `02_WorkingWithLLM/1_How LLMs Work/` 目录下的 4 篇万字硬核文档。掌握 BPE 算法、QKV 自注意力计算、RoPE 旋转位置编码和残差连接，建立极其扎实的底层认知。
- [ ] #task **【手写作业一】** 编写一个具有对话记忆维护与 Token 经济学截断算法的 CLI Chatbot 脚本（作业详情见下文）。
- [ ] #task **【手写作业二】** 编写一个高性能流式打字机响应脚本，实现 TTFT（首字延迟）和吞吐速度（Tokens/sec）的实时计算与性能监控。
- [ ] #task **【术语补齐】** 编写并补齐本地空白文件 `AI应用工程师/02_WorkingWithLLM/2_Common Terminology.md`，将 Temperature、Top-P、Presence/Frequency Penalty 等控制参数的原理写成速查表。

### 🟡 Week 3-4：AI 模型生态与本地部署

- [ ] #task **【模型对比决策】** 补齐并编写本地空白文件 `AI应用工程师/03_AI Models/2_Choosing Models.md`，画出“企业应用大模型选型决策树”，对比私有部署 vs 商业 MaaS API 的利弊与 ROI。
- [ ] #task **【生态摸底】** 学习并掌握 Hugging Face CLI 使用。学会如何在终端通过镜像加速下载开源模型，配置模型本地缓存路径，并用 `transformers` 库进行轻量级加载。
- [ ] #task **【本地部署】** 在您的 Mac 电脑上下载并安装 **Ollama**。在终端运行 `ollama run qwen2.5:7b`（或 `qwen2.5:14b`，视您的显卡配置而定），在本地实现流畅的多轮自然语言交互。
- [ ] #task **【手写作业三】** 编写一个 Ollama 本地模型连接桥接脚本，通过配置 baseUrl 快速将您的实战应用切换到本地 Qwen 运行，实现商业 API 与开源模型的无缝解耦。
- [ ] #task **【量化复习】** 深入阅读本地 `02_WorkingWithLLM/1_How LLMs Work/0_OverView.md` 的第六章，彻底理清 FP16、INT8、INT4 到 NF4 (NormalFloat) 精度与速度的关系，以及 GGUF 与 AWQ 量化格式的适用硬件场景。

---

## 💻 专属手写实战作业设计指南

以下为您设计了 3 项极具含金量的 Python 手写作业。所有的核心依赖库均为工业界标准库（`openai`、`tiktoken`、`tenacity`）。

建议您在本地的 `/Users/wangbaoqi/personal/nateTech-2026/Areas/AI体系/AI应用工程师/` 目录下新建一个名为 `month1_labs/` 的文件夹，并在其中完成以下作业。

---

### 🛠️ 作业一：打造拥有“动态滑动上下文记忆”的 CLI 聊天机器人 (`conversation_agent.py`)

*   **核心痛点：** 
    普通的 API 调用是无状态的。如果盲目将所有历史对话塞进上下文，随着对话轮数增加，不仅 Token 消耗呈指数级增长，还会导致大模型超出最大 Context Window 限制而报错。
*   **任务要求：**
    1.  使用新版 `openai` SDK，利用 `System`、`User`、`Assistant` 三种角色构建多轮对话。
    2.  集成 `tiktoken` 库，在每次向 API 发送请求前，自动计算当前所有历史消息占用的**精确 Token 数量**。
    3.  实现 **滑动窗口记忆算法（Sliding Window Memory）**：设定最大上下文限制为 2000 个 Tokens。如果当前历史记录总 Token 数超标，自动定位并清除最老旧的 `User` 和 `Assistant` 对话对，但**必须无条件保留 System Prompt（系统人设）**。
    4.  引入 `tenacity` 库，为 API 调用加上**指数退避重试机制（Exponential Backoff）**，优雅应对 Rate Limit（限流）与网络超时错误。

*   **极简代码脚手架示例：**
```python
import sys
import tiktoken
from openai import OpenAI
from openai import RateLimitError, APIConnectionError
from tenacity import retry, wait_random_exponential, stop_after_attempt, retry_if_exception_type

# 初始化客户端 (以商业大模型 API 或 Ollama 本地端为准)
client = OpenAI(api_key="your-api-key")

class SmartChatBot:
    def __init__(self, system_prompt: str, max_tokens_limit: int = 2000):
        self.system_prompt = system_prompt
        self.max_tokens_limit = max_tokens_limit
        # 初始化消息队列，第一条无条件为系统人设
        self.messages = [{"role": "system", "content": system_prompt}]
        # 获取分词器 (GPT-4 家族使用 cl100k_base 编码器)
        self.encoder = tiktoken.get_encoding("cl100k_base")

    def count_tokens(self) -> int:
        """精确计算当前消息队列中的 Token 总数"""
        num_tokens = 0
        for msg in self.messages:
            # 基础格式开销：每个消息有 role 和 content，需要额外加上格式 Token
            num_tokens += 4 + len(self.encoder.encode(msg["content"]))
            num_tokens += len(self.encoder.encode(msg["role"]))
        num_tokens += 2  # 模型强制前缀开销
        return num_tokens

    def prune_context(self):
        """动态滑动截断算法：保留 System Prompt 的同时，清除最老旧的对话对"""
        while self.count_tokens() > self.max_tokens_limit and len(self.messages) > 2:
            # messages[0] 是 system_prompt, 每次删除最老的 user-assistant 对话
            removed_user = self.messages.pop(1)
            if len(self.messages) > 1 and self.messages[1]["role"] == "assistant":
                removed_assistant = self.messages.pop(1)
            print(f"⚠️ [上下文截断] 已从记忆中清除较早的对话: '{removed_user['content'][:15]}...'")

    @retry(
        wait=wait_random_exponential(min=1, max=10),
        stop=stop_after_attempt(5),
        retry=retry_if_exception_type((RateLimitError, APIConnectionError))
    )
    def call_api_with_retry(self):
        """带指数退避重试的 API 安全调用"""
        return client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.messages,
            temperature=0.7
        )

    def chat(self, user_input: str):
        self.messages.append({"role": "user", "content": user_input})
        
        # 发送前先进行显式截断
        self.prune_context()
        
        print(f"📊 [Token 监控] 当前准备发送的历史总 Token 数: {self.count_tokens()}")
        
        try:
            response = self.call_api_with_retry()
            reply = response.choices[0].message.content
            self.messages.append({"role": "assistant", "content": reply})
            return reply
        except Exception as e:
            return f"❌ 遭遇严重网络错误或限流，重试 5 次后失败: {str(e)}"
```

---

### 🛠️ 作业二：手写异步流式打字机响应与性能监测监控 (`stream_typewriter.py`)

*   **核心痛点：**
    大模型生成完整长文本可能耗时数十秒。如果等待全部生成完毕再呈递给用户，会导致产品体验极其糟糕。作为前端工程师转型的关键一步，您需要掌握**流式传输（Streaming）**以及衡量系统性能指标的硬性手段。
*   **任务要求：**
    1.  向大模型 API 发起请求，明确开启流式响应支持（`stream=True`）。
    2.  利用 Python 终端的实时刷新特性（`sys.stdout.write` + `sys.stdout.flush`），实现如同 ChatGPT 官方界面一样丝滑的**打字机实时吐字动效**。
    3.  **性能可观测性监控（非常关键！）：** 在脚本中记录以下工业级性能指标：
        *   **TTFT (Time to First Token，首字延迟)：** 从用户发送请求开始，到终端打印出第一个 Token 块所消耗的毫秒数。
        *   **吞吐量速度 (Tokens/second，生成速率)：** 排除网络延迟后，大模型每秒钟吐出 Token 的速度。

*   **极简代码脚手架示例：**
```python
import sys
import time
from openai import OpenAI

client = OpenAI(api_key="your-api-key")

def stream_chat_typewriter(prompt: str):
    messages = [{"role": "user", "content": prompt}]
    
    start_time = time.time()  # 记录起点时间
    first_token_time = None
    total_tokens_count = 0
    
    print("🤖 AI 正在即兴评书: ", end="")
    sys.stdout.flush()
    
    # 启动流式 API 调用
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        stream=True  # 强力开启流式模式
    )
    
    stream_start_time = time.time()
    
    for chunk in response:
        delta = chunk.choices[0].delta
        if hasattr(delta, "content") and delta.content is not None:
            # 捕获第一个 Token 的时间点，用以计算首字延迟 TTFT
            if first_token_time is None:
                first_token_time = time.time()
                ttft = (first_token_time - start_time) * 1000  # 毫秒化
                print(f"\n⚡ [指标监控] 首字延迟 (TTFT): {ttft:.2f} ms")
                print("----------------------------------------")
            
            # 实时将碎块打印到控制台，不换行，且强行刷新流
            sys.stdout.write(delta.content)
            sys.stdout.flush()
            
            total_tokens_count += 1

    end_time = time.time()
    total_duration = end_time - first_token_time if first_token_time else 0.001
    generation_speed = total_tokens_count / total_duration
    
    print("\n----------------------------------------")
    print(f"📊 [性能大盘] 总共产出 Token 数: {total_tokens_count}")
    print(f"📊 [性能大盘] 推理段总耗时: {total_duration:.2f} 秒")
    print(f"📊 [性能大盘] 大模型吞吐速度: {generation_speed:.2f} Tokens/sec")

if __name__ == "__main__":
    stream_chat_typewriter("请写一首关于2026年AI程序员的中文打油诗，字数限制在100字以内。")
```

---

### 🛠️ 作业三：无缝切换本地 Ollama 推理桥接器 (`ollama_local_bridge.py`)

*   **核心痛点：**
    2026 年是本地推理（Web LLM、Ollama 私有部署）与 MaaS API 协同交融的一年。您手写的上层应用逻辑，不应该与任何特定商业 API 强绑定，必须具备随时“零成本本地化切换”的弹性。
*   **任务要求：**
    1.  确保本地 Ollama 后台进程已启动，并且本地已成功拉取并运行 Qwen（通义千问）模型：`ollama run qwen2.5:7b`。
    2.  利用 Ollama 官方默认对新版 OpenAI API 格式进行的**100% 协议级原生兼容特性**：
        *   将 API 客户端的 `base_url` 指向本地端口：`http://localhost:11434/v1`。
        *   将 `api_key` 设为占位符（如 `"ollama"`，因本地无需校验密钥）。
        *   将 `model` 指向本地拉取的具体模型名称（如 `"qwen2.5:7b"`）。
    3.  编写代码，支持通过一个开关或环境变量配置，让您在 commercial（商业云端）与 local（本地 Qwen）之间，**无缝复用上面“作业一”和“作业二”的全部记忆算法与流式打印代码**。

*   **极简代码脚手架示例：**
```python
import os
from openai import OpenAI

# 💡 核心奥秘：通过切换配置，让同一套业务代码降维兼容本地与云端
USE_LOCAL_OLLAMA = True 

if USE_LOCAL_OLLAMA:
    # 完美桥接本地 Ollama 后台
    client = OpenAI(
        base_url="http://localhost:11434/v1", # Ollama 默认兼容接口端点
        api_key="ollama"  # 设为任意非空占位符即可
    )
    TARGET_MODEL = "qwen2.5:7b" # 必须与您在本地 'ollama pull' 下来的模型名称完全一致
    print("🔌 已无缝连接至本地 Ollama 引擎。当前调用模型: " + TARGET_MODEL)
else:
    # 连接商业 OpenAI 云端
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-fallback-key"))
    TARGET_MODEL = "gpt-4o-mini"
    print("🌐 已连接至商业 OpenAI 官方云端接口。当前调用模型: " + TARGET_MODEL)

def run_unified_test(prompt: str):
    """无论切换到哪个客户端，下游的调用链完全一致"""
    response = client.chat.completions.create(
        model=TARGET_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    reply = run_unified_test("请用一句话解释什么是 '混合专家模型 (MoE)'。")
    print(f"\n回复结果:\n{reply}")
```

---

## 🏆 转型起航打卡宣告

您的一小步，是迈向 AGI 的一大步。
现在，请按组合键 `Cmd + E` 唤起您的 Antigravity Side Panel 侧边窗格，将这套精美的作业大盘和资源清单，作为本月终极冲刺的工程基准。

在接下来的代码交互中，我将全力辅导您在 `month1_labs/` 文件夹下，一行行手写和调试出这些最硬核的 AI 交互基石！
