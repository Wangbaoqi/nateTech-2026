# OpenClaw Skills 全面进阶教程：从原理到实战

本教程结合了 Anthropic 构建 Claude Skill 的官方方法论与 OpenClaw 的工程实践，旨在帮助你从底层原理出发，掌握 Skill 的使用与创建。

---

## 1. 核心理念：什么是 Skills？

**Skills（技能）** 是模块化的、自包含的包。它们不仅仅是 Prompt 的堆砌，而是为特定任务设计的**专家级入职指南**。

*   **专才化**：模型是通才，Skill 赋予其特定领域的“程序化知识”（例如：公司的代码规范、特定的 API 调用逻辑、复杂的文件处理算法）。
*   **按需加载**：Skills 遵循**渐进式披露（Progressive Disclosure）**原则。平时不占用上下文，只有在对话内容匹配触发条时，才会被精准加载。
*   **解决脆弱性**：对于流程严苛、容易出错的任务（如处理大型 PDF 或执行特定代码重构），Skill 通过脚本（Scripts）和确定的指令提供“护栏”。

---

## 2. Skill 的解剖学 (Anatomy)

一个标准的 OpenClaw Skill 存储在一个文件夹中，典型结构如下：

```text
skill-name/
├── SKILL.md (核心/必须)     # 技能的入口与指令集
│   ├── YAML Frontmatter    # 元数据，决定“何时触发”
│   └── Markdown Body       # 指令正文，决定“如何行动”
├── scripts/ (资源/可选)     # 可执行脚本，用于处理确定性逻辑
├── references/ (资源/可选)  # 补充文档，用于存放大型数据或 API 参考
└── assets/ (资源/可选)      # 模板文件、图片或其他输出资产
```

### 关键组件深挖：
1.  **YAML Frontmatter**:
    *   `name`: 技能名称。
    *   `description`: **触发关键**。必须使用第三人称，清晰描述使用场景（例如："This skill should be used when the user asks to analyze PDF structure..."）。
2.  **SKILL.md Body**: 核心指令。必须使用**动词开头（祈使句）**。避免“你应该...”，而应使用“执行...”、“检查...”。

---

## 3. 渐进式披露：三级加载机制

这是 OpenClaw 高效管理 Token 的核心秘诀：

1.  **一级（Metadata）**: 始终在上下文中。模型读取所有 Skill 的 `name` 和 `description`，用于路由判断。
2.  **二级（SKILL.md Body）**: 只有当判定匹配时，才加载正文（建议保持在 1500-2000 字左右）。
3.  **三级（Resources）**: 只有当模型根据 SKILL.md 的指引认为需要查阅细节时，才会调用工具读取 `references/` 中的文件或运行 `scripts/`。

---

## 4. 如何使用 Skills

### 4.1 自动触发
在 OpenClaw 或 ACP (Claude Code) 中，技能是**被动触发**的。
*   **例子**：如果你安装了 `weather` 技能，当你问“上海今天冷吗？”，OpenClaw 会检测到 `weather` 技能的 `description` 匹配，从而自动加载该技能并调用相关工具。

### 4.2 手动安装与管理
*   **搜索**: `openclaw clawhub search [关键词]`
*   **安装**: `openclaw clawhub install [名称]`
*   **查看**: `openclaw skills list`

---

## 5. 如何创建高质量 Skill (六步法)

### 第一步：收集实例 (Concrete Examples)
问自己：用户会说什么样的话来找我？收集 2-3 个具体 Query。

### 第二步：规划资源 (Planning)
*   **指令化**：哪些逻辑是通用的，写在 `SKILL.md` 正文里。
*   **脚本化**：哪些代码逻辑固定且容易写错，写成 Python/JS 脚本放在 `scripts/`。
*   **文档化**：哪些数据太占空间（如 API 手册），放在 `references/`。

### 第三步：初始化结构
```bash
mkdir -p my-skill/{scripts,references,assets}
touch my-skill/SKILL.md
```

### 第四步：编写 SKILL.md
*   **Frontmatter 必须准确**：确保 `description` 包含了用户可能的触发词。
*   **指令要直接**：使用 Verb-first 风格。

### 第五步：验证与测试
在 OpenClaw 中对话测试。开启思考模式（Reasoning），确认模型是否识别到了该 Skill 并从 `references` 中提取了正确信息。

### 第六步：迭代
根据真实使用反馈（比如模型在某步逻辑上反复出错），通过添加具体的 `examples/` 或修改指令来收窄模型的自由度。

---

## 6. Anthropic 官方设计准则

1.  **保持精简 (Concise)**：挑战每一段话的价值，“如果没有这段话，Claude 会做错吗？”。如果不会，请删掉。
2.  **设置合适的自由度 (Degrees of Freedom)**：
    *   涉及**系统底座、关键安全**：给脚本，收窄自由度。
    *   涉及**前端设计、创意方案**：给 heuristic（启发式）指令，调高自由度。
3.  **拒绝冗余**：Skill 是给 AI 读的，不要写只有人看的 README。
4.  **引用机制**：在 `SKILL.md` 中引用子文件时要明确：“查阅 `references/api.md` 获取可用接口列表”。

---

## 7. OpenClaw 特有技巧

*   **本地 Skill 路径**：你可以在 `~/.openclaw/openclaw.json` 中配置 `skillsDirs` 增加你的私有存储目录。
*   **ACP 协作**：在 Claude Code 中创建 Skill 时，可以配合 `command-development` 技能，将 Skill 与快捷命令（Slash Commands）结合。

---
*教程编写者：Muse (Antigravity Expert Assistant)*
*日期：2026-03-04*
