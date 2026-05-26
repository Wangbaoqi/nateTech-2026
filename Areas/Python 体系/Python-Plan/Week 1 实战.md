# Markdown 智能文档预处理器 (Markdown Smart Document Preprocessor)

本指南旨在帮助你完成第一周的实战任务。我们将使用 2026 年最先进的 Python 依赖与虚拟环境管理工具 **`uv`**，配合标准库 `pathlib`、`re`、`json`，并利用 **列表推导式** 和 **f-string** 编写一个高性能的文档分块预处理器（这是构建所有大模型 RAG 知识库系统的最底层基本功）。

---

## 🎯 任务目标

编写一个 Python 脚本，完成以下流程：
1. **环境初始化**：使用 `uv` 初始化你的第一个 Python 现代工程。
2. **文件读取**：使用现代面向对象的 `pathlib.Path` 读取目录下的 raw markdown 文件。
3. **文本清洗**：使用正则表达式 (`re`) 过滤掉无用的字符、多余的空行。
4. **智能分块 (Semantic Chunking)**：根据标题符号（如 `##`, `###`）将长文章切分成语义完整的小块，并利用**列表推导式**计算每一块的元数据（如字数、标题归属）。
5. **数据导出**：将处理好的分块结果导出为标准化的 JSON 文件。

---

## 🛠️ 第一步：使用 `uv` 初始化你的现代工程

在终端中，进入到当前 Week 1 目录中，执行以下命令：

```bash
# 1. 切换到第一周目录
cd "/Users/wangbaoqi/personal/nateTech-2026/Areas/Python 体系/Python/01_Learn the Basics"

# 2. 初始化现代 Python 项目 (生成 pyproject.toml)
uv init

# 3. 此时 uv 已经为你配置好了虚拟环境并生成了默认的 hello.py
# 尝试运行它
uv run hello.py
```

---

## 📝 第二步：准备测试数据

在当前目录下创建一个名为 `sample.md` 的测试文件。你可以把下面这篇 Markdown 文章复制进去：

```markdown
# 现代 AI 技术栈指南

## 1. 什么是 RAG
检索增强生成（Retrieval-Augmented Generation）是 2026 年大模型落地的核心技术。
它通过将外部私有知识库向量化，在生成答案前检索相关文档，极大地减少了模型的幻觉。

## 2. 什么是 Agent
智能体（Agent）赋予了大模型自主规划、记忆和调用工具的能力。
通过 LangGraph 等框架，我们可以把复杂的业务流程建模为图，使 Agent 具备逻辑循环和人机交互的能力。
这也是 AI 走向自主化智能的必经之路。

## 3. 什么是 MCP
Model Context Protocol 是由 Anthropic 推出的一套标准化上下文互操作协议。
它允许大模型安全、一致地访问本地文件、数据库和第三方 SaaS 软件，是智能体时代的 USB 接口。
```

---

## 💻 第三步：编写预处理器代码

在当前目录下，创建一个名为 `preprocessor.py` 的文件，我们将在这里实现核心的预处理逻辑。

### 💡 核心代码框架与参考实现

```python
import json
import re
from pathlib import Pathfr

def clean_text(text: str) -> str:
    """利用正则清洗多余的空白行和多余空格 (对应 JS 中繁琐的 string.replace)"""
    # 替换连续的三个及以上的换行符为两个换行符
    cleaned = re.sub(r'\n{3,}', '\n\n', text)
    return cleaned.strip()

def process_markdown(file_path: str | Path) -> list[dict]:
    """读取 Markdown 文件，并按 ## 标题切分语义块，返回结构化的段落列表"""
    path = Path(file_path)
    
    # 1. 安全读取文件内容 (无需像 JS 那样写 try/catch 或 fs.readFile callback)
    if not path.exists():
        raise FileNotFoundError(f"找不到测试文件: {path}")
        
    raw_content = path.read_text(encoding="utf-8")
    content = clean_text(raw_content)
    
    # 2. 用正则表达式按 '## ' 标题行切分文本
    # (?=## ) 是前瞻断言，保留标题符号本身
    sections = re.split(r'(?=## )', content)
    
    # 提取文章主标题 (假设第一行是 # Title)
    title_match = re.match(r'ti', content)
    main_title = title_match.group(1).split('\n')[0] if title_match else "未命名文档"
    
    # 3. 使用【列表推导式】优雅地过滤和重构数据 (核心心智转换！)
    # JS 思路: sections.map(s => ...).filter(s => s.trim())
    chunks = [
        parse_section(section, main_title, idx)
        for idx, section in enumerate(sections)
        if section.strip() and not section.startswith('# ') # 过滤掉主标题本身
    ]
    
    return chunks

def parse_section(section_text: str, main_title: str, index: int) -> dict:
    """解析单个 ## 块，提取标题、正文及元数据"""
    lines = section_text.strip().split('\n')
    
    # 提取当前小节的 ## 标题
    header_match = re.match(r'^##\s+(.+)', lines[0])
    section_title = header_match.group(1) if header_match else "未命名小节"
    
    # 合并正文内容
    body_text = "\n".join(lines[1:]).strip()
    
    # 4. 构造 Python 字典 (使用 f-string 构建元数据)
    return {
        "id": f"chunk-{index:03d}",
        "document_title": main_title,
        "section_title": section_title,
        "content": body_text,
        "metadata": {
            "char_count": len(body_text),
            "word_count": len(body_text.split())
        }
    }

def main():
    input_file = Path("sample.md")
    output_file = Path("chunks.json")
    
    print(f"🚀 开始读取文档: {input_file} ...")
    
    try:
        # 执行流处理
        processed_chunks = process_markdown(input_file)
        
        # 5. 写入 JSON 文件 (indent=4 保持美观，ensure_ascii=False 正常显示中文)
        output_file.write_text(
            json.dumps(processed_chunks, indent=4, ensure_ascii=False),
            encoding="utf-8"
        )
        
        print(f"✅ 处理成功！已生成 {len(processed_chunks)} 个语义分块。")
        print(f"📂 输出路径: {output_file.absolute()}")
        
    except Exception as e:
        print(f"❌ 运行出错: {e}")

if __name__ == "__main__":
    main()
```

---

## 🧪 第四步：运行与验证

在终端中，使用 `uv` 运行你的预处理器：

```bash
uv run preprocessor.py
```

**运行成功后，你将在同级目录下获得一个 `chunks.json` 文件**。它看起来会像这样：

```json
[
    {
        "id": "chunk-001",
        "document_title": "现代 AI 技术栈指南",
        "section_title": "1. 什么是 RAG",
        "content": "检索增强生成（Retrieval-Augmented Generation）是 2026 年大模型落地的核心技术。\n它通过将外部私有知识库向量化，在生成答案前检索相关文档，极大地减少了模型的幻觉。",
        "metadata": {
            "char_count": 91,
            "word_count": 3
        }
    },
    ...
]
```

---

## 💡 给 JS 开发者的挑战与思考

在完成代码后，请闭上眼睛思考以下几个与 JS 开发截然不同的心智转换：
1. **文件读取**：`Path("sample.md").read_text()` 是否比 JS 中需要 `import fs`, 编写 `fs.readFileSync` 或 `util.promisify` 优雅得多？
2. **列表推导式**：对比 JS 的 `.filter().map()`，Python 的 `[func(x) for x in list if cond]` 是不是更具“数学声明性”？
3. **字典访问**：在 `parse_section` 返回的字典中，如果你在其他地方尝试用 `chunk.document_title` 会发生什么？（提示：Python 会抛出 AttributeError，必须使用 `chunk["document_title"]`）。
