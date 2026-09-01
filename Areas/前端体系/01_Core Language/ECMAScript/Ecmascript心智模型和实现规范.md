# ECMAScript 双维知识架构：心智模型与引擎实现规范

> 本文基于 **ECMA-262 最新标准规范**，从 **「认知/理解层面（开发者心智模型与语言设计全景）」** 与 **「底层/实现层面（规范算法与引擎运行时架构）」** 两个维度，深度解构 JavaScript/ECMAScript 的完整知识体系与执行机制。

---

## 目录

- [一、 维度一：认知/理解层面（开发者心智模型）](#一-维度一认知理解层面开发者心智模型)
  - [1. 认知维度知识全景脑图](#1-认知维度知识全景脑图)
  - [2. 模块一：类型与值语义系统](#2-模块一类型与值语义系统)
  - [3. 模块二：作用域、生命周期与模块化](#3-模块二作用域生命周期与模块化)
  - [4. 模块三：原型哲学与现代面向对象（OOP）](#4-模块三原型哲学与现代面向对象oop)
  - [5. 模块四：异步编程与控制抽象](#5-模块四异步编程与控制抽象)
  - [6. 模块五：标准内置库与元编程](#6-模块五标准内置库与元编程)
- [二、 维度二：底层/实现层面（规范算法与运行时架构）](#二-维度二底层实现层面规范算法与运行时架构)
  - [1. 实现维度架构全景脑图](#1-实现维度架构全景脑图)
  - [2. 模块一：形式文法与编译前端解析流水线](#2-模块一形式文法与编译前端解析流水线)
  - [3. 模块二：规范专用类型与抽象操作（AO）](#3-模块二规范专用类型与抽象操作ao)
  - [4. 模块三：执行上下文、环境记录与 Realm 模型](#4-模块三执行上下文环境记录与-realm-模型)
  - [5. 模块四：对象底层模型、基本内部方法与异质对象](#5-模块四对象底层模型基本内部方法与异质对象)
  - [6. 模块五：并发模型、共享内存与内存一致性](#6-模块五并发模型共享内存与内存一致性)
  - [7. 模块六：宿主分层机制与 Web 兼容扩展](#7-模块六宿主分层机制与-web-兼容扩展)
- [三、 双维联动：从代码编写到引擎执行的全生命周期映射](#三-双维联动从代码编写到引擎执行的全生命周期映射)

---

## 一、 维度一：认知/理解层面（开发者心智模型）

### 1. 认知维度知识全景脑图

```mermaid
mindmap
  root((ECMAScript 认知架构))
    1. 类型与值语义系统
      原始类型 Primitive
        栈/值语义不可变: Undefined / Null / Boolean / Number / BigInt / String / Symbol
        自动装箱机制: Object(1) 与包装类型原型扩展
      复合类型 Object
        堆/引用可变语义
        Callable 对象: Function 一等公民
      隐式类型转换拓扑
        ToPrimitive 协议: Symbol.toPrimitive > valueOf > toString
        ToBoolean 假值集合: 0 / -0 / 0n / "" / null / undefined / NaN / false / document.all
        ToNumber / ToString 强制转换与运算符重载
      判等机制矩阵
        宽松相等 ==: 隐式转换链
        严格相等 ===: 无转换, 但 NaN!==NaN, +0===-0
        Object.is / SameValue: 精确区分 +0/-0, NaN等于NaN
        SameValueZero: Set/Map 判重, +0与-0视作相等
    2. 作用域、生命周期与模块
      变量声明演进
        var: 函数作用域 / 变量提升 Hoisting / 全局污染
        let / const: 块级作用域 / 暂时性死区 TDZ / 不可重复声明
      闭包物理模型
        跨栈帧生命周期保持
        词法作用域快照与内存常驻
      控制流与错误链
        for-in (遍历属性键) vs for-of (迭代值) vs for-await-of (异步流)
        异常捕获: try-catch-finally 覆盖机制与 Error.cause 溯源链
      ES Modules 体系
        静态依赖图分析 / 编译期符号活绑定 Live Binding
        动态 import() 与 Top-level await
    3. 原型哲学与现代 OOP
      基于原型的继承
        显式 prototype 属性 vs 隐式 [[Prototype]] / __proto__
        原型链属性查找、属性屏蔽 Shadowing 与继承共享
        Object.create / Object.setPrototypeOf
      现代 Class 语法糖
        私有字段/方法: #privateField 硬隔离机制
        私有检查: #x in obj 语法
        静态块: static { ... } 单次求值初始化
        继承链双向绑定: 子类构造函数原型链 + 子类实例原型链
    4. 异步编程与控制抽象
      事件循环与单线程心智
        调用栈 (Call Stack) + 宏任务 (Macrotask) + 微任务 (Microtask)
      Promise 状态机
        Pending -> Fulfilled / Rejected (不可逆)
        组合算子: all / race / allSettled / any / withResolvers / Promise.try
      生成器与迭代器
        Generator: yield 协程双向通信与状态暂停/恢复
        同步迭代协议: [Symbol.iterator] 与 Iterator 辅助方法
        异步迭代协议: [Symbol.asyncIterator]
      async / await
        Generator + Promise 自动执行器的语法糖
    5. 标准内置对象库
      数据集合
        Indexed: Array (非破坏性方法 toSorted/toReversed/with) / TypedArray / Float16Array
        Keyed: Map / Set vs WeakMap / WeakSet (GC 弱引用与 Symbol 键)
      数据与文本
        JSON (parse / stringify / rawJSON) / RegExp (v标志集合操作 / d标志索引)
      元编程与反射
        Proxy (13种拦截器 Trap)
        Reflect (与底层操作 1:1 对齐的标准 API)
```

---

### 2. 模块一：类型与值语义系统
- **原始类型（Primitive）vs 引用类型（Object）**：
  - 原始值（`Undefined`, `Null`, `Boolean`, `Number`, `BigInt`, `String`, `Symbol`）在逻辑上不可变（Immutable），按值传递；
  - 对象类型（`Object` 及子类型）按引用传递，拥有动态属性集合。
- **自动装箱（Auto-boxing）**：
  - 当在原始值上调用方法时（如 `'hello'.slice(1)`），引擎隐式将其封装为临时包装对象并在调用结束后丢弃。
- **隐式转换（Coercion）拓扑与协议**：
  - `ToPrimitive(input [, hint])`：优先调用 `[Symbol.toPrimitive](hint)`；若不存在，在 hint 为 `string` 时依次尝试 `toString()` $\rightarrow$ `valueOf()`；hint 为 `number`/`default` 时依次尝试 `valueOf()` $\rightarrow$ `toString()`。
- **四大判等模型对比**：
  | 判等模型 | 规范操作名 | `NaN === NaN` | `+0 === -0` | 典型应用场景 |
  | :--- | :--- | :--- | :--- | :--- |
  | **`==`** | `IsLooselyEqual` | `false` | `true` | 宽松类型转换判等 |
  | **`===`** | `IsStrictlyEqual` | `false` | `true` | 常规业务严格判等 |
  | **`Object.is`** | `SameValue` | `true` | `false` | 精确区分正负零与 NaN |
  | **`SameValueZero`** | `SameValueZero` | `true` | `true` | `Map`/`Set` 键去重、`Array.includes` |

---

### 3. 模块二：作用域、生命周期与模块化
- **作用域进化与 TDZ**：
  - `var`：函数级作用域，声明前置提升（Hoisting）并初始化为 `undefined`，挂载至全局对象；
  - `let` / `const`：词法块级作用域（Block Scope），从块开始到声明语句执行前的区域为**暂时性死区（TDZ）**，提前访问触发 `ReferenceError`。
- **闭包（Closure）的心智模型**：
  - 函数在定义时捕获其外层词法作用域引用。即使外部函数调用栈已弹出，只要内部函数存在引用，外部环境记录（Environment Record）便在堆内存中长久存活。
- **ES 模块（ESM）的静态解析机制**：
  - **编译期静态图构建**：在代码执行前建立模块拓扑与导入/导出关系；
  - **符号活绑定（Live Binding）**：`import` 引入的是导出模块内部变量的实时动态引用，而非快照浅拷贝；
  - **现代增强**：支持动态 `import()` 条件加载与顶层 `await`（Top-level await）异步依赖扁平化。

---

### 4. 模块三：原型哲学与现代面向对象（OOP）
- **原型继承本质**：
  - JavaScript 中没有传统基于类（Class-based）的类型拷贝，而是通过对象间的隐式原型引用（`[[Prototype]]` / `__proto__`）构成的**委托原型链（Prototype Delegation Chain）**。
  - **属性屏蔽（Shadowing）**：向对象赋值属性时，若自身没有该属性且原型链上存在同名非只读属性，则在自身创建自有属性（Own Property），从而遮蔽原型链属性。
- **现代 Class 体系演进**：
  - **硬私有化（Private Members）**：`#field` 与 `#method` 基于引擎内部的 Private Names 机制，彻底阻断了 `Object.keys`、`getOwnPropertyNames` 或 `Proxy` 的外部反射；
  - **私有检查**：通过 `#x in obj` 语法安全判断对象是否持有特定私有字段；
  - **静态初始化块**：`static { ... }` 在类定义时评估执行一次，适合执行复杂的静态配置和私有权限共享；
  - **双向继承链**：`class Sub extends Super` 同时建立了子类构造函数原型链（`Sub.__proto__ === Super`）与实例原型链（`Sub.prototype.__proto__ === Super.prototype`）。

---

### 5. 模块四：异步编程与控制抽象
- **并发与事件循环心智模型**：
  - 主线程单线程执行，通过调用栈（Call Stack）、宏任务队列（Macrotask Queue）与微任务队列（Microtask Queue）协同驱动。
- **Promise 反应式状态机**：
  - 核心状态：`Pending` $\rightarrow$ `Fulfilled` / `Rejected`（单向且不可逆）；
  - **现代组合子矩阵**：
    - `Promise.all`：全部成功才成功，首个失败立即短路失败；
    - `Promise.allSettled`：等待全部兑现/拒绝，收集完整状态数组；
    - `Promise.race`：首个决议（无论成功失败）即完成；
    - `Promise.any`：首个成功即成功，全部失败返回 `AggregateError`；
    - `Promise.withResolvers`：直接解构获取 `{ promise, resolve, reject }`；
    - `Promise.try`：将同步/异步函数调用统一定制包装为 Promise 流程。
- **生成器与异步迭代流**：
  - `Generator`：通过 `yield` 实现协程级上下文挂起与双向数据交换；
  - `Async Generator` + `for-await-of`：实现背压可控的异步流式数据拉取。

---

### 6. 模块五：标准内置库与元编程
- **数组非破坏性更新（Immutable by Default）**：
  - `toSorted()`、`toReversed()`、`toSpliced()`、`with()` 均返回全新副本，不改变原数组。
- **弱引用集合与内存管理**：
  - `WeakMap` / `WeakSet`：键为弱引用（支持 Object 与非注册 Symbol），不阻碍垃圾回收；
  - `WeakRef` 与 `FinalizationRegistry`：支持观察对象 GC 行为并执行清理回调。
- **元编程与反射**：
  - `Proxy`：提供 13 种对象基本操作的底层陷阱（Trap）拦截；
  - `Reflect`：提供与 Proxy 陷阱一一对应的标准函数式反射接口。

---

## 二、 维度二：底层/实现层面（规范算法与运行时架构）

### 1. 实现维度架构全景脑图

```mermaid
mindmap
  root((ECMAScript 引擎实现架构))
    1. 前端解析与文法流水线
      形式文法约定 Clause 5
        CFG 上下文无关文法 / 链式产生式 Chain Production / 目标符号
      词法分析器 Scanner (Clause 11)
        状态驱动目标符号: InputElementDiv vs InputElementRegExp
        受限产生式: [no LineTerminator here]
        自动分号插入 (ASI) 算法
      语法分析与 AST 构建 (Clause 12~15)
        静态语义 (Static Semantics): Early Errors 检查
        符号收集: BoundNames / VarDeclaredNames / LexicallyDeclaredNames
    2. 规范专用类型与抽象操作
      规范类型 (Clause 6.2)
        Completion Record: [[Type]] (normal/break/continue/return/throw) + [[Value]]
        Reference Record: Base / ReferencedName / Strict 标识
        Property Descriptor: Data / Accessor / Generic 状态机
        Data Block: 原生内存字节缓冲区
      核心抽象操作 AO (Clause 7)
        类型转换: ToPrimitive / ToNumeric / ToNumber / ToString / ToObject
        判等操作: SameValue / SameValueZero / IsStrictlyEqual / IsLooselyEqual
        对象底层: Get / Set / Call / Construct / CreateDataProperty / DefinePropertyOrThrow
        迭代底层: GetIterator / IteratorNext / IteratorStep / IteratorClose
    3. 执行环境与上下文体系 (Clause 8)
      执行上下文栈 Execution Context Stack
        code evaluation state: 协程挂起与恢复断点
        LexicalEnvironment: 处理 let / const / class
        VariableEnvironment: 处理 var / function 声明
        PrivateEnvironment: 处理 #field 私有名称查找链
      环境记录 Environment Record 继承体系
        Declarative Environment Record: Function / Module
        Object Environment Record: with 作用域 / 全局变量映射
        Global Environment Record: 复合结构 (Object + Declarative)
      隔离与调度模型
        Realm: Intrinsics 内建对象池 + Global Object + Global Env
        Agent & Agent Cluster: 线程隔离与 Forward Progress 保证
        任务调度: HostEnqueuePromiseJob 微任务队列
    4. 对象内部模型与异质对象 (Clause 9)
      基本内部方法 Essential Internal Methods (11+2个)
        [[GetPrototypeOf]] / [[SetPrototypeOf]] / [[IsExtensible]] / [[PreventExtensions]]
        [[GetOwnProperty]] / [[DefineOwnProperty]] / [[HasProperty]] / [[Get]] / [[Set]] / [[Delete]] / [[OwnPropertyKeys]]
        函数专用: [[Call]] / [[Construct]]
      不变性规则 Invariants
        不可配置属性防篡改约束 / 不可扩展对象原型固定约束
      普通对象 vs 异质对象 Exotic Objects
        Ordinary Object: 默认内部方法实现
        Array Exotic Object: 拦截 [[DefineOwnProperty]] 动态伸缩 length
        String Exotic Object: 虚拟字符索引映射
        Integer-Indexed Exotic Object: TypedArray 直通 Data Block
        Proxy Exotic Object: 覆盖13个内部方法并执行 Invariants 校验
    5. 内存模型与宿主分层
      内存一致性模型 (Clause 29)
        SharedArrayBuffer 共享 Data Block
        Atomics 原子操作: load / store / wait / notify / compareExchange
        内存顺序: Happens-Before 关系与 DRF-SC (数据竞争无冲突顺序一致性)
      宿主分层与 Web 兼容 (Annex B & D)
        Host Hooks: 宿主注入钩子 (如 HostImportModuleDynamically)
        Annex B: Web 浏览器兼容性扩展 (__proto__ / HTML 注释 / 废弃正则属性)
```

---

### 2. 模块一：形式文法与编译前端解析流水线
- **上下文无关文法（CFG）与多重目标符号**：
  - 词法解析并非单一状态机。解析器根据当前语法上下文动态切换目标符号：
    - `InputElementDiv`：当前期待操作符时使用（将 `/` 解析为除法）；
    - `InputElementRegExp`：当前期待操作数时使用（将 `/` 解析为正则开头）；
    - `InputElementTemplateTail`：解析模板字符串后续片段；
    - `InputElementHashbangOrRegExp`：解析文件头 `#!` 注释。
- **自动分号插入（ASI）确定性规则**：
  - **规则 1**：从左至右扫描，遇到不符合产生式语法的离格 Token 时，若其前存在换行符或为 `}`，则在当前位置虚拟插入分号；
  - **规则 2（受限产生式）**：语法中标记为 `[no LineTerminator here]` 的节点（如 `return`、`throw`、`break`、`continue`、`yield`、`arrowFunction =>`），若后紧跟换行符，必须立即插入分号。
- **静态语义分析（Static Semantics）与早期错误**：
  - 在代码真正运行前执行检查（Early Errors），如重复参数名、在非循环体中写 `break`、非法标签等；
  - 收集各类绑定名称表：`BoundNames`、`VarDeclaredNames`、`LexicallyDeclaredNames`。

---

### 3. 模块二：规范专用类型与抽象操作（AO）
- **规范类型（Specification Types）——仅存在于引擎概念中**：
  1. **Completion Record（完成记录）**：
     - 结构：`Completion { [[Type]], [[Value]], [[Target]] }`；
     - `[[Type]]` 为 `normal` 时代表顺序执行；为 `return`, `throw`, `break`, `continue` 时代表突变执行（Abrupt Completion），驱动控制流短路跳转。
  2. **Reference Record（引用记录）**：
     - 结构：`{ [[Base]], [[ReferencedName]], [[Strict]], [[ThisValue]] }`；
     - 延迟取值结构（区分左值 L-Value 与右值 R-Value）。在 `obj.fn()` 中，保留 `Base: obj`，供后续调用时将 `obj` 绑定为 `this`。
  3. **Property Descriptor（属性描述符）**：
     - 数据描述符（`[[Value]]`, `[[Writable]]`）与访问器描述符（`[[Get]]`, `[[Set]]`），附加元属性 `[[Enumerable]]`, `[[Configurable]]`。
  4. **Data Block**：
     - 连续的底层字节内存块，为 `ArrayBuffer` 和 `SharedArrayBuffer` 提供物理承载。
- **核心抽象操作（Abstract Operations）算法化**：
  - `Get(O, P)`：先查找自身再递归原型链，最终调用属性内部 getter 或返回值；
  - `Set(O, P, V, Throw)`：依据原型链可写性及 setter 分支决定是创建自有属性还是报错；
  - `Call(F, V, [args])` / `Construct(F, [args], newTarget)`：函数底层调用与实例化分流。

---

### 4. 模块三：执行上下文、环境记录与 Realm 模型
- **执行上下文（Execution Context）核心状态栈**：
  ```
  ┌──────────────────────────────────────────────────────────┐
  │                 Execution Context 结构                    │
  ├──────────────────────────────────────────────────────────┤
  │ • code evaluation state : 协程/生成器挂起与恢复的程序计数器  │
  │ • Function              : 当前执行的函数对象 (若有)       │
  │ • Realm                 : 当前执行所属的 Realm 实例        │
  │ • ScriptOrModule        : 当前执行所属的代码模块或脚本      │
  │ • LexicalEnvironment    : 词法环境 (查找 let / const / class) │
  │ • VariableEnvironment   : 变量环境 (查找 var / function)  │
  │ • PrivateEnvironment    : 私有名称环境 (查找 #privateField) │
  └──────────────────────────────────────────────────────────┘
  ```
- **环境记录（Environment Record）继承模型**：
  - `Declarative Environment Record`：纯内存符号表映射（性能极高）；
    - $\rightarrow$ `Function Environment Record`：维护 `[[ThisValue]]` 与 `[[ThisBindingStatus]]`（`"lexical"` 对应箭头函数，`"uninitialized"` 对应派生类构造函数）；
    - $\rightarrow$ `Module Environment Record`：维护外部导出的不可变间接活绑定。
  - `Object Environment Record`：将属性读写委托给物理对象（用于 `with` 语句）；
  - `Global Environment Record`：**双核复合环境**，内含一个 `[[ObjectRecord]]`（映射全局 `globalThis` 对象）和一个 `[[DeclarativeRecord]]`（存放全局 `let`/`const`），实现全局顶级声明与全局对象属性的精准解耦。
- **Realm 与 Agent 模型**：
  - **Realm**：一个独立的执行沙箱，拥有独立的一整套固有对象池（Intrinsics，如独立的 `%Array.prototype%`）、全局对象与全局作用域；
  - **Agent**：一个执行线程单元，拥有独立的调用栈和微任务队列（`HostEnqueuePromiseJob`）。

---

### 5. 模块四：对象底层模型、基本内部方法与异质对象
- **11 个基本内部方法（Essential Internal Methods）**：
  - `[[GetPrototypeOf]]`, `[[SetPrototypeOf]]`, `[[IsExtensible]]`, `[[PreventExtensions]]`, `[[GetOwnProperty]]`, `[[DefineOwnProperty]]`, `[[HasProperty]]`, `[[Get]]`, `[[Set]]`, `[[Delete]]`, `[[OwnPropertyKeys]]`。
  - 函数对象额外拥有：`[[Call]]`（普通调用）、`[[Construct]]`（new 实例化）。
- **对象不变性约束（Invariants of Essential Internal Methods）**：
  - 规范严格规定：任何扩展或代理逻辑，**绝不能破坏基本内部方法的不变性**。
  - 例如：如果 `[[GetOwnProperty]]` 报告某属性为不可配置且不可写，则后续所有 `[[GetOwnProperty]]` 必须始终报告该属性存在且拥有相同的值；否则引擎强制抛出 `TypeError`。
- **普通对象（Ordinary Object）vs 异质对象（Exotic Object）**：
  | 异质对象类型 | 拦截覆盖的基本内部方法 | 核心定制底层机制 |
  | :--- | :--- | :--- |
  | **Array Exotic** | `[[DefineOwnProperty]]` | 写入索引属性时动态同步调整 `length`；减少 `length` 时自动级联调用 `[[Delete]]` 销毁超出元素 |
  | **String Exotic** | `[[GetOwnProperty]]` | 虚拟化字符数字索引，按需生成只读不可配置的字符数据描述符 |
  | **Arguments Exotic** | `[[GetOwnProperty]]`, `[[DefineOwnProperty]]`, `[[Get]]`, `[[Set]]`, `[[Delete]]` | 非严格模式下通过参数映射对象（Parameter Map）保持形参与 `arguments` 双向绑定 |
  | **Integer-Indexed (TypedArray)** | 全部 11 个内部方法 | 绕过哈希属性表，直接通过字节偏移量对底层的 `Data Block` 原生内存进行读写 |
  | **Proxy Exotic** | 全部 11+2 个内部方法 | 将操作转发至用户定义的 Handler 陷阱函数，并在返回后强制执行规范不变性安全检查 |

---

### 6. 模块五：并发模型、共享内存与内存一致性
- **SharedArrayBuffer 与共享 Data Block**：
  - 允许多个 Agent（如主线程与 Worker 线程）同时映射并访问同一块底层物理内存。
- **Atomics 与内存顺序（Clause 29 Memory Consistency Model）**：
  - **Happens-Before 与 Synchronizes-With**：规范定义了形式化的读写事件偏序关系；
  - **防止乱序**：通过原子读（`Atomics.load`）、原子写（`Atomics.store`）和 CAS（`Atomics.compareExchange`），阻止多核 CPU 的乱序执行与流水线重排；
  - **线程同步**：`Atomics.wait` / `Atomics.notify` 提供底层 Futex 式的线程挂起与唤醒机制。

---

### 7. 模块六：宿主分层机制与 Web 兼容扩展
- **Annex D 宿主分层接入点（Host Layering Points）**：
  - 规范将特定环境相关操作抽象为 **Host Hooks**，由外部规范（如 WHATWG HTML 规范）填充具体实现：
    - `HostEnqueuePromiseJob`：微任务入队挂载；
    - `HostImportModuleDynamically`：动态 import 模块获取与编译接入；
    - `HostEnsureCanCompileStrings`：CSP 安全策略对 `eval` 和 `new Function` 的拦截检查。
- **Annex B 面向 Web 浏览器的附加规范（Legacy & Normative Optional）**：
  - 规范化历史存量网页所依赖的非标准特性（如 `Object.prototype.__proto__`、HTML 风格注释 `<!-- -->`、`RegExp.$1` 静态属性等），确保跨浏览器行为一致且不污染核心语言标准。

---

## 三、 双维联动：从代码编写到引擎执行的全生命周期映射

当我们在编辑器中写下一行简单的 JavaScript 代码时，两个维度在引擎内部的协同全流程如下：

```
【维度一：认知代码】
    const user = { name: "Nate" };
    user.name;
       │
       ▼ (1. 词法与语法分析: Clause 11 ~ 12)
【维度二：实现流水线】
    Scanner: InputElementDiv 扫描 Token -> Parser 校验 Static Semantics
       │
       ▼ (2. 编译为 AST 与字节码: Clause 13)
    生成标识符绑定表 (LexicallyDeclaredNames: "user")
       │
       ▼ (3. 运行时上下文建立: Clause 8)
    Push ExecutionContext -> 创建 Declarative Environment Record 存储 user 引用
       │
       ▼ (4. 表达式评估: Clause 12.3)
    评估 user.name -> 返回 Reference Record { Base: user, ReferencedName: "name" }
       │
       ▼ (5. 抽象操作执行: Clause 7.3)
    调用 GetValue(ref) -> 触发抽象操作 Get(user, "name")
       │
       ▼ (6. 对象内部方法调用: Clause 9.1)
    调用 user.[[Get]]("name", user)
       │ -> 检索自身属性描述符 PropertyDescriptor { [[Value]]: "Nate", [[Writable]]: true }
       │
       ▼ (7. 返回结果: Clause 6.2)
    构造 Completion Record { [[Type]]: normal, [[Value]]: "Nate", [[Target]]: empty }
       │
       ▼
【维度一：获得确定性的运行时值】 "Nate"
```
