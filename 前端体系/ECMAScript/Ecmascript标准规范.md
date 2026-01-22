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

## 第三章：执行机制 (Execution Mechanics)

### 3.1 执行上下文 (Execution Contexts)
每当代码运行时，都会创建执行上下文。
*   **组成**:
    1.  **Code Evaluation State**: 代码执行位置。
    2.  **Function**: 当前执行的函数对象（如果是函数上下文）。
    3.  **Realm**: 关联的全局环境（包含内置对象）。
    4.  **ScriptOrModule**: 关联的脚本或模块。
*   **执行栈 (Execution Context Stack)**: 也就是调用栈，管理上下文的推入和弹出。

### 3.2 任务与微任务 (Jobs & Microtasks)
*   **Script/Module 执行**: 宏任务。
*   **PromiseJobs**: Promise 回调 (`.then`, `.catch`) 属于微任务，优先级高于新的宏任务。
*   **Event Loop**: 规范定义了 Agent 循环执行任务的机制。

### 3.3 原型链与继承 (Prototype Chain)
*   **`[[Prototype]]`**: 每个对象都有一个内部属性指向其原型。
*   **查找机制**: 访问属性时，若自身不存在，则沿着 `[[Prototype]]` 链向上查找，直到 `null`。
*   **类 (Class)**: ES2015 引入的基于原型的语法糖。涵盖 `constructor`, `super`, `static` 方法, 私有字段 (`#field`)。

---

## 第四章：函数与对象 (Functions & Objects)

### 4.1 函数详解
*   **函数声明 vs 表达式**: 提升行为不同。
*   **箭头函数 (Arrow Functions)**: 词法 `this` 绑定，无 `arguments` 对象，不可作为构造函数。
*   **生成器 (Generators)**: `function*`，可暂停执行 (`yield`)，返回迭代器。
*   **异步函数 (Async/Await)**: 基于 Promise 和 Generator 的异步编程语法糖。

### 4.2 对象模型
*   **属性描述符 (Property Descriptors)**:
    *   **Data Descriptor**: `value`, `writable`
    *   **Accessor Descriptor**: `get`, `set`
    *   **Shared**: `enumerable`, `configurable`
*   **对象操作**: `Object.defineProperty`, `Object.keys`, `Object.assign`, `Object.freeze` 等。

---

## 第五章：标准库与内置对象 (Standard Library)

### 5.1 全局对象 (The Global Object)
*   `globalThis` (ES2020): 统一的全局对象访问方式。

### 5.2 基础对象
*   **Array**: `map`, `filter`, `reduce`, `flatMap` (ES2019), `at` (ES2022), `toSorted/toSpliced` (ES2023)。
*   **String**: `includes`, `startsWith`, `padEnd`, `matchAll` (ES2020), `replaceAll` (ES2021)。
*   **Map / Set / WeakMap / WeakSet**: 键值对集合与弱引用集合。

### 5.3 结构化数据
*   **JSON**: `parse`, `stringify`。
*   **ArrayBuffer / TypedArrays**: 处理二进制数据 (Int8Array, Float32Array 等)。

### 5.4 控制抽象
*   **Promise**: `all`, `race`, `allSettled` (ES2020), `any` (ES2021), `withResolvers` (ES2024)。
*   **Iterator & Iterable**: `Symbol.iterator` 协议，`for...of` 循环。

---

## 第六章：模块系统 (Modules)

### 6.1 ESM (ECMAScript Modules)
*   **语法**: `import ... from ...`, `export ...`。
*   **特性**:
    *   **静态解析**: 编译时确定依赖关系。
    *   **自动严格模式**: 默认启用 `'use strict'`。
    *   **单例执行**: 模块只执行一次。
*   **动态导入**: `import()` 返回 Promise，支持运行时按需加载。
*   **Import Attributes** (ES2025?): `import json from "./data.json" with { type: "json" }`。

---

## 第七章：年度关键特性演进 (Evolution by Year)

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

### ES2024 (Latest Features)
*   **Object.groupBy / Map.groupBy**: 原生数据分组能力。
*   **Promise.withResolvers**: 简化 Promise 创建 (`const { promise, resolve, reject } = Promise.withResolvers();`)。
*   **RegExp v flag**: 增强的 Unicode 集合支持。
*   **Atomics.waitAsync**: 异步等待共享内存。
*   **ArrayBuffer.prototype.resize / transfer**: 可变大小的 ArrayBuffer。

---

## 第八章：如何阅读规范原文
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
