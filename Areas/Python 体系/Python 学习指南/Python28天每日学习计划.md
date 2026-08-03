# 面向前端/TS 开发者的 Python 28 天逐日保姆级学习计划

> **制定说明**：
> 本计划专为前端 / TS 开发者定制，共 28 天（4 周，每日按 1.5 - 2 小时规划）。
> **每天均包含三个核心板块**：
> 1. **理论知识 (Concepts)**：需要理解的概念与语法
> 2. **底层原理 (Underlying Mechanics)**：运行机制、内存模型或设计模式
> 3. **每日实操与练习 (Daily Hands-on Coding Task)**：具体的代码任务与输入输出规范

---

## 📅 Week 1: 语法映射、核心特性与现代工具链 (Day 1 - Day 7)

---

### Day 1: 现代环境 (`uv` / `ruff`) 与 Python 基础类型
- **理论知识**：Python 3.12+ 基础类型（`str`, `int`, `float`, `bool`, `None`）；`uv` 虚拟环境管理与 `pyproject.toml`。
- **底层原理**：`uv` 的 Rust 依赖解析引擎；Python 动态类型与变量引用模型；字节码编译 (`.pyc`) 过程。
- **每日实操与练习**：
  - *任务*：使用 `uv init my_project` 创建项目，配置 `uv venv`。编写 `day01_basics.py`，接收一个 JSON 格式字符串，解析并进行字符串拼接与格式化（使用 f-string），利用 `type()` 和 `isinstance()` 输出类型检查结果。
  - *输入*：`'{"name": "Alice", "age": 25, "score": 98.5}'`
  - *输出*：打印 `"User Alice (Age: 25) scored 98.5. Validated: True"`。

---

### Day 2: 列表、元组、集合与字典 (映射 TS Array & Object)
- **理论知识**：`list`, `tuple`, `set`, `dict` 常用 API；列表/字典/集合推导式（List/Dict/Set Comprehension）。
- **底层原理**：`list` 内存模型（指针动态数组）；`dict` 哈希表实现与 `hash()` 可哈希性（为何 `dict` key 必须不可变）。
- **每日实操与练习**：
  - *任务*：编写 `day02_collections.py`，不用 `for` 循环，仅使用推导式完成：过滤出列表中的正数并翻倍；将嵌套列表扁平化；清洗字典中值为 `None` 的项。
  - *输入*：`data = {"a": 1, "b": None, "c": -5, "d": 10}`
  - *输出*：`cleaned = {"a": 2, "d": 20}`。

---

### Day 3: 函数定义、参数解包与高阶函数
- **理论知识**：`def` 声明、位置参数、关键字参数、`*args` 与 `**kwargs` 解包；`lambda` 表达式；`map`/`filter`/`reduce`。
- **底层原理**：Python LEGB 作用域查找规则（Local, Enclosing, Global, Built-in）；函数对象在栈帧中的传递。
- **每日实操与练习**：
  - *任务*：编写 `day03_functions.py`，实现一个 `pipeline_runner(data, *transforms)` 函数，接收初始数据与任意数量的处理函数，依次链式执行并返回最终结果。
  - *测试代码*：`pipeline_runner(" hello world ", str.strip, str.title, lambda s: s.replace(" ", "_"))`
  - *期望输出*：`"Hello_World"`。

---

### Day 4: 装饰器 (`@decorator`) 与元编程基础
- **理论知识**：装饰器语法糖原理；闭包（Closure）；`@functools.wraps` 保持函数元信息；带参数的装饰器。
- **底层原理**：`@decorator` 等价于 `func = decorator(func)`；函数对象的 `__name__` 与 `__doc__` 属性替换。
- **每日实操与练习**：
  - *任务*：编写 `day04_decorators.py`，实现一个 `@time_and_log(log_file="app.log")` 装饰器，记录被修饰函数的执行耗时、输入参数与返回值，并追加写入指定日志文件。
  - *输出验证*：运行修饰函数后，检查 `app.log` 包含类似 `[2026-08-03 12:00:00] fn: add, args: (2, 3), cost: 0.001s` 的记录。

---

### Day 5: 面向对象、类方法与魔术方法 (`Dunder Methods`)
- **理论知识**：`class` 定义、`__init__`、`self` 参数；继承；魔术方法 (`__str__`, `__repr__`, `__call__`, `__getitem__`)。
- **底层原理**：C3 线性化算法与 C3 MRO (Method Resolution Order) 方法查找顺序；`__dict__` 属性字典机制。
- **每日实操与练习**：
  - *任务*：编写 `day05_classes.py`，实现一个 `SmartDict` 类（继承自 `dict`），支持类似 JS 的点语法访问属性（如 `d.name` 代替 `d["name"]`），并实现 `__call__` 使对象可被直接当作函数调用。
  - *测试代码*：`d = SmartDict(a=1, b=2); print(d.a); d(key="c", val=3)`
  - *期望输出*：打印 `1`，且调用后 `d.c` 值为 `3`。

---

### Day 6: 上下文管理器 (`with`) 与异常处理
- **理论知识**：`try...except...else...finally` 块；自定义异常；`with` 语句；`contextlib.contextmanager` 装饰器。
- **底层原理**：上下文管理协议（`__enter__` 与 `__exit__` 方法）；异常栈帧抛出与捕获链。
- **每日实操与练习**：
  - *任务*：编写 `day06_context.py`，使用 `@contextmanager` 实现一个 `capture_stdout()` 上下文管理器，能够临时重定向并捕获代码块内部所有的 `print` 输出并返回为字符串。
  - *测试代码*：`with capture_stdout() as output: print("hello"); print("world"); print(output.getvalue())`
  - *期望输出*：`"hello\nworld\n"`。

---

### Day 7: Week 1 综合复习与代码重构小结
- **理论知识**：Pythonic 编码规范（PEP 8）；使用 `ruff check` 与 `ruff format` 格式化代码。
- **底层原理**：列表推导式与 `for` 循环在字节码层面 (`DIS`) 的性能差异分析。
- **每日实操与练习**：
  - *任务*：编写一个日志解析 CLI 工具 `day07_log_parser.py`。读取一段 Web 服务器日志字符串，提取 IP、请求路径和状态码，统计每个 IP 的访问次数并输出为 JSON 文件，综合运用 Week 1 的推导式、类、装饰器与异常处理。

---

## 📅 Week 2: 类型系统 (`typing`), Pydantic v2 与 LLM Schema (Day 8 - Day 14)

---

### Day 8: Python 类型标注 (Type Hints) 基础
- **理论知识**：`typing` 模块；基础标注（`str`, `int`, `bool`）；`list[T]`, `dict[K, V]`, `Optional[T]`, `Union[T1, T2]`, `|` 运算符。
- **底层原理**：PEP 484 标准；静态类型检查 (Mypy/Pyright) 与运行时类型擦除；`__annotations__` 属性。
- **每日实操与练习**：
  - *任务*：编写 `day08_typing.py`，为一个无类型标注的复杂算法脚本（包含字典嵌套和列表过滤）补全严格的类型标注，运行 `uv run mypy day08_typing.py` 确保 0 报错。

---

### Day 9: 高级类型 (`Callable`, `Generic`, `Annotated`)
- **理论知识**：`Callable[[Args], Ret]`, `TypeVar`, `Generic[T]`, `Literal`, `Annotated[T, Metadata]`。
- **底层原理**：`Annotated` 如何在不影响静态类型检查的情况下向类型元数据字典附加额外信息。
- **每日实操与练习**：
  - *任务*：编写 `day09_generics.py`，实现一个类型安全的泛型内存缓存类 `Repository[T]`，包含 `save(id: str, item: T) -> None` 和 `get(id: str) -> T | None` 方法，支持通过泛型参数约束存储的数据类型。

---

### Day 10: Pydantic v2 基础 (`BaseModel` 与 `Field`)
- **理论知识**：`pydantic.BaseModel`；`Field(description=..., ge=..., default=...)`；数据校验与类型自动转换。
- **底层原理**：Pydantic v2 核心 Rust 校验引擎 (`pydantic-core`) 及其性能提升机制。
- **每日实操与练习**：
  - *任务*：编写 `day10_pydantic_base.py`，定义 `UserProfile` 模型（包含 `username: str`, `age: int = Field(ge=0, le=120)`, `tags: list[str]`）。尝试传入字符串 `"25"` 给 `age` 观察类型自动转换，传入 `-5` 观察抛出的 `ValidationError`。

---

### Day 11: Pydantic 自定义校验器 (`@field_validator` & `@model_validator`)
- **理论知识**：`@field_validator(mode="before"|"after")`, `@model_validator(mode="after")`, 抛出 `ValueError`。
- **底层原理**：Pydantic 校验生命周期（前置转换 ➔ 字段校验 ➔ 后置模型校验）。
- **每日实操与练习**：
  - *任务*：编写 `day11_validators.py`，定义 `ChatMessage` 模型（包含 `role: Literal["system", "user", "assistant"]`, `content: str`）。使用 `@field_validator("content")` 自动剔除首尾空白字符并过滤 HTML 标签。

---

### Day 12: Pydantic 序列化与别名转换
- **理论知识**：`model_dump()`, `model_dump_json()`, `model_validate_json()`, `Field(alias="...")`, `populate_by_name=True`。
- **底层原理**：Python 字典序列化与 CamelCase/SnakeCase 别名转换生成器机制。
- **每日实操与练习**：
  - *任务*：编写 `day12_serialization.py`，接收前端传入的驼峰命名 JSON 字符串 `{"userId": "123", "createdTime": "2026-08-03"}`，使用 Alias 解析为蛇形命名的 Pydantic 模型，修改后导出为驼峰 JSON。

---

### Day 13: OpenAI Function Calling 与 JSON Schema 导出
- **理论知识**：`model_json_schema()`；OpenAI Tool / Function Calling 定义规范；Structured Outputs 约束。
- **底层原理**：LLM 如何利用 JSON Schema 进行语法约束解码 (Grammar-guided constrained decoding)。
- **每日实操与练习**：
  - *任务*：编写 `day13_json_schema.py`，定义一个 `SearchWebTools` Pydantic 类，将其自动转化为符合 OpenAI API `tools` 规约的 JSON 对象格式并打印输出。

---

### Day 14: Week 2 综合实战 - 智能结构化响应解析器
- **理论知识**：大模型非结构化文本到结构化 JSON 的提取与容错重试机制。
- **底层原理**：基于 Pydantic 校验结果动态构建 Repair Prompt 进行二次修复。
- **每日实操与练习**：
  - *任务*：编写 `day14_response_parser.py`，实现一个 `parse_llm_json(raw_text: str, model_cls: Type[T]) -> T` 函数。能够自动剥离 LLM 输出中包裹的 ```json 代码块，使用 Pydantic 解析，失败时捕获 Error 并输出格式化报错信息。

---

## 📅 Week 3: 异步编程 (`asyncio`) 与高并发 FastAPI (Day 15 - Day 21)

---

### Day 15: `asyncio` 协程与事件循环基础
- **理论知识**：`async def`, `await`, 协程对象 (Coroutine), `asyncio.run()`, 事件循环生命周期。
- **底层原理**：Python 单线程协作式多任务机制；Python Event Loop 与 Node.js Event Loop 的异同。
- **每日实操与练习**：
  - *任务*：编写 `day15_async_basics.py`，定义 3 个异步任务模拟不同耗时的网络请求，在单线程中使用 `asyncio` 顺序与并发调用，记录并对比总耗时。

---

### Day 16: `asyncio` 并发控制 (`gather`, `Semaphore`)
- **理论知识**：`asyncio.gather(*tasks)`, `asyncio.create_task()`, `asyncio.Semaphore(value)`, `asyncio.wait_for()`.
- **底层原理**：任务调度队列；如何利用信号量限制并发 API 调用数防止触发 LLM Rate Limit (429)。
- **每日实操与练习**：
  - *任务*：编写 `day16_concurrency.py`，模拟向 OpenAI 发送 15 个并发请求。使用 `asyncio.Semaphore(3)` 控制最大并发数限制为 3，打印每次请求的开始与完成时间戳。

---

### Day 17: 生成器与异步生成器 (`yield` / `async for`)
- **理论知识**：生成器函数 (`yield`), `next()`, `AsyncGenerator`, `async for` 语法。
- **底层原理**：生成器迭代器协议；状态保存在生成器栈帧中的暂停与恢复机制。
- **每日实操与练习**：
  - *任务*：编写 `day17_async_generator.py`，实现一个 `async def stream_tokens(text: str)` 异步生成器，每隔 50ms `yield` 输出一个单词。使用 `async for` 循环消费并打印该流。

---

### Day 18: FastAPI 核心（路由、参数与 Pydantic 绑定）
- **理论知识**：FastAPI 声明、`@app.get` / `@app.post`、路径参数、查询参数、请求体 Pydantic 绑定。
- **底层原理**：ASGI (Asynchronous Server Gateway Interface) 协议基础；Starlette 路由映射与 OpenAPI 描述自动生成。
- **每日实操与练习**：
  - *任务*：编写 `day18_fastapi_base.py`，使用 FastAPI 搭建一个 Todo API，包含 CRUD 4 个接口，请求体与响应体均绑定 Pydantic 模型。运行 `uvicorn` 并打开 `http://localhost:8000/docs` 测试。

---

### Day 19: FastAPI 依赖注入 (`Depends`) 与 `httpx.AsyncClient`
- **理论知识**：FastAPI `Depends()`；`httpx.AsyncClient` 异步 HTTP 客户端；连接池复用。
- **底层原理**：FastAPI 依赖项图（Dependency Graph）解析机制；全局单例 HTTPClient 生命周期管理。
- **每日实操与练习**：
  - *任务*：编写 `day19_deps_httpx.py`，利用 `Depends` 注入全局 `httpx.AsyncClient`，暴露一个接口接收第三方 API URL 并异步转发请求返回结果。

---

### Day 20: FastAPI 流式响应 (SSE) 与 `StreamingResponse`
- **理论知识**：`StreamingResponse`, `text/event-stream` 响应头, Chunked Transfer Encoding, SSE 格式 (`data: ...\n\n`)。
- **底层原理**：ASGI 未缓冲响应流传输；HTTP 长连接与 Connection 断开检测 (`request.is_disconnected()`)。
- **每日实操与练习**：
  - *任务*：编写 `day20_sse_endpoint.py`，暴露 POST `/api/chat/stream` 接口。结合 Day 17 的异步生成器，实现以 SSE 标准格式逐字吐出 Token 的打字机接口。

---

### Day 21: Week 3 综合实战 - 高并发 AI Gateway 中间件
- **理论知识**：AI 网关架构模式；超时降级、错误拦截与 Token 限流。
- **底层原理**：利用 `asyncio.wait_for` 实现请求超时打断，客户端断开连接时取消底层 API 任务。
- **每日实操与练习**：
  - *任务*：编写 `day21_ai_gateway.py`，搭建一个完整的 FastAPI 网关，接收前端请求、校验 Pydantic 模型、使用 `httpx` 异步请求大模型，并以 SSE 流式返回，支持 3 秒超时自动降级。

---

## 📅 Week 4: AI 生态集成、LangGraph 与工程实践 (Day 22 - Day 28)

---

### Day 22: Python AI SDKs (OpenAI / Anthropic Async 客户端)
- **理论知识**：`AsyncOpenAI` 客户端实例化；`client.chat.completions.create(stream=True)` 异步流式迭代。
- **底层原理**：AI SDK 内部重试机制与指数退避 (Exponential Backoff) 策略。
- **每日实操与练习**：
  - *任务*：编写 `day22_openai_sdk.py`，使用 `AsyncOpenAI` 编写一个异步函数，实现带有自定义错误捕获与流式 Token 输出的终端 CLI 对话工具。

---

### Day 23: 向量数据库与 RAG 集成 (`pgvector` / `sentence-transformers`)
- **理论知识**：Embeddings 向量生成；PostgreSQL `pgvector` 扩展；`<->` (欧氏距离) 与 `<=>` (余弦距离) 查询。
- **底层原理**：HNSW 向量索引算法原理与内存开销；数据库连接池。
- **每日实操与练习**：
  - *任务*：编写 `day23_rag_vector.py`，使用 `sentence-transformers` 或 OpenAI 将 5 条文本向量化，使用 `pgvector-python` 插入数据库并执行余弦相似度 Top-2 检索。

---

### Day 24: LangGraph Python 核心 (`StateGraph` 与节点定义)
- **理论知识**：LangGraph `StateGraph`；`TypedDict` 状态 Schema；节点函数 (Node Function)；`add_node()` & `add_edge()`。
- **底层原理**：不可变状态更新与状态归约器 (Reducers，如 `Annotated[list, add_messages]`)。
- **每日实操与练习**：
  - *任务*：编写 `day24_langgraph_base.py`，构建一个简单的 2 节点 Graph（InputNode ➔ ProcessNode），在节点间传递与更新 State 属性并打印全流程。

---

### Day 25: LangGraph 条件路由与 Tool Calling
- **理论知识**：`add_conditional_edges`；`tools_condition`；Agent 工具声明与多轮循环。
- **底层原理**：基于 LLM 输出工具调用决策图的分支跳转；图执行死循环防护。
- **每日实操与练习**：
  - *任务*：编写 `day25_langgraph_agent.py`，实现带搜索工具的 Agent Graph。若 LLM 需要搜索则跳转 `tool_node`，否则直接结束并输出最终回答。

---

### Day 26: LLMOps 可观测性与 Trace 监控 (`Langfuse`)
- **理论知识**：LLMOps 概念；`Langfuse` Python SDK；`@observe()` 装饰器；Trace 树状链与 Token 成本统计。
- **底层原理**：分布式追踪 (Distributed Tracing)；非阻塞后台异步上报 Telemetry 数据。
- **每日实操与练习**：
  - *任务*：编写 `day26_langfuse_trace.py`，在本地运行 Langfuse，给 FastAPI + LangGraph 节点加上 `@observe()` 装饰器，运行一次请求并在 Langfuse UI 中查看完整 Trace 树。

---

### Day 27: 自动化测试与质量保证 (`pytest` & `pytest-asyncio`)
- **理论知识**：`pytest` 基础；`pytest.mark.asyncio`；`httpx.AsyncClient` 配合 FastAPI 测试；Mock 外部 API (`unittest.mock`)。
- **底层原理**：测试 Fixture 生命周期；异步测试事件循环隔离。
- **每日实操与练习**：
  - *任务*：编写 `day27_test_gateway.py`，为第 21 周的 FastAPI SSE 网关编写完整的 `pytest` 自动化测试集，模拟校验成功、校验失败与流式响应断言。

---

### Day 28: 工程化打包与 Docker 部署收官
- **理论知识**：标准 Python 项目目录规范（`pyproject.toml`, `src/`）；`uv export` 生成 `requirements.txt`；多阶段 Docker 构建；`uvicorn` 生产部署。
- **底层原理**：Docker 镜像层缓存优化；Python 容器无头运行与环境变量注入。
- **每日实操与练习**：
  - *任务*：编写 `Dockerfile` 与 `day28_deploy_check.py`，将过去 4 周完成的 FastAPI + LangGraph AI 网关打包为 Docker 镜像并成功运行测试，以此作为 28 天 Python 攻坚的完美收官！
