# Python for JavaScript Developers: A Cheat Sheet
# 给 JavaScript 开发者的 Python 速查手册

这份文档旨在帮助熟悉 JS 的你快速掌握 Python。我们不讲废话，直接上代码对比。

---

## 1. 基础语法 (Basics)

### 打印与注释
| Feature | JavaScript (Node.js) | Python 3 |
| :--- | :--- | :--- |
| **打印** | `console.log("Hello");` | `print("Hello")` |
| **单行注释** | `// Comment` | `# Comment` |
| **变量声明** | `const x = 1;` / `let y = 2;` | `x = 1` (没有 const/let) |
| **字符串插值** | `` `Value: ${x}` `` | `f"Value: {x}"` (f-string, 推荐) |

### 数据类型陷阱
*   **Booleans:** JS 是 `true/false`，Python 是 `True/False` (**首字母必须大写**)。
*   **空值:** JS 是 `null/undefined`，Python 只有一个 `None`。

---

## 2. 数据结构 (Data Structures)

### 列表 vs 数组 (List vs Array)

**JavaScript:**
```javascript
const numbers = [1, 2, 3];
numbers.push(4);          // 添加
const last = numbers.pop(); // 取出
console.log(numbers.length); // 长度属性
```

**Python:**
```python
numbers = [1, 2, 3]
numbers.append(4)         # 添加 (.push -> .append)
last = numbers.pop()      # 取出 (一样)
print(len(numbers))       # 长度是一个内置函数 len()
```

### 字典 vs 对象 (Dict vs Object)

**JavaScript:**
```javascript
const user = { name: "Nate", age: 30 };
console.log(user.name);   // 点号访问 (常用)
console.log(user["name"]); // 括号访问
const keys = Object.keys(user);
```

**Python:**
```python
user = {"name": "Nate", "age": 30}
# print(user.name)        ❌ 错误！Python 字典不能用点号访问
print(user["name"])       ✅ 正确
print(user.get("name"))   ✅ 推荐 (如果key不存在返回 None，不会报错)
keys = list(user.keys())  # 获取所有 key
```

---

## 3. 逻辑控制 (Control Flow)

### 条件判断 (If/Else)
*注意：Python 不用括号 `()` 包裹条件，也不用 `{}`，而是用冒号 `:` 和缩进。*

**JavaScript:**
```javascript
if (score > 90) {
    console.log("A");
} else if (score > 80) {
    console.log("B");
} else {
    console.log("C");
}
```

**Python:**
```python
if score > 90:            # 没有括号，结尾加冒号
    print("A")            # 必须缩进
elif score > 80:          # else if 缩写为 elif
    print("B")
else:
    print("C")
```

### 循环 (Loops)

**JavaScript (for-of):**
```javascript
const items = ["a", "b", "c"];
for (const item of items) {
    console.log(item);
}
```

**Python (for-in):**
```python
items = ["a", "b", "c"]
for item in items:        # 这里的 in 等同于 JS 的 of
    print(item)
```

**想要索引 (Index)?**
*   JS: `items.forEach((item, index) => ...)`
*   Py: `for index, item in enumerate(items): ...`

---

## 4. 函数 (Functions)

**JavaScript:**
```javascript
function add(a, b) {
    return a + b;
}

// 箭头函数
const add = (a, b) => a + b;
```

**Python:**
```python
def add(a, b):            # def 关键字
    return a + b

# Lambda (类似箭头函数，但只能写一行逻辑)
add = lambda a, b: a + b
```

---

## 5. 高级特性：Python 的杀手锏

### 列表推导式 (List Comprehension)
这是 Python 最迷人的地方。替代 JS 的 `.map()` 和 `.filter()`。

**JS (Map + Filter):**
*思维模式：流水线工人 (Pipeline) - 先筛选，再加工，可能产生中间数组。*
```javascript
const numbers = [1, 2, 3, 4, 5];
// 选出偶数，然后平方
const result = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * n);
```

**Python:**
*思维模式：数学公式 (Mathematics) - 就像定义集合 $\{ n^2 \mid n \in \text{numbers}, n \text{ is even} \}$。只遍历一次，效率更高。*
```python
numbers = [1, 2, 3, 4, 5]
# 一行搞定：[变换 for 元素 in 列表 if 条件]
# 读起来像英语：Give me n*n for every n in numbers if n is even.
result = [n * n for n in numbers if n % 2 == 0]
```

---

## 6. 模块化 (Modules)

**JavaScript (ES Modules):**
```javascript
import fs from 'fs';
import { myFunc } from './utils.js';
```

**Python:**
```python
import os                 # 导入整个模块
from datetime import datetime  # 导入特定对象
# 导入本地文件 (假设同级目录下有 utils.py)
from utils import my_func 
```

---

## 💡 总结：思维转换
1.  **缩进是生命:** 别忘了缩进，别忘了冒号 `:`。
2.  **蛇形命名:** JS 喜欢 `camelCase` (myVariable)，Python 社区标准是 `snake_case` (my_variable)。
3.  **显式优于隐式:** Python 不会像 JS 那样做奇怪的类型转换 (`"1" + 1` 在 JS 是 `"11"`, 在 Python 报错)。

祝 coding 愉快！
