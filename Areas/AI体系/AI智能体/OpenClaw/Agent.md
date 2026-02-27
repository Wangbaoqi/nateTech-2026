# OpenClaw 智能体（Agent）核心概念与配置指南

OpenClaw 运行一个源自 `pi-mono` 的嵌入式智能体运行时，负责处理模型调用、工具执行及上下文管理。本文档详细描述了 OpenClaw 中智能体的核心概念、工作机制和配置方法。

---

## 1. 智能体工作区 (Workspace)

工作区是智能体运行的唯一合法目录（CWD），用于存放工具、上下文文件及临时数据。这是智能体与文件系统交互的边界。

*   **核心配置**：在配置文件中通过 `agents.defaults.workspace` 指定。
*   **初始化**：建议使用 `openclaw setup` 命令。该命令会自动创建 `~/.openclaw/openclaw.json` 并初始化默认工作区。
*   **沙箱模式 (Sandbox)**：如果启用 `agents.defaults.sandbox`，非主会话（例如子任务或独立线程）可以在 `agents.defaults.sandbox.workspaceRoot` 目录下使用按会话隔离的独立工作区，确保互不干扰。

---

## 2. 引导文件 (Bootstrap Files)

OpenClaw 通过在工作区内注入特定的 Markdown 文件来定义智能体的行为、人设和记忆。在**新会话的第一轮对话**中，这些文件的内容会被直接注入到智能体的系统提示词或上下文历史中。

| 文件名 | 用途描述 |
| :--- | :--- |
| `AGENTS.md` | 操作指令与长期“记忆”。用于规定智能体必须遵守的硬性规则。 |
| `SOUL.md` | 人设、行为边界、语气风格。定义智能体的“性格”。 |
| `TOOLS.md` | 用户维护的工具使用说明（注意：这并非工具的定义代码，而是告诉智能体*如何*使用可用工具）。 |
| `IDENTITY.md` | 智能体名称、视觉风格、常用表情等基础属性。 |
| `USER.md` | 用户档案及偏好称呼，帮助智能体提供个性化服务。 |
| `BOOTSTRAP.md` | 仅限首次运行的仪式性文件（通常在启动完成后需要手动删除）。 |

*   **处理逻辑**：
    *   如果文件为空，则会被跳过。
    *   如果文件过大，系统会对其进行修剪或截断，以节省宝贵的 Token 空间并防止超出上下文窗口。
*   **禁用引导**：如果您希望使用预置的工作区并禁用这些自动文件创建和注入行为，可以在配置中设置：
    ```json
    { "agent": { "skipBootstrap": true } }
    ```

---

## 3. 工具与技能 (Tools & Skills)

智能体通过工具与外部世界交互，通过技能（Skills）扩展特定领域的能力。

### 3.1 内置工具
*   **核心工具**：如 `read` (读文件), `exec` (执行命令), `edit` (编辑文件), `write` (写文件) 等系统级别工具始终可用，构成了智能体操作的基础。
*   **可选工具**：例如 `apply_patch`，其可用性由配置项 `tools.exec.applyPatch` 控制。
*   **注意**：前面提到的 `TOOLS.md` 文件仅作为智能体使用工具的“指南手册”，它本身**不决定**某个工具是否存在或能否被调用。

### 3.2 技能 (Skills) 加载优先级
当存在同名的技能定义时，系统按照以下优先级进行加载（数字越小优先级越高）：
1.  **工作区级别**：`<workspace>/skills` （针对特定项目的定制技能）
2.  **用户全局/本地级别**：`~/.openclaw/skills` （用户自己编写的通用技能）
3.  **内置级别**：随 OpenClaw 安装包自带的默认技能。

---

## 4. 会话管理 (Sessions)

会话记录了智能体与用户之间的对话历史。

*   **存储路径**：默认保存在 `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`。
*   **格式**：采用 JSONL (JSON Lines) 格式存储，便于追加和流式读取。
*   **兼容性提示**：OpenClaw 使用自己稳定的会话 ID 机制。它**不会**读取旧版本 Pi 或 Tau 系统的会话文件夹，实现了彻底的分离。

---

## 5. 交互与流式传输逻辑

### 5.1 消息队列模式
当用户在智能体思考或执行任务时发送新消息，系统如何处理：
*   **Steer (转向/中断模式)**：入站的新消息会中断智能体当前的运行。如果队列中有积压消息，智能体会跳过当前轮次剩余的工具调用，并记录一个内部错误 `Skipped due to queued user message.`，然后立即开始处理最新的用户消息。
*   **Followup / Collect (跟随/收集模式)**：入站的新消息会被放入队列，系统会等待智能体完成当前轮次（Turn）的所有思考和操作后，再在下一轮次处理这些新消息。

### 5.2 流式分块 (Chunking)
为了优化阅读体验，特别是对于长文本输出，OpenClaw 支持流式块合并：
*   **总开关**：`agents.defaults.blockStreamingDefault` (默认值为 "off")。
*   **分块控制参数**：
    *   `blockStreamingChunk`: 控制“软块”的大小（默认通常在 800–1200 字符之间）。
    *   `blockStreamingCoalesce`: 合并多个小的流式块为大块，减少聊天界面频繁的屏幕刷新（刷屏）。
    *   `blockStreamingBreak`: 调整分块的边界条件（例如在 `text_end` 文本结束或 `message_end` 消息结束时断开）。

---

## 6. 模型引用规范

在配置文件中指定 LLM 模型时，必须遵循 `provider/model` 的格式规范：

*   **标准格式示例**：`openai/gpt-4o` （OpenAI 提供的 GPT-4o 模型）
*   **多级路径示例**（例如使用 OpenRouter 聚合服务）：`openrouter/moonshotai/kimi-k2`
*   **默认行为**：如果配置的字符串中省略了 provider（即 ID 中不包含 `/`），系统会尝试将其解析为预设的别名，或者使用默认提供商的模型。

---

## 7. 最小化配置示例

要使 OpenClaw 智能体基本运转起来，您的 `openclaw.json` 至少需要包含以下配置（以 WhatsApp 接入为例）：

```json
{
  "agents": {
    "defaults": {
      "workspace": "/path/to/your/workspace"
    }
  },
  "channels": {
    "whatsapp": {
      "allowFrom": ["your_phone_number_with_country_code"]
    }
  }
}
```

---

*注：OpenClaw 虽然在底层复用了 `pi-mono` 项目的部分核心代码，但它是一个独立运行的系统。它**不会**读取 `~/.pi/agent` 中的任何旧设置，并且**不包含** `pi-coding` （专门用于复杂代码生成的重型运行时）。*
