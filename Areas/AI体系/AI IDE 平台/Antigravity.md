# Antigravity 官方使用教程：重塑 AI 辅助编程的新纪元

欢迎使用 Antigravity —— 由 Google Deepmind 团队专为高级 Agentic Coding 研发的下一代 AI 编程 IDE 与全自动编码助手。
本教程基于 [https://antigravity.google/docs/home](https://antigravity.google/docs/home) 的官方导航树结构生成，为您提供从零起步到精通的万字深度解析。

---

## 第一部分：起步与基础 (Getting Started)

### 1.1 首页与概览 (Home)
Antigravity 带来的不仅是普通的代码补全，它是一个具备**自主思考、长程规划设计、全栖复杂环境排故**能力的“数字结对编程伙伴”。您可以直接向 Antigravity 委托从无到有构建一个全栈 React/Node 系统的重活，通过它的自主推理模式直接交付。

### 1.2 快速起步安装 (Getting Started)
#### 1. 系统要求与下载
请前往 [antigravity.google/download](https://antigravity.google/download) 获取最新的官方客户端：
- **macOS**：支持最近 3 个大版本的 Apple 安全更新期内系统（建议 macOS Monterey 12 以上，仅原生态 Apple Silicon (M系列) 与兼容架构。已放弃纯 X86 老款 Mac 的深度优化）。
- **Windows**：Windows 10/11 64位。
- **Linux**：要求 `glibc >= 2.28`, `glibcxx >= 3.4.25`（例如 Ubuntu 20+, Debian 10+, Fedora 36）。

#### 2. 基础导航拓扑结构 (Navigation Paradigm)
在您打开 Antigravity 时，您主要在两个空间中穿梭：
- **Editor (代码编辑区)**：标准的类 VSCode 编码主屏。
- **Agent Manager (Agent 对话与控制管理台)**：追踪、分派和监管你的所有历史与并发 Agent。
**核心快捷键 `Cmd + E` (Windows/Linux 为 `Ctrl+E`)** 可以在当前聚焦的工作区中将两者无缝切换。对于熟悉传统 IDE 的用户，这是最快融入 Agent 驱动开发（Agent-Driven Development, ADD）的关键心智模型跨越。

### 1.3 从 Firebase Studio 优雅迁移 (Firebase Studio Migration)
如果您曾是 Firebase Studio 的老用户，您应该熟悉云端协同的弱代码生成生态。Antigravity 为原生重代码、重逻辑的本地仓库系统而设计。
**迁移要点**：
1. **工作区导入**：点击 `File -> Import from Firebase Studio` 可以无缝继承 Firebase 里的微服务配置文件和数据库 Rules。
2. **凭据挂载**：原有的 Firebase Service Account 密钥文件只需放入 `.gemini/` 或系统级安全路径下即可，由 Antigravity 自动加密摄取。
3. **Agent 自动适配**：对于 Firestore 的查询，Antigravity 支持启动后台指令自动检测 SDK 版本，无需手动更新 `package.json` 中的遗留版本。

---

## 第二部分：Agent 核心能力引擎 (Agent)

此时，真正的超级核心能力开始展露无遗。Antigravity 以它的 Agent 范式傲视群雄。

### 2.1 模型配置与选择 (Models)
由于背靠 Google Deepmind，您的底层心脏默认选用最高级、推理极限最深的 **Gemini Pro 级模型 (如 Gemini 3.1 Pro)**。
在设置选项中，您可以调节预设系统提示的基础调性：
- **代码准确率优先**：抑制幻觉发散，只使用已经确认文档证明的 API。
- **探索发散优先**：面对空白系统，允许系统自主探索创造新的脚手架模式。

### 2.2 Agent 工作模式与核心设置 (Agent Modes / Settings)
Antigravity 最出彩的设定在于它的 **规划模式 (Planning Mode)**。
- 只有触发重大架构改造（如新建完整服务、复杂的数据结构变迁）时，Agent 将主动切换为 Planning Mode。
- 在此模式下：它绝不会像传统的 Copilot 那样冒失地开始删改代码。它会**先执行无侵害的纯研究命令（Grep Search、Read Text）**，完成全盘知识构建。
- 阅读当前项目内的所有关联类后，它将生成一个 Markdown 格式的《实施计划》(Implementation Plan)，请求您的显式 Approve（批准）后，再开始实质修改。

### 2.3 权限护栏与安全 (Agent Permissions)
大模型具有“上帝能力”，同样也有破坏环境的隐患。Antigravity 内置安全阀门：
- **SafeToAutoRun** 控制机制：任何写库、重构、网络请求、`rm -rf` 等破坏性 Shell 脚本等都会被要求**用户人工审批交互**后才能执行。纯粹无害的操作（如 `cat`, `grep`, 依赖列表获取）配置了自动许可执行权限。
- 绝不提案使用高危模糊的命令。

### 2.4 预设规则与自动化工作流 (Rules / Workflows)
您可以为特定项目建立规则集。在 `.gemini/antigravity/` 下配置特定的工作流文档：
例如：每次 Agent 修改 Web 视图代码时，自动执行 `pnpm analyze-component --json` 以判定复杂度；若大于 300 行则立刻挂起并告知用户进行解耦。这种工作流可以完全自动化。

### 2.5 技能扩展生态 (Skills)
Antigravity 提供强大的**Skill 文件系统**。
在 `skills/` 目录下创建一个包含 Markdown 指令的 `SKILL.md`，可赋予 Agent 专业领域的“内功心法”。
例如：编写 `frontend-design` 技能，明确要求页面必须使用高质量交互、毛玻璃特性与预定义颜色盘。在会话过程中，Agent 遇到相关意图会自动触发 `view_file` 自主学习您的规章制服，实现真正的“企业级编码范式的本地无损平滑传递”。

### 2.6 并行任务组 (Task Groups)
对于极广的项目（比如建立一套全栈支付中台系统包括前后端、文档与测试），您可以将其切片丢入。内置 Agent 会开出 N 个平行的 Task Group 子树，在后台静默独立完成。最终于 Agent Manager 被您统一合并审阅。

### 2.7 沉浸式浏览器子节点 (Browser Subagent) [重点突破]
最惊艳的功能之一：内置完全可控的自动化沙盒浏览器！
当需要**解析只存在于互联网上的最新 SDK 开发文档、查询在线库变更、或者是模拟用户登录与表单点击测试**时：
Agent 会生成一个自主运行的 "浏览器子节点" (Browser Subagent)。
1. 它有独立的视觉网络认知，能找到 "Search Bar" 输入内容、点击 "Submit" 然后截图分析结果。
2. 整个交互过程将自动以 WebP 录像文件形式 (WebP videos) 保存到您的 `Artifacts` 制品文件夹中。
3. 它具备**多文件/多页面并行并发爬取**的能力。由于自带 JS 执行引擎与 DOM 解析，对于任何如 React/Vue 生成的单页应用文档 (SPA Docs) 皆能降维通吃，无需依赖过时的爬虫库！

### 2.8 环境隔离：沙盒 (Sandboxing) 与严格模式 (Strict Mode)
- **严格模式**：强制 Agent 必须进行彻底的单测与 Linter。若 Linter 有红线错误，强制不准进行任务交付。
- **沙盒机制**：Agent 运行的 bash 环境、npm 临时安装依赖甚至 docker 构建，只局限在一个虚拟沙窗空间内，不会污染宿主操作系统的全局环境。

---

## 第三部分：工具与协议生态 (Tools & Ecosystem)

### 3.1 核心内置工具链 (Tools Overview)
Antigravity 不仅是生成代码，更重要的是它**长了手和眼**。基础调用工具包括但不限于：
- **`grep_search`**：超高性能的多文件级正则全文高亮搜索。
- **`run_command`** / **`send_command_input`**：真正在终端执行命令、开启守护进程应用服务器并与之互动。
- **`generate_image`**：无网环境自动生成精美的高保真 UI 设计占位图资源，或者用来具象化灵感。
- **`multi_replace_file_content`**：如同外科医生般精确替换散落各处的特定代码块，无需重写整个文件消耗资源。

### 3.2 MCP 模型上下文协议集成 (MCP - Model Context Protocol)
Antigravity 已全面拥抱开源标准化的 Model Context Protocol。这意味着外部任何符合 MCP 协议定义的数据源接口（无论是 GitHub 制品、Figma 插件数据源、Slack 在线答疑库库）都可以原生地注入到您的代码生成上下文中作为底层数据参照基座。

---

## 第四部分：知识留存与产出物体系 (Artifacts & Knowledge)

### 4.1 产出物的核心哲学 (Artifacts Philosophy)
所有经过长时间酝酿思考的体系资料都不该只在滚动对话流里稍纵即逝。Antigravity 会自动把长期价值极大的系统输出保存为“产出物”（Artifacts，路径放置于 `.gemini/antigravity/brain/<conversation-id>/`）。
产出物支持以 Github Flavored Markdown 高光呈现（含警示区Alerts、Mermaid 高端流程图表、动态幻灯展示等）。

### 4.2 具体产出物形态解析
1. **任务列表 (Task List)** (`task.md`)
   规划达成后的待办清单：涵盖已选定未执行的 `[ ]`，施工中的 `[/]` 与落地的 `[x]`。它是一份实时的工程仪表图。
2. **实施计划 (Implementation Plan)** (`implementation_plan.md`)
   极具格式美的设计原稿。通过对文件做 `[MODIFY]`, `[NEW]`, `[DELETE]` 的统筹标定，在需要您首肯前绝不动手破坏原本的架构静好。
3. **演练文档 (Walkthrough)** (`walkthrough.md`)
   代码提交完毕后的大盘点：改了什么、测试反馈集如何、验收截屏或视频一目了然。
4. **屏幕截图与浏览器录像 (Screenshots & Browser Recordings)**
   子节点生成的全静态资源、GIF 与 WEBP 会无缝引用入各个报告文档中。

### 4.3 本地知识大脑：Knowledge System
最强的数据积累系统！当排查解决了一个极困难的本地 C++ 内存溢出 Bug 时，您不希望一个月后 Agent 重新掉这同一个坑。
- 系统包含 `Knowledge Items (KIs)`，会在应用级知识目录进行经验沉淀。
- **对话启动强制读取机制**：开启新会话时，Agent 会强制优先匹配本地知识词条摘要文件。如果是熟悉的代码块环境或者以前有类似案例，它就会走过去的老路并优化，而不是去重复“发现火把”。
- 历史会话日志也可随时调取追溯，完成上下文跨越。

---

## 第五部分：IDE 编辑器深度集成 (Editor)

除了独立于窗口之外，Antigravity 对界面的集成做到了丝滑衔接。

### 5.1 智能标签与分屏控制 (Tab)
任何由 Agent 修改的脏数据页面代码、被引用的资源或生成的可视化图表产出物均能在主 Editor 中生成单独的高亮标签，并允许使用沉浸式横向纵向面板切割呈现。通过简单的 `Drag & Drop` 或者 AI 指令：_“左边放 Plan，右边打开我需要改写的组件代码”_ 即可。

### 5.2 内联命令与快捷激活 (Command)
使用 Command 面板快速注入 slash (斜杠命令)。在任何选中的代码上悬停，或者在文本框利用极简指令可实现无感交互。您可以借助 `Command Development` 规则进一步自定。

### 5.3 沉浸式对话：侧边面板 (Agent Side Panel)
始终与您的代码编辑器常伴左右。所有的日常“疑问解惑”都在 Side Panel 进行，它是主要的操作集散地与反馈呈现流展示区。不会遮挡您的主力视野。

### 5.4 溯源与审查：代码审查与版本控制 (Review Changes + Source Control)
系统自带行级别的 Git Diff UI 系统 (`render_diffs`)。对于跨度多文件的批量修改，编辑器将以列表视图方式陈列出被 AI 修改的所有锚点。您在 Commit 并推送仓库前可轻易否决不满意的部分补丁。这极大地保证了系统的代码纯洁性安全。

---

## 第六部分：全局控制台与会话视图 (Agent Manager)

在处理繁重的多线程业务时，您会花更多精力在 Agent Manager 大盘。

### 6.1 隔离与聚焦：多工作空间协作 (Workspaces)
- **Inbox**：犹如电子邮件收件箱一般处理快速问询的收叠管理区。
- **Playground**：供您使用高级模型做肆意幻想或纯 Demo 测试的地方，不会对本地工作区造成污染与破坏的沙盘游戏室。

### 6.2 全息会话追踪 (Conversation View)
会话视图绝不再是一个纯文本对话。
- **全透视窗格 (Panes)**：左侧展示系统思考逻辑、正在调用的 Bash 命令进程，右侧呈现具体的代码修正块。
- **终端内嵌映射 (Terminal)**：在 Agent 被授权跑耗时 5 分钟的构建与下载依赖任务时，视图直接全真反馈远端/系统 Shell 每秒钟更新出来的 Log。
- **资源管理器视角 (Files)**：自动聚合本次会话涉及的所有活跃源文件与临时生成的 `scratch/` 脚本等数据供直接索引。
- **隐式浏览器监控面板 (Browser Subagent View)**：您可以全程肉眼在内置组件窗中实时收看 Subagent 操作页面自动化找资料的一举一动！

---

## 第七部分：浏览器集成特性 (Browser)

浏览器集成并不等价于子节点运行，而是指整个 IDE 系统自带内置浏览器访问配置。

### 7.1 全局拦截：允许与阻止名单 (Allowlist / Denylist)
面对公司内部系统或者安全极高要求的外网请求，您可以定义一套类似广告拦截名单的引擎。阻止 Agent 在未请求授权的情况自行爬取敏感域或调用外发请求（例如 `https://forbidden-competitor.com/*`）。

### 7.2 隔离账户配置：独立 Chrome 会话 (Separate Chrome Profile)
为了获取私有项目站（例如有特定 Cookie 验证的内网 Jira、Gitlab 等），允许您指向您的真实 Chrome 独立配置文件。这样 Subagent 在执行网页抓取或文档查阅时，就自带了免密的最高身份登录凭证令牌进行认证！省去反复在自动化流中登录验证码的麻烦。

---

## 第八部分：进阶与答疑 (Plans, Settings & FAQ)

### 8.1 订阅与算力分配 (Plans)
Antigravity 提供灵活阶梯级的计算调用频次，这决定了你能呼叫多少次极致纵深的万字深度推理与复杂图片/资源生成功耗。通过对用户提供灵活的高频效能算力订阅包（Plans），确保大规模并发展开。

### 8.2 高级设置全景图 (Settings)
包含偏好语言 (Language Settings)、快捷键映射 (Keybinding)、偏航检测宽容度、代码主题适配、自动格式化代码标准等全面的私人云端同步设置偏好。

### 8.3 常见问题解答与故障排查 (FAQ)
- **遇到依赖损坏与死循环报错怎么办？**：终止进程或者发送中断标志给终端 (`send_command_input - terminate: true`)，强制命令大模型重新提取日志复盘。
- **浏览器 Subagent 无法绕开验证系统？**：如遇高级反潜措施，使用您的手动授权或者手动引导干预功能进行协助点击。
- **生成代码后项目白屏？**：充分利用规划模式下内置生成的《演练文档 (Walkthrough)》中提及的强制验收标准重新驱动修复流指令。

---

**结语**
Antigravity 带来的编程生产力飞跃是一场降维打击。当熟练使用并协调任务组 (Task Group) 、子节点 (Subagent) 、自动化与知识沉淀后，您将不再是一名单纯的代码纺锤工，而是运筹帷幄的统帅。
现在，不妨按下 `Cmd + E`，向 Antigravity 说出您的第一条终极愿景吧。
