# Python 基础语法与核心概念 (Python Basics)

> 本文档内容基于 **Python 官方文档 (docs.python.org)** 以及权威 Python 指南。旨在为您提供最精准、规范的 Python 基础语法详解。

---

## 1. 基础语法 (Basic Syntax)

Python 的设计哲学强调代码的可读性和简洁的语法。
[tutorialspoint basic-syntax](https://www.tutorialspoint.com/python/python_basic_syntax.htm)

### 1.1 缩进 (Indentation)
与 JavaScript 或 C++ 使用大括号 `{}` 来定义代码块不同，Python **强制使用缩进**来表示代码块。
*   **官方规范 (PEP 8)**：推荐使用 **4 个空格**进行每一层级的缩进。永远不要混用空格和制表符 (Tab)。
```python
def example_function():
    # 这是一个代码块，缩进4个空格
    if True:
        print("Hello, Python!") # 再次缩进4个空格
```

### 1.2 注释 (Comments)
*   **单行注释**：使用 `#` 符号。
*   **多行注释 / 文档字符串 (Docstrings)**：使用三个单引号 `'''` 或三个双引号 `"""`。官方推荐在模块、类或函数的首行使用 Docstrings 来生成文档。
```python
# 这是一个单行注释

def my_function():
    """
    这是一个文档字符串 (Docstring)
    用于说明函数的功能、参数和返回值。
    """
    pass
```

### 1.3 标识符 (Identifiers)
*   区分大小写。只能包含字母、数字和下划线，且**不能以数字开头**。
*   **命名约定 (PEP 8)**：
    *   普通变量/函数：`snake_case` (全小写，下划线分隔)
    *   类名：`PascalCase` (大驼峰)
    *   常量：`UPPER_CASE_WITH_UNDERSCORES` (全大写)

---

## 2. 变量与数据类型 (Variables and Data Types)

Python 是**强类型**（不允许隐式的不兼容类型操作，如 `1 + "1"` 会报错）且**动态类型**（变量不需要声明类型，类型在运行时推导）的语言。

### 2.1 变量赋值
不需要像 JS 那样使用 `let` 或 `const`。直接赋值即可：
```python
x = 10         # 自动推导为 int
name = "Alice" # 自动推导为 str
```

### 2.2 核心内置数据类型 (Built-in Types)
1.  **数值类型 (Numeric Types)**：
    *   `int` (整数)：精度无限制。`x = 42`
    *   `float` (浮点数)：对应 C 语言中的双精度浮点数。`pi = 3.14159`
    *   `complex` (复数)：`c = 1 + 2j`
2.  **布尔类型 (Boolean Type)**：
    *   `bool`：只有两个值 `True` 和 `False`（首字母必须大写）。它是 `int` 的子类（`True` 等于 1，`False` 等于 0）。
3.  **空值 (None Type)**：
    *   `NoneType`：只有一个值 `None`。类似于 JS 的 `null`，表示空或未赋值。

---

## 3. 字符串操作 (Working with Strings)

字符串 (`str`) 是不可变序列（Immutable Sequence）。可以使用单引号 `'...'` 或双引号 `"..."`。

### 3.1 f-strings (格式化字符串字面量)
*Python 3.6 引入的官方推荐格式化方式，极其高效且可读性好。*
```python
name = "World"
age = 2026
# 在字符串前加 f 或 F，可以在大括号内直接写入变量或表达式
greeting = f"Hello {name}, the year is {age}." 
print(f"Next year is {age + 1}.")
```

### 3.2 常用字符串方法
*   `s.lower()`, `s.upper()`：大小写转换。
*   `s.strip()`：去除两端的空白字符（包括换行符）。
*   `s.split(sep)`：按指定分隔符将字符串分割为列表。
*   `sep.join(iterable)`：将序列（如列表）用分隔符拼接成字符串。
*   `s.replace(old, new)`：替换子串。
```python
text = "  apple, banana, cherry  "
clean_text = text.strip()             # "apple, banana, cherry"
fruits = clean_text.split(", ")       # ['apple', 'banana', 'cherry']
joined_fruits = "-".join(fruits)      # "apple-banana-cherry"
```

---

## 4. 条件语句 (Conditionals)

控制流的基础，基于**布尔值的真假**进行分支选择。

### 4.1 if / elif / else
*   Python 没有 `switch/case`（直到 Python 3.10 才引入 `match/case` 结构），传统多分支使用 `elif`。
```python
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("C")
```

### 4.2 真值测试 (Truth Value Testing)
在条件判断中，以下值被视为 **False (Falsy)**：
*   常数：`None` 和 `False`
*   任何数值类型的零：`0`, `0.0`, `0j`
*   空的序列和集合：`""`, `()`, `[]`, `{}`, `set()`
其他所有值都被视为 **True (Truthy)**。

---

## 5. 循环语句 (Loops)

### 5.1 for 循环
Python 的 `for` 循环本质上是 `for...in`（遍历任何可迭代对象，如列表、字符串、字典等）。
```python
# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 使用 range() 生成数字序列: range(start, stop, step) -> 不包含 stop
for i in range(0, 5):
    print(i) # 打印 0, 1, 2, 3, 4
```

### 5.2 while 循环
当条件为真时持续执行。
```python
count = 0
while count < 3:
    print(count)
    count += 1
```

### 5.3 循环控制关键字
*   `break`：立即跳出最内层循环。
*   `continue`：跳过当前循环的剩余代码，进入下一次迭代。
*   `for...else` / `while...else`：这是 Python 的特色。如果循环**正常结束**（即没有被 `break` 打断），则执行 `else` 块。
```python
for num in [1, 2, 3]:
    if num == 5:
        break
else:
    print("5 was not found in the list.") # 会被打印
```

---

## 6. 类型转换 (Type Casting)

由于 Python 不会进行隐式类型转换，必须使用内置函数进行显式转换。

*   `int(x)`：将 x 转换为整数。如果是浮点数，会向下取整截断。
*   `float(x)`：转换为浮点数。
*   `str(x)`：转换为字符串表达。
*   `bool(x)`：使用标准真值测试规则转换为布尔值。
*   `list(x)`, `tuple(x)`, `set(x)`：在不同的序列/集合类型之间转换。
```python
s = "100"
n = int(s) + 50      # n = 150
f = float("3.14")    # f = 3.14
b = bool("")         # b = False
```

---

## 7. 异常处理 (Exceptions)

Python 使用 `try...except` 块来处理运行时错误，防止程序崩溃。

### 7.1 捕获异常
```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: Cannot divide by zero. Details: {e}")
except (TypeError, ValueError):
    # 可以同时捕获多种异常
    print("Type or Value error occurred.")
except Exception:
    # 捕获所有异常 (不推荐，可能会掩盖真正的 bug)
    print("An unknown error occurred.")
```

### 7.2 else 与 finally
*   `else`：当 `try` 块中**没有抛出任何异常**时执行。
*   `finally`：无论是否发生异常，**最终一定会执行**（常用于关闭文件、释放网络连接）。
```python
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found.")
else:
    print("Read successful.")
finally:
    if 'file' in locals() and not file.closed:
        file.close() # 确保资源释放
```

### 7.3 主动抛出异常 (raise)
```python
age = -5
if age < 0:
    raise ValueError("Age cannot be negative.")
```

---

## 8. 函数 (Functions)

函数是使用 `def` 关键字定义的可重用代码块。

### 8.1 定义与返回值
```python
def add(a, b):
    return a + b # 如果没有 return，默认返回 None
```

### 8.2 参数类型 (Arguments)
Python 参数系统极其强大和灵活：
1.  **位置参数 (Positional arguments)**：必须按顺序传入。
2.  **关键字参数 (Keyword arguments)**：通过参数名传入，顺序不重要。
3.  **默认参数 (Default arguments)**：为参数指定默认值。**注意：默认参数千万不能是可变对象（如空列表 `[]`），否则会在多次调用间共享状态。**
4.  **可变参数 (*args, **kwargs)**：
    *   `*args`：接收任意数量的额外位置参数，打包为**元组 (Tuple)**。
    *   `**kwargs`：接收任意数量的额外关键字参数，打包为**字典 (Dictionary)**。
```python
def make_profile(name, age=20, *hobbies, **details):
    print(f"Name: {name}, Age: {age}")
    print(f"Hobbies: {hobbies}") # 元组: ('reading', 'coding')
    print(f"Details: {details}") # 字典: {'city': 'NY', 'job': 'Dev'}

make_profile("Alice", 25, "reading", "coding", city="NY", job="Dev")
```

### 8.3 Lambda 函数 (匿名函数)
适用于非常简短的、一行能够写完的逻辑。
```python
multiply = lambda x, y: x * y
print(multiply(2, 3)) # 6
```

---

## 9. 列表、元组与集合 (Lists, Tuples, Sets)

这是 Python 中最常用的三种内置集合数据结构。

### 9.1 列表 (List): `[1, 2, 3]`
*   **特性**：有序 (Ordered)、**可变 (Mutable)**、允许重复元素、可容纳不同类型的元素。底层是动态数组。
*   **常用操作**：
```python
lst = [1, 2, 3]
lst.append(4)          # 追加元素: [1, 2, 3, 4]
lst.insert(1, "a")     # 指定位置插入: [1, 'a', 2, 3, 4]
lst.pop()              # 移除并返回最后一个元素
lst.remove(2)          # 移除首个匹配的值
# 切片 (Slicing): [start:stop:step]
sub_lst = lst[0:2]     # 获取索引 0, 1 的元素
```

### 9.2 元组 (Tuple): `(1, 2, 3)`
*   **特性**：有序 (Ordered)、**不可变 (Immutable)**。一旦创建，无法修改其内容（如果元组内包含列表，列表内部是可变的）。由于不可变，它的内存占用更小，且可用作字典的键。
*   **创建与解包**：
```python
t = (10, 20)
# 只要有逗号，即使没有括号也是元组 (Tuple Packing)
t2 = 1, 2, "hello" 
# 解包 (Tuple Unpacking)
x, y = t               # x=10, y=20
```

### 9.3 集合 (Set): `{1, 2, 3}`
*   **特性**：无序 (Unordered)、**元素唯一 (Unique)**。底层基于哈希表，因此判断元素 `in` set 的速度极快 (O(1))。
*   **常用操作**：
```python
s1 = {1, 2, 3}
s2 = {3, 4, 5}
s1.add(6)              # 添加元素
s3 = s1.union(s2)      # 并集 (或 s1 | s2)
s4 = s1.intersection(s2) # 交集 (或 s1 & s2)
```

---

## 10. 字典 (Dictionaries)

字典 `dict` 是存储**键值对 (Key-Value pairs)** 的数据结构，使用花括号 `{}` 定义。

### 10.1 核心特性
*   **键 (Key) 必须是不可变类型**：如字符串、数字、元组。不能是列表或字典。
*   **有序性**：从 Python 3.7 开始，字典**保证维持元素的插入顺序**。

### 10.2 常用操作
```python
person = {"name": "Bob", "age": 30}

# 访问值
name = person["name"]        # 如果键不存在会抛出 KeyError
age = person.get("age", 0)   # 推荐！如果键不存在返回默认值 0，不会报错

# 新增/修改
person["city"] = "London"

# 删除
del person["age"]
city = person.pop("city")    # 删除并返回该值

# 遍历
for key in person.keys():          # 仅遍历键 (默认行为)
    pass
for val in person.values():        # 仅遍历值
    pass
for k, v in person.items():        # 同时遍历键和值
    print(f"{k}: {v}")

# 字典合并 (Python 3.9+)
d1 = {"a": 1}
d2 = {"b": 2, "c": 3}
merged = d1 | d2                   # {'a': 1, 'b': 2, 'c': 3}
```
