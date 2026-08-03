# Day 1 学习指南与实操：现代环境 Setup 与 Python 基础类型

> **今日目标**：
> 1. 掌握现代 Python 工具链 **`uv`**，彻底摆脱传统 `pip`/`conda` 依赖混乱陷阱；
> 2. 掌握 Python 5 大基础数据类型，与 JS/TS 进行对比透彻理解；
> 3. 理解 CPython 动态引用模型与字节码 (`.pyc`) 执行原理；
> 4. 完成 Day 1 动手练习代码并通过校验。

---

## 一、 理论讲解：TS vs Python 核心概念映射

### 1. 现代包管理工具：`uv` (对比 `pnpm` / `npm`)

过去 Python 最受人诟病的是环境混乱（全局 `pip` 容易破坏系统环境，`virtualenv`/`conda` 命令繁琐）。
2024+ 社区推荐统一使用 Astral 出品的 **`uv`**（用 Rust 编写，速度比 pip 快 10-100 倍）：

| 功能 | Node.js / TS 生态 | Python 生态 (使用 `uv`) |
| :--- | :--- | :--- |
| **配置文件** | `package.json` | `pyproject.toml` |
| **锁定文件** | `pnpm-lock.yaml` | `uv.lock` |
| **隔离环境** | `node_modules/` | `.venv/` (虚拟环境) |
| **初始化项目**| `pnpm init` | `uv init` |
| **创建虚拟环境** | (自动) | `uv venv` |
| **安装依赖** | `pnpm add <pkg>` | `uv add <pkg>` |
| **执行脚本** | `pnpm exec ts-node script.ts` | `uv run script.py` |

---

### 2. 基础数据类型 (VS JavaScript)

Python 拥有 5 种最基础的数据类型：

#### (1) 整数 `int` (无界大整数)
* **JS 对比**：JS 的 `Number` 是 IEEE 754 双精度浮点数，超出 $2^{53}-1$ 需要用 `BigInt`。
* **Python**：Python 的 `int` 是**无限精度的**！你可以直接计算 `2 ** 1000`（$2^{1000}$），不会溢出。

#### (2) 浮点数 `float`
* **Python** 的 `float` 等价于 C 语言的 `double`（64位双精度）。
* 示例：`3.14`, `1.2e-5`。

#### (3) 字符串 `str` (不可变对象)
* **单双引号无区别**：`'hello'` 与 `"hello"` 完全相同。
* **多行字符串**：使用三引号 `""" multi-line """`。
* **模板字符串 (f-string)**：对比 JS 的反引号模板字符串 `` `Hello ${name}` ``：
  ```python
  name = "Alice"
  age = 25
  msg = f"Hello {name.upper()}, next year age is {age + 1}"
  # 输出: "Hello ALICE, next year age is 26"
  ```

#### (4) 布尔值 `bool`
* **注意首字母大写**：`True` 与 `False`（JS 中是 `true` / `false`）。
* **Falsy 值**：在 Python 中，`0`, `0.0`, `""`, `None`, `[]`, `{}` 在条件判断中均会被评估为 `False`。

#### (5) 空值 `None`
* **JS 对比**：JS 中有 `undefined`（未定义）和 `null`（空值）。
* **Python**：只有一个 `None`（属于 `NoneType`），代表变量无值。

---

### 3. 类型检查与显式转换

```python
x = "123"

# 1. 获取类型 (类似 JS 的 typeof)
print(type(x))  # <class 'str'>

# 2. 类型判断 (类似 JS 的 instanceof / Array.isArray)
if isinstance(x, str):
    print("x is a string")

# 3. 显式类型转换
num = int(x)       # 转为整数 123
flt = float(x)     # 转为浮点数 123.0
string_val = str(456) # 转为字符串 "456"
boolean_val = bool(1) # 转为 True
```

---

## 二、 底层原理：CPython 执行机制与 JS (V8) 执行机制深度对比

为了更好地从 Node.js/TS 转型 Python，我们需要透彻理解二者在**编译执行管线**、**内存与对象模型**、**垃圾回收机制**以及**并发与线程锁**上的底层物理差异。

---

### 1. 编译与执行管线 (V8 JIT vs CPython 栈虚拟机)

#### JavaScript (V8 引擎)
V8 采用 **JIT (Just-In-Time) 即时编译** 架构：
```text
JS 源码 ──> Parser (AST) ──> Ignition 解释器 (生成 Bytecode) ──(热点代码)──> TurboFan JIT 编译器 ──> 本地机器码 (Machine Code)
                                  ▲                                               │
                                  └──────────────── Deoptimization ────────────────┘ (类型假设失效退化)
```
* **混合执行**：解释执行与 JIT 动态编译并行。对于运行频繁的“热点函数”，V8 会直接将其编译为机器码，并在运行时根据类型反馈（Type Feedback）做内联和隐藏类优化。
* **逆优化 (Deopt)**：若传入参数类型发生变化，机器码会退化回字节码重新解释执行。

#### Python (CPython 解释器)
CPython 采用 **预编译字节码 + 栈式虚拟机 (Stack-based VM)** 架构：
```text
Python 源码 (.py)  ──(编译器)──>  字节码 Bytecode (.pyc 保存在 __pycache__)  ──> CPython 虚拟机 evaluation loop (ceval.c) ──> 机器指令 (CPU)
```
* **静态字节码**：运行 `python main.py` 时，源码直接编译为 `.pyc` 字节码文件。
* **栈虚拟机**：CPython 没有默认的复杂 JIT 编译器，VM 通过一个庞大的 `switch-case` 循环 (`ceval.c`) 逐条读取字节码指令并在虚拟机栈上完成入栈/出栈与运算。
* **性能特征**：启动速度快（因为无昂贵的 JIT 优化分析），但 CPU 密集型纯计算性能落后于 JIT 编译的 JS。

---

### 2. 内存模型与对象表示 ("万物皆对象" vs 栈/堆分离)

| 维度 | JavaScript (Node.js / V8) | Python (CPython) |
| :--- | :--- | :--- |
| **数据物理存储** | **栈/堆分离**：原始类型（Smi/Boolean 等）可打包保存在栈/寄存器或直接嵌入指针中；引用类型（Object/Array）存在堆上。 | **纯堆存储 (Everything is PyObject)**：所有数据（连整数 `1`、布尔值 `True`、函数）都是堆上的 `PyObject` 结构体。 |
| **变量的本质** | 保存具体值（原始类型）或堆地址指针（引用类型）。 | **纯引用标号 (Symbol Table)**：变量名仅仅是作用域字典 (`locals()`) 中的一个 Key，Value 是指向堆内存 `PyObject` 的指针。 |
| **属性查找优化** | **Hidden Class (Shape) + Inline Caching**：V8 动态偏移量转换，快速寻址。 | **Dynamic Dict Lookup**：通过 `__dict__` 或 MRO (Method Resolution Order) 字典查找（可通过 `__slots__` 优化）。 |
| **小对象优化** | Smi (Small Integer) 指针位标记。 | 小整数对象池 ([-5, 256]) 与字符串驻留 (Interning)。 |

---

### 3. 垃圾回收机制 (Tracing GC vs 引用计数+分代GC)

#### JavaScript (V8 Tracing GC)
V8 采用 **可达性分析 (Reachability) + 分代回收 (Generational GC)**：
1. **新生代 (Young Generation)**：采用 Scavenger 算法（复制-清除），快速清理生命周期短的局部变量。
2. **老生代 (Old Generation)**：采用 Mark-Sweep-Compact（标记-清除-整理）算法处理长期存活的对象。
3. **特点**：不需要实时统计每个变量的引用次数，GC 触发时会有短暂停顿 (Stop-The-World)，但 GC 机制独立于内存赋值操作。

#### Python (CPython GC)
CPython 采用 **引用计数为主 + 标记清除分代回收为辅** 的双层架构：
1. **主机制：引用计数 (Reference Counting)**
   * 每一个 `PyObject` 结构体头部都有一个 `ob_refcnt` 字段。
   * 变量赋值/传参时 `ob_refcnt + 1`；变量离开作用域/被 `del` 时 `ob_refcnt - 1`。
   * **实时销毁**：一旦 `ob_refcnt == 0`，内存立刻被回收（析构函数 `__del__` 立即执行）。
2. **辅机制：循环引用检测 (Cyclic GC)**
   * 引用计数无法解决循环引用（如 `a.py = b; b.py = a`）。
   * CPython 引入分代 GC（分代 0, 1, 2），仅针对容器类对象（`list`, `dict`, 自定义类对象）定期扫描并打断引用环。

---

### 4. 并发模型与执行锁 (Event Loop vs GIL)

#### JavaScript：单线程 Event Loop 异步架构
* **执行主线**：单线程 Call Stack（主线程不锁代码）。
* **异步并发**：I/O 操作交付给 libuv / Web APIs 线程池处理，回调函数排入 **Microtask Queue** (Promise) 或 **Macrotask Queue** (setTimeout/I/O)。
* **多核利用**：使用 Worker Threads 或 Cluster 创建多进程隔离通信。

#### Python：GIL 锁与多模式并发
* **GIL (Global Interpreter Lock，全局解释器锁)**：
  * CPython 内核由于引用计数不是线程安全的，因此加了一把全局粗粒度互斥锁（GIL）。
  * **影响**：同一时刻**只有一个 OS 线程**能在 CPython 虚拟机中执行 Python 字节码。
* **并发方案决策表**：

| 任务场景 | JS (Node.js) 最佳实践 | Python 最佳实践 | 说明 |
| :--- | :--- | :--- | :--- |
| **I/O 密集型** (网络请求/数据库) | `async` / `await` (Event Loop) | `asyncio` 或 `threading` 模块 | Python 线程在进行 I/O 时会自动释放 GIL，但 `asyncio` 内存开销更小。 |
| **CPU 密集型** (图像处理/AI计算/复杂数学) | Worker Threads / Cluster | `multiprocessing` 或 C/C++ 扩展 | Python 多线程无法利用多核 CPU；需使用 `multiprocessing` 开启多进程独立解释器避开 GIL，或调用 C/Rust 扩展库（如 NumPy/PyTorch 内部自动释放 GIL）。 |

---

## 三、 环境 Setup 步骤 (手把手教程)

在终端运行以下命令，完成 Day 1 环境搭建：

```bash
# 1. 安装 uv (Mac / Linux)
curl -sSf https://astral.sh/uv/install.sh | sh

# 2. 创建并进入 Day 1 目录
mkdir day01_demo && cd day01_demo

# 3. 使用 uv 初始化项目
uv init

# 4. 创建 Python 虚拟环境 (.venv)
uv venv

# 5. 验证安装与运行
uv run python --version
```

---

## 四、 每日实操与练习

### 📝 任务描述
在 `day01_demo` 目录下创建 `day01_basics.py` 文件。
编写一个 Python 脚本，模拟接收从前端 API 传来的 JSON 字符串，要求：
1. 使用 Python 标准库 `json` 解析 JSON 字符串；
2. 提取 `name` (转换为大写)、`age` (显式转为 `int`)、`score` (显式转为 `float`)、`is_active` (转为 `bool`)；
3. 使用 `isinstance()` 对解析后的字段进行类型安全断言；
4. 使用 **f-string** 拼接并格式化打印诊断诊断报告。

### 💻 练习代码模版与参考答案

```python
import json

def process_user_data(raw_json: str) -> str:
    # 1. 解析 JSON 字符串
    data = json.loads(raw_json)
    
    # 2. 提取并显式转换类型
    name = str(data.get("name", "")).strip().upper()
    age = int(data.get("age", 0))
    score = float(data.get("score", 0.0))
    is_active = bool(data.get("is_active", False))
    
    # 3. 类型断言检查
    assert isinstance(name, str), "name 必须为字符串"
    assert isinstance(age, int), "age 必须为整数"
    assert isinstance(score, float), "score 必须为浮点数"
    assert isinstance(is_active, bool), "is_active 必须为布尔值"
    
    # 4. 使用 f-string 拼接诊断报告
    status_str = "Active" if is_active else "Inactive"
    
    diagnostic_report = f"""
=== Day 1 Python Diagnostic Output ===
User: {name} (Status: {status_str})
Age: {age} (Type: {type(age).__name__})
Score: {score:.1f} (Type: {type(score).__name__})
Validation Passed: True
======================================
"""
    return diagnostic_report

if __name__ == "__main__":
    # 模拟前端传入的 JSON 数据
    test_json = '{"name": "Alice Developer", "age": "28", "score": "98.5", "is_active": true}'
    report = process_user_data(test_json)
    print(report)
```

### 🧪 运行与验证
在终端输入以下命令运行：
```bash
uv run python day01_basics.py
```

**期望终端输出**：
```text
=== Day 1 Python Diagnostic Output ===
User: ALICE DEVELOPER (Status: Active)
Age: 28 (Type: int)
Score: 98.5 (Type: float)
Validation Passed: True
======================================
```

---

### 🎉 Day 1 学习打卡 CheckList
- [ ] 成功使用 `uv` 创建了项目与虚拟环境
- [ ] 搞懂了 `int` 无限精度与 `None` 空值的物理概念
- [ ] 熟练掌握了 `f"..."` 字符串格式化
- [ ] 运行 `day01_basics.py` 成功输出正确诊断报告
