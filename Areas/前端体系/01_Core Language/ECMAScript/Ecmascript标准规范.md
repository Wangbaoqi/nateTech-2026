# ECMAScript 标准规范完全指南 (The Comprehensive Guide to ECMA-262)

> 本文档旨在将庞大晦涩的 ECMA-262 标准规范转化为开发者可理解、可掌握的系统性知识。内容涵盖最新的 ECMAScript 特性（截至 ES2024/ES2025 草案）及核心语言机制。

---

## 第一章：标准概览与制定流程 (Introduction)

### 1.1 什么是 ECMAScript?
*   **定义**: ECMAScript (简称 ES) 是由 Ecma International 通过 ECMA-262 标准定义的脚本语言规范。
*   **关系**: JavaScript 是 ECMAScript 的一种实现（其他实现包括 ActionScript 等）。Node.js 和 浏览器 (V8, SpiderMonkey, JavaScriptCore) 都是遵循此标准的宿主环境。

### 1.2 TC39 委员会与发布流程
*   **TC39**: 负责维护和演进标准的各个技术委员会。
*   **TC39 提案流程 (The TC39 Process)**: 一个特性进入标准需经历 5 个阶段：
    *   **Stage 0 (Strawman)**: 想法雏形。
    *   **Stage 1 (Proposal)**: 正式提案，确定问题与解决方案，指定负责人 (Champion)。
    *   **Stage 2 (Draft)**: 草案，精确的语法和语义描述。
    *   **Stage 3 (Candidate)**: 候选，规范文本完备，需浏览器实现和用户反馈。
    *   **Stage 4 (Finished)**: 完成，准备合入下一年度标准。
*   **版本命名**: ES6 (ES2015) 后，改为按年份发布，如 ES2023, ES2024。

---

## 第二章：核心语法与语义 (Syntax & Semantics)

### 2.1 词法结构 (Lexical Grammar)
*   **Unicode**: 源码文本是 Unicode 字符序列。
*   **保留字 (Keywords)**: `await`, `break`, `case`, `class`, `const`, `debugger`, `export`, `import` 等。
*   **自动分号插入 (ASI)**: 规范定义了何时自动补全分号的规则（虽方便但建议显式使用分号以避免歧义）。

### 2.2 数据类型 (Types)
ES 标准定义了 8 种数据类型：
1.  **Undefined**: 只有一个值 `undefined`。
2.  **Null**: 只有一个值 `null`。
3.  **Boolean**: `true` 或 `false`。
4.  **String**: UTF-16 编码的字符序列。
5.  **Symbol** (ES2015): 唯一且不可变的主键。
6.  **Number**: IEEE 754 双精度浮点数 (包含 `NaN`, `Infinity`)。
7.  **BigInt** (ES2020): 任意精度的整数，以 `n` 结尾（如 `10n`）。
8.  **Object**: 属性的集合。包括普通对象、数组、函数、日期等。

### 2.3 变量声明与作用域 (Declarations & Scope)
*   **`var`**: 函数作用域，存在变量提升 (Hoisting)。
*   **`let` / `const`**: 块级作用域 (Block Scope)，存在暂时性死区 (TDZ)。
*   **词法环境 (Lexical Environment)**: 规范内部用于解析标识符引用的机制，由环境记录 (Environment Record) 和外部词法环境引用组成。
---

## 第三章 核心语言结构

### 3.1 表达式(Expressions)
- 标识符与主表达式
- 左值与更新表达式
- 算术与位运算符
- 关系与相等运算符
- 赋值与逗号运算符
### 3.2 语句与声明 (Statements & Declarations)
- 块与变量声明
- 条件语句（if, switch）
- 迭代语句 （for, while, do-while）
- 控制流 （break, continue, return）
- 错误处理（throw, try-catch）
### 3.3 函数与类(Functions & Classes)
- 函数定义与参数列表
- 箭头函数
- 生成器与异步函数
- 类声明与静态块

## 第四章：标准库与内置对象 (Standard Library)

### 4.1 全局对象 (The Global Object)
*   `globalThis` (ES2020): 统一的全局对象访问方式。
### 4.2 基础对象
- **Object**
- **Function**
- **Boolean**
- **Symbol**
- **Error**
### 4.3 数字日期对象
- Number (& Float16Array)
- BigInt
- Math
- Date
### 4.4 文本对象
- String
- RegExp（含 escape 万法）
### 4.5 集合对象
*  **Array**: `map`, `filter`, `reduce`, `flatMap` (ES2019), `at` (ES2022), `toSorted/toSpliced` (ES2023)。
*  **TypedArray**。
*  **Map / Set**: 键值对集合。
*  **WeakMap / WeakSe**t: 弱引用集合。
### 4.6 结构化数据
*  **JSON**: `parse`, `stringify`。
*  **ArrayBuffer / SharedArrayBuffer**。
*  **DataView**
*  **Atomics**
### 4.7 控制抽象
*   **Promise**: `all`, `race`, `allSettled` (ES2020), `any` (ES2021), `withResolvers` (ES2024)。
*   **Iterator & Iterable**: `Symbol.iterator` 协议，`for...of` 循环。
### 4.8 Reflection
- **Reflect Object**
- **Proxy Object**
- **Module namespace Object**

## 第五章：执行机制 (Execution Mechanics)

### 5.1 内存模型(Memory Model)
- 
### 5.2 执行上下文 (Execution Contexts)
* **领域(Realms)**
* **环境记录 (Environment Records)**
* **作业 (Jobs)与回调**。
### 5.3 模块系统 (Modules)
* **模块记录与加载**
* **导入属性 (Import Attributes)**
* **JSON模块支持**

---

## 第六章：年度关键特性演进 (Evolution by Year)

### ES2015 (ES6) - 里程碑
*   Let/Const, Arrow Functions, Classes, Modules, Promises, Map/Set, Destructuring, Template Literals.

### ES2016 - ES2019
*   **ES2016**: `Array.prototype.includes`, Exponentiation operator (`**`).
*   **ES2017**: Async/Await, `Object.values/entries`.
*   **ES2018**: Object Spread/Rest (`...`), Async Iteration (`for await...of`).
*   **ES2019**: `Array.flat`, `Object.fromEntries`, Optional catch binding.

### ES2020 - ES2022
*   **ES2020**: BigInt, Dynamic Import, Nullish Coalescing (`??`), Optional Chaining (`?.`), `Promise.allSettled`.
*   **ES2021**: String `replaceAll`, Logical Assignment (`??=`, `&&=`, `||=`), `Promise.any`, `WeakRef`.
*   **ES2022**: Top-level await, Class Fields (Public/Private), `Array.at`.

### ES2023
*   **Array by Copy**: `toReversed`, `toSorted`, `toSpliced`, `with`. (不改变原数组的操作)
*   **Hashbang Grammar**: `#!/usr/bin/env node`。

### ES2024 
*   **Object.groupBy / Map.groupBy**: 原生数据分组能力。
*   **Promise.withResolvers**: 简化 Promise 创建 (`const { promise, resolve, reject } = Promise.withResolvers();`)。
*   **RegExp v flag**: 增强的 Unicode 集合支持。
*   **Atomics.waitAsync**: 异步等待共享内存。
*   **ArrayBuffer.prototype.resize / transfer**: 可变大小的 ArrayBuffer。
### ES2025
- **Iterator 全局对象及其方法**
- **`Set.prototype`** 新集合操作方法
- **JSON 模块导入语法**
- **`RegExp.escape`** 与内联修饰符
- **`Promise.try** `方法
- **Float16Array 与相关 Math/DataView 支持**

---

## 第七章：如何阅读规范原文
1.  **理解符号**:
    *   `?` / `!` 后缀: 简写的 ReturnIfAbrupt 操作（处理异常）。
    *   `[[InternalSlot]]`: 内部槽位，JS 代码无法直接访问，定义对象状态。
2.  **常用抽象操作 (Abstract Operations)**:
    *   `ToPrimitive`: 转换为原始值。
    *   `ToString`, `ToNumber`: 类型转换规则。
    *   `Get`, `Set`: 属性访问的底层逻辑。
3.  **阅读建议**: 不要从头读到尾。当对某个具体行为（如 `[1] + {}`）有疑问时，去查阅对应的 Runtime Semantics 章节。

---
> **注**: ECMAScript 标准是“活”的文档，每年 6 月正式发布新版本。开发者应关注 TC39 的 GitHub 仓库以获取最新的提案动态。
