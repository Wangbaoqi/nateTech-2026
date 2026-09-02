---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==

# Excalidraw Data

## Text Elements
ECMAScript 引擎实现架构
(Engine & Spec) ^4jz2xhj6

文法体系与记号约定 (Clause 5) • 上下文无关文法 CFG、链式产生式与目标符号推导 ^1qhg4ren

句法导向操作与静态语义 (Clause 8) • Early Errors 早期错误检查 • 名称绑定收集：BoundNames、LexicallyDeclaredNames ^440rccig

源码输入与词法分析 (Clause 11~12) • Clause 11 Source Text (Unicode 输入) • Clause 12 Lexical Grammar (InputElementDiv vs InputElementRegExp) • 受限产生式 [no LineTerminator here] 与 ASI 自动分号插入算法 ^hd4liu5p

句法文法解析 (Clause 13~16) • Clause 13 Expressions (表达式) • Clause 14 Statements & Declarations (语句与声明) • Clause 15 Functions & Classes, Clause 16 Scripts & Modules ^2ip5mh7h

1. 形式文法与编译前端流水线 ^7cuilynd

规范内部类型 (Clause 6.2) • Completion Record: [[Type]] (normal/return/throw/break/continue) • Reference Record: Base / ReferencedName / Strict 标识 (驱动 this 绑定) • Property Descriptor: 数据描述符 / 访问器描述符 / 通用描述符 • Data Block: 操作系统原生连续内存字节缓冲区 ^my96ugnz

核心抽象操作 AO (Clause 7) • 类型转换 AO (Clause 7.1): ToPrimitive, ToNumeric, ToNumber, ToString • 比较操作 AO (Clause 7.2): SameValue, SameValueZero, IsStrictlyEqual • 对象操作 AO (Clause 7.3): Get, Set, Call, Construct, DefinePropertyOrThrow • 迭代操作 AO (Clause 7.4): GetIterator, IteratorNext, IteratorClose ^p5t0lj92

2. 规范专用类型与抽象操作 ^h8hrkf6v

执行上下文栈 (Clause 9.3) • code evaluation state: 协程与生成器执行断点恢复 • LexicalEnvironment (词法环境) 管理 let/const/class • VariableEnvironment (变量环境) 管理 var 与函数声明 • PrivateEnvironment (私有环境) 管理 #field 私有名称 ^m1zspqim

环境记录体系 (Clause 9.1) • Declarative Environment: Function 与 Module 记录 (Clause 16 活绑定) • Object Environment: with 语句与全局对象映射 • Global Environment: ObjectRecord + DeclarativeRecord 双核复合结构 ^mz2gy9u2

Realm 与并发调度 (Clause 9.2, 9.4~9.5) • Realm (Clause 9.2): Intrinsics 内建对象池与独立全局沙箱 • Agent & Agent Cluster (Clause 9.4): 线程隔离与微任务调度 • HostEnqueuePromiseJob (Clause 9.5): 宿主微任务队列注入 ^c461ilhh

3. 执行环境与上下文体系 ^xn0ax1v0

基本内部方法 (Clause 10.1) • 11 个核心对象方法: [[Get]], [[Set]], [[GetPrototypeOf]], [[OwnPropertyKeys]] • 2 个函数专用方法: [[Call]] 与 [[Construct]] (Clause 10.2) ^3mvim19k

内部方法不变性 (Clause 10.1 Invariants) • 不可配置属性防篡改、不可扩展对象原型不可变等核心安全约束 ^hn8xoiqk

异质对象定制 (Clause 10.4, 10.5) • Array Exotic: 拦截 [[DefineOwnProperty]] 动态伸缩 length • String Exotic: 虚拟化字符索引只读属性映射 • Arguments Exotic: 非严格模式参数映射 (Parameter Map) 双向绑定 • Integer-Indexed: TypedArray 直通 Data Block 底层内存 • Proxy Exotic (Clause 10.5): 拦截全部 13 个内部方法并强制不变性校验 ^miijq4ex

标准对象体系 (Clause 20, 23, 24) • Clause 20 Fundamental Objects (Object, Function, Symbol, Error) • Clause 23 Indexed Collections (Array, TypedArray) • Clause 24 Keyed Collections (Map, Set, WeakMap, WeakSet) ^81ugk4ey

4. 对象底层模型与异质对象 ^y3couia6

内存一致性模型 (Clause 25, 29) • SharedArrayBuffer (Clause 25.2) 共享 Data Block 物理内存 • Atomics (Clause 25.4) 原子操作: load, store, wait, notify, compareExchange • Clause 29 Memory Model: Happens-Before 偏序与数据竞争无冲突保证 (DRF-SC) ^ofcuq53r

控制抽象与异步对象 (Clause 27) • Promise (Clause 27.2) 状态流转与 PromiseReaction 反应记录 • GeneratorFunction (Clause 27.3) 与 AsyncFunction (Clause 27.5) 协程机制 ^7xj8nlx8

元编程与宿主分层 (Clause 28, Annex B & D) • Clause 28 Reflection (Reflect 标准反射方法与 Proxy 1:1 对齐) • Clause 26 Managing Memory (WeakRef 与 FinalizationRegistry 内存管理) • Annex D Host Hooks: 宿主注入钩子 HostImportModuleDynamically 等 • Annex B: Web 浏览器兼容性遗留规范 (__proto__, HTML 风格注释等) ^60ebfey5

5. 内存模型与宿主分层 ^yf3ay644

%%
## Drawing
```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [
    {
      "id": "v6pdrxvr",
      "type": "rectangle",
      "x": 100,
      "y": 600,
      "width": 300,
      "height": 80,
      "angle": 0,
      "strokeColor": "#1e1e1e",
      "backgroundColor": "#dbe4ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 1000,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "4jz2xhj6"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "4jz2xhj6",
      "type": "text",
      "x": 115,
      "y": 625,
      "width": 270,
      "height": 30,
      "angle": 0,
      "strokeColor": "#183153",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 1001,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "ECMAScript 引擎实现架构\n(Engine & Spec)",
      "fontSize": 19,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 19,
      "containerId": "v6pdrxvr",
      "originalText": "ECMAScript 引擎实现架构\n(Engine & Spec)",
      "lineHeight": 1.25
    },
    {
      "id": "rirdkig6",
      "type": "rectangle",
      "x": 900,
      "y": 100,
      "width": 420,
      "height": 52,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2100,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "1qhg4ren"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "1qhg4ren",
      "type": "text",
      "x": 912,
      "y": 110,
      "width": 396,
      "height": 32,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3100,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "文法体系与记号约定 (Clause 5)\n• 上下文无关文法 CFG、链式产生式与目标符号推导",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "rirdkig6",
      "originalText": "文法体系与记号约定 (Clause 5)\n• 上下文无关文法 CFG、链式产生式与目标符号推导",
      "lineHeight": 1.3
    },
    {
      "id": "xv6wkrbw",
      "type": "rectangle",
      "x": 900,
      "y": 168,
      "width": 420,
      "height": 72,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2168,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "440rccig"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "440rccig",
      "type": "text",
      "x": 912,
      "y": 178,
      "width": 396,
      "height": 52,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3168,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "句法导向操作与静态语义 (Clause 8)\n• Early Errors 早期错误检查\n• 名称绑定收集：BoundNames、LexicallyDeclaredNames",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "xv6wkrbw",
      "originalText": "句法导向操作与静态语义 (Clause 8)\n• Early Errors 早期错误检查\n• 名称绑定收集：BoundNames、LexicallyDeclaredNames",
      "lineHeight": 1.3
    },
    {
      "id": "oipwy6o1",
      "type": "rectangle",
      "x": 900,
      "y": 256,
      "width": 420,
      "height": 92,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2256,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "hd4liu5p"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "hd4liu5p",
      "type": "text",
      "x": 912,
      "y": 266,
      "width": 396,
      "height": 72,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3256,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "源码输入与词法分析 (Clause 11~12)\n• Clause 11 Source Text (Unicode 输入)\n• Clause 12 Lexical Grammar (InputElementDiv vs InputElementRegExp)\n• 受限产生式 [no LineTerminator here] 与 ASI 自动分号插入算法",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "oipwy6o1",
      "originalText": "源码输入与词法分析 (Clause 11~12)\n• Clause 11 Source Text (Unicode 输入)\n• Clause 12 Lexical Grammar (InputElementDiv vs InputElementRegExp)\n• 受限产生式 [no LineTerminator here] 与 ASI 自动分号插入算法",
      "lineHeight": 1.3
    },
    {
      "id": "c4l3h0hl",
      "type": "rectangle",
      "x": 900,
      "y": 364,
      "width": 420,
      "height": 92,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2364,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "2ip5mh7h"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "2ip5mh7h",
      "type": "text",
      "x": 912,
      "y": 374,
      "width": 396,
      "height": 72,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3364,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "句法文法解析 (Clause 13~16)\n• Clause 13 Expressions (表达式)\n• Clause 14 Statements & Declarations (语句与声明)\n• Clause 15 Functions & Classes, Clause 16 Scripts & Modules",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "c4l3h0hl",
      "originalText": "句法文法解析 (Clause 13~16)\n• Clause 13 Expressions (表达式)\n• Clause 14 Statements & Declarations (语句与声明)\n• Clause 15 Functions & Classes, Clause 16 Scripts & Modules",
      "lineHeight": 1.3
    },
    {
      "id": "amzdcwsc",
      "type": "rectangle",
      "x": 540,
      "y": 295.5,
      "width": 280,
      "height": 65,
      "angle": 0,
      "strokeColor": "#1098ad",
      "backgroundColor": "#e3fafc",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 4000,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "7cuilynd"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "7cuilynd",
      "type": "text",
      "x": 550,
      "y": 313.5,
      "width": 260,
      "height": 30,
      "angle": 0,
      "strokeColor": "#0c8599",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 5000,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "1. 形式文法与编译前端流水线",
      "fontSize": 15,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 15,
      "containerId": "amzdcwsc",
      "originalText": "1. 形式文法与编译前端流水线",
      "lineHeight": 1.25
    },
    {
      "id": "dckl32es",
      "type": "arrow",
      "x": 400,
      "y": 640,
      "width": 140,
      "height": -312,
      "angle": 0,
      "strokeColor": "#1098ad",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 80,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 6000,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          140,
          -312
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "v6pdrxvr",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "amzdcwsc",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "2he7qti0",
      "type": "arrow",
      "x": 820,
      "y": 328,
      "width": 80,
      "height": -202,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7126,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -202
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "amzdcwsc",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "rirdkig6",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "5yfu4qyn",
      "type": "arrow",
      "x": 820,
      "y": 328,
      "width": 80,
      "height": -124,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7204,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -124
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "amzdcwsc",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "xv6wkrbw",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "dbdnlnig",
      "type": "arrow",
      "x": 820,
      "y": 328,
      "width": 80,
      "height": -26,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7302,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -26
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "amzdcwsc",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "oipwy6o1",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "2i6bah1p",
      "type": "arrow",
      "x": 820,
      "y": 328,
      "width": 80,
      "height": 82,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7410,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          82
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "amzdcwsc",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "c4l3h0hl",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "pfyq6q5w",
      "type": "rectangle",
      "x": 900,
      "y": 512,
      "width": 420,
      "height": 112,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2512,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "my96ugnz"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "my96ugnz",
      "type": "text",
      "x": 912,
      "y": 522,
      "width": 396,
      "height": 92,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3512,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "规范内部类型 (Clause 6.2)\n• Completion Record: [[Type]] (normal/return/throw/break/continue)\n• Reference Record: Base / ReferencedName / Strict 标识 (驱动 this 绑定)\n• Property Descriptor: 数据描述符 / 访问器描述符 / 通用描述符\n• Data Block: 操作系统原生连续内存字节缓冲区",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "pfyq6q5w",
      "originalText": "规范内部类型 (Clause 6.2)\n• Completion Record: [[Type]] (normal/return/throw/break/continue)\n• Reference Record: Base / ReferencedName / Strict 标识 (驱动 this 绑定)\n• Property Descriptor: 数据描述符 / 访问器描述符 / 通用描述符\n• Data Block: 操作系统原生连续内存字节缓冲区",
      "lineHeight": 1.3
    },
    {
      "id": "u6qcnoy1",
      "type": "rectangle",
      "x": 900,
      "y": 640,
      "width": 420,
      "height": 112,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2640,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "p5t0lj92"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "p5t0lj92",
      "type": "text",
      "x": 912,
      "y": 650,
      "width": 396,
      "height": 92,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3640,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "核心抽象操作 AO (Clause 7)\n• 类型转换 AO (Clause 7.1): ToPrimitive, ToNumeric, ToNumber, ToString\n• 比较操作 AO (Clause 7.2): SameValue, SameValueZero, IsStrictlyEqual\n• 对象操作 AO (Clause 7.3): Get, Set, Call, Construct, DefinePropertyOrThrow\n• 迭代操作 AO (Clause 7.4): GetIterator, IteratorNext, IteratorClose",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "u6qcnoy1",
      "originalText": "核心抽象操作 AO (Clause 7)\n• 类型转换 AO (Clause 7.1): ToPrimitive, ToNumeric, ToNumber, ToString\n• 比较操作 AO (Clause 7.2): SameValue, SameValueZero, IsStrictlyEqual\n• 对象操作 AO (Clause 7.3): Get, Set, Call, Construct, DefinePropertyOrThrow\n• 迭代操作 AO (Clause 7.4): GetIterator, IteratorNext, IteratorClose",
      "lineHeight": 1.3
    },
    {
      "id": "pdqznefe",
      "type": "rectangle",
      "x": 540,
      "y": 855.5,
      "width": 280,
      "height": 65,
      "angle": 0,
      "strokeColor": "#40c057",
      "backgroundColor": "#ebfbee",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 4001,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "h8hrkf6v"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "h8hrkf6v",
      "type": "text",
      "x": 550,
      "y": 873.5,
      "width": 260,
      "height": 30,
      "angle": 0,
      "strokeColor": "#2f9e44",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 5001,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "2. 规范专用类型与抽象操作",
      "fontSize": 15,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 15,
      "containerId": "pdqznefe",
      "originalText": "2. 规范专用类型与抽象操作",
      "lineHeight": 1.25
    },
    {
      "id": "cz072uqb",
      "type": "arrow",
      "x": 400,
      "y": 640,
      "width": 140,
      "height": 248,
      "angle": 0,
      "strokeColor": "#40c057",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 80,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 6001,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          140,
          248
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "v6pdrxvr",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "pdqznefe",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "dcgnfymo",
      "type": "arrow",
      "x": 820,
      "y": 888,
      "width": 80,
      "height": -320,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7568,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -320
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "pdqznefe",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "pfyq6q5w",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "54z57qli",
      "type": "arrow",
      "x": 820,
      "y": 888,
      "width": 80,
      "height": -192,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7696,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -192
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "pdqznefe",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "u6qcnoy1",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "zqqm3081",
      "type": "rectangle",
      "x": 900,
      "y": 808,
      "width": 420,
      "height": 112,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2808,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "m1zspqim"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "m1zspqim",
      "type": "text",
      "x": 912,
      "y": 818,
      "width": 396,
      "height": 92,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3808,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "执行上下文栈 (Clause 9.3)\n• code evaluation state: 协程与生成器执行断点恢复\n• LexicalEnvironment (词法环境) 管理 let/const/class\n• VariableEnvironment (变量环境) 管理 var 与函数声明\n• PrivateEnvironment (私有环境) 管理 #field 私有名称",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "zqqm3081",
      "originalText": "执行上下文栈 (Clause 9.3)\n• code evaluation state: 协程与生成器执行断点恢复\n• LexicalEnvironment (词法环境) 管理 let/const/class\n• VariableEnvironment (变量环境) 管理 var 与函数声明\n• PrivateEnvironment (私有环境) 管理 #field 私有名称",
      "lineHeight": 1.3
    },
    {
      "id": "8n1dj0ce",
      "type": "rectangle",
      "x": 900,
      "y": 936,
      "width": 420,
      "height": 92,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 2936,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "mz2gy9u2"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "mz2gy9u2",
      "type": "text",
      "x": 912,
      "y": 946,
      "width": 396,
      "height": 72,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 3936,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "环境记录体系 (Clause 9.1)\n• Declarative Environment: Function 与 Module 记录 (Clause 16 活绑定)\n• Object Environment: with 语句与全局对象映射\n• Global Environment: ObjectRecord + DeclarativeRecord 双核复合结构",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "8n1dj0ce",
      "originalText": "环境记录体系 (Clause 9.1)\n• Declarative Environment: Function 与 Module 记录 (Clause 16 活绑定)\n• Object Environment: with 语句与全局对象映射\n• Global Environment: ObjectRecord + DeclarativeRecord 双核复合结构",
      "lineHeight": 1.3
    },
    {
      "id": "8j24d3dz",
      "type": "rectangle",
      "x": 900,
      "y": 1044,
      "width": 420,
      "height": 92,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3044,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "c461ilhh"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "c461ilhh",
      "type": "text",
      "x": 912,
      "y": 1054,
      "width": 396,
      "height": 72,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4044,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "Realm 与并发调度 (Clause 9.2, 9.4~9.5)\n• Realm (Clause 9.2): Intrinsics 内建对象池与独立全局沙箱\n• Agent & Agent Cluster (Clause 9.4): 线程隔离与微任务调度\n• HostEnqueuePromiseJob (Clause 9.5): 宿主微任务队列注入",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "8j24d3dz",
      "originalText": "Realm 与并发调度 (Clause 9.2, 9.4~9.5)\n• Realm (Clause 9.2): Intrinsics 内建对象池与独立全局沙箱\n• Agent & Agent Cluster (Clause 9.4): 线程隔离与微任务调度\n• HostEnqueuePromiseJob (Clause 9.5): 宿主微任务队列注入",
      "lineHeight": 1.3
    },
    {
      "id": "18i5cbvu",
      "type": "rectangle",
      "x": 540,
      "y": 1343.5,
      "width": 280,
      "height": 65,
      "angle": 0,
      "strokeColor": "#fcc419",
      "backgroundColor": "#fff9db",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 4002,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "xn0ax1v0"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "xn0ax1v0",
      "type": "text",
      "x": 550,
      "y": 1361.5,
      "width": 260,
      "height": 30,
      "angle": 0,
      "strokeColor": "#f08c00",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 5002,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "3. 执行环境与上下文体系",
      "fontSize": 15,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 15,
      "containerId": "18i5cbvu",
      "originalText": "3. 执行环境与上下文体系",
      "lineHeight": 1.25
    },
    {
      "id": "p0hkfuig",
      "type": "arrow",
      "x": 400,
      "y": 640,
      "width": 140,
      "height": 736,
      "angle": 0,
      "strokeColor": "#fcc419",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 80,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 6002,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          140,
          736
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "v6pdrxvr",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "18i5cbvu",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "chzy4hxg",
      "type": "arrow",
      "x": 820,
      "y": 1376,
      "width": 80,
      "height": -512,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7864,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -512
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "18i5cbvu",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "zqqm3081",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "8dc7n2ed",
      "type": "arrow",
      "x": 820,
      "y": 1376,
      "width": 80,
      "height": -394,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 7982,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -394
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "18i5cbvu",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "8n1dj0ce",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "zh8eaj1g",
      "type": "arrow",
      "x": 820,
      "y": 1376,
      "width": 80,
      "height": -286,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8090,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -286
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "18i5cbvu",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "8j24d3dz",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "duf118z3",
      "type": "rectangle",
      "x": 900,
      "y": 1192,
      "width": 420,
      "height": 72,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3192,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "3mvim19k"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "3mvim19k",
      "type": "text",
      "x": 912,
      "y": 1202,
      "width": 396,
      "height": 52,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4192,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "基本内部方法 (Clause 10.1)\n• 11 个核心对象方法: [[Get]], [[Set]], [[GetPrototypeOf]], [[OwnPropertyKeys]]\n• 2 个函数专用方法: [[Call]] 与 [[Construct]] (Clause 10.2)",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "duf118z3",
      "originalText": "基本内部方法 (Clause 10.1)\n• 11 个核心对象方法: [[Get]], [[Set]], [[GetPrototypeOf]], [[OwnPropertyKeys]]\n• 2 个函数专用方法: [[Call]] 与 [[Construct]] (Clause 10.2)",
      "lineHeight": 1.3
    },
    {
      "id": "zr04r5du",
      "type": "rectangle",
      "x": 900,
      "y": 1280,
      "width": 420,
      "height": 52,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3280,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "hn8xoiqk"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "hn8xoiqk",
      "type": "text",
      "x": 912,
      "y": 1290,
      "width": 396,
      "height": 32,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4280,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "内部方法不变性 (Clause 10.1 Invariants)\n• 不可配置属性防篡改、不可扩展对象原型不可变等核心安全约束",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "zr04r5du",
      "originalText": "内部方法不变性 (Clause 10.1 Invariants)\n• 不可配置属性防篡改、不可扩展对象原型不可变等核心安全约束",
      "lineHeight": 1.3
    },
    {
      "id": "08ltvrq5",
      "type": "rectangle",
      "x": 900,
      "y": 1348,
      "width": 420,
      "height": 132,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3348,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "miijq4ex"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "miijq4ex",
      "type": "text",
      "x": 912,
      "y": 1358,
      "width": 396,
      "height": 112,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4348,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "异质对象定制 (Clause 10.4, 10.5)\n• Array Exotic: 拦截 [[DefineOwnProperty]] 动态伸缩 length\n• String Exotic: 虚拟化字符索引只读属性映射\n• Arguments Exotic: 非严格模式参数映射 (Parameter Map) 双向绑定\n• Integer-Indexed: TypedArray 直通 Data Block 底层内存\n• Proxy Exotic (Clause 10.5): 拦截全部 13 个内部方法并强制不变性校验",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "08ltvrq5",
      "originalText": "异质对象定制 (Clause 10.4, 10.5)\n• Array Exotic: 拦截 [[DefineOwnProperty]] 动态伸缩 length\n• String Exotic: 虚拟化字符索引只读属性映射\n• Arguments Exotic: 非严格模式参数映射 (Parameter Map) 双向绑定\n• Integer-Indexed: TypedArray 直通 Data Block 底层内存\n• Proxy Exotic (Clause 10.5): 拦截全部 13 个内部方法并强制不变性校验",
      "lineHeight": 1.3
    },
    {
      "id": "xtp8t86k",
      "type": "rectangle",
      "x": 900,
      "y": 1496,
      "width": 420,
      "height": 92,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3496,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "81ugk4ey"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "81ugk4ey",
      "type": "text",
      "x": 912,
      "y": 1506,
      "width": 396,
      "height": 72,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4496,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "标准对象体系 (Clause 20, 23, 24)\n• Clause 20 Fundamental Objects (Object, Function, Symbol, Error)\n• Clause 23 Indexed Collections (Array, TypedArray)\n• Clause 24 Keyed Collections (Map, Set, WeakMap, WeakSet)",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "xtp8t86k",
      "originalText": "标准对象体系 (Clause 20, 23, 24)\n• Clause 20 Fundamental Objects (Object, Function, Symbol, Error)\n• Clause 23 Indexed Collections (Array, TypedArray)\n• Clause 24 Keyed Collections (Map, Set, WeakMap, WeakSet)",
      "lineHeight": 1.3
    },
    {
      "id": "zbpm57a5",
      "type": "rectangle",
      "x": 540,
      "y": 1953.5,
      "width": 280,
      "height": 65,
      "angle": 0,
      "strokeColor": "#7950f2",
      "backgroundColor": "#f3f0ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 4003,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "y3couia6"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "y3couia6",
      "type": "text",
      "x": 550,
      "y": 1971.5,
      "width": 260,
      "height": 30,
      "angle": 0,
      "strokeColor": "#5f3dc4",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 5003,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "4. 对象底层模型与异质对象",
      "fontSize": 15,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 15,
      "containerId": "zbpm57a5",
      "originalText": "4. 对象底层模型与异质对象",
      "lineHeight": 1.25
    },
    {
      "id": "tfmp4012",
      "type": "arrow",
      "x": 400,
      "y": 640,
      "width": 140,
      "height": 1346,
      "angle": 0,
      "strokeColor": "#7950f2",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 80,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 6003,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          140,
          1346
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "v6pdrxvr",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "zbpm57a5",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "jeqlfxzi",
      "type": "arrow",
      "x": 820,
      "y": 1986,
      "width": 80,
      "height": -758,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8228,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -758
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "zbpm57a5",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "duf118z3",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "wq9h1hik",
      "type": "arrow",
      "x": 820,
      "y": 1986,
      "width": 80,
      "height": -680,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8306,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -680
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "zbpm57a5",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "zr04r5du",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "7rf5ay3e",
      "type": "arrow",
      "x": 820,
      "y": 1986,
      "width": 80,
      "height": -572,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8414,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -572
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "zbpm57a5",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "08ltvrq5",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "pem7szzh",
      "type": "arrow",
      "x": 820,
      "y": 1986,
      "width": 80,
      "height": -444,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8542,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -444
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "zbpm57a5",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "xtp8t86k",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "vmnu0hmo",
      "type": "rectangle",
      "x": 900,
      "y": 1644,
      "width": 420,
      "height": 92,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3644,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "ofcuq53r"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "ofcuq53r",
      "type": "text",
      "x": 912,
      "y": 1654,
      "width": 396,
      "height": 72,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4644,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "内存一致性模型 (Clause 25, 29)\n• SharedArrayBuffer (Clause 25.2) 共享 Data Block 物理内存\n• Atomics (Clause 25.4) 原子操作: load, store, wait, notify, compareExchange\n• Clause 29 Memory Model: Happens-Before 偏序与数据竞争无冲突保证 (DRF-SC)",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "vmnu0hmo",
      "originalText": "内存一致性模型 (Clause 25, 29)\n• SharedArrayBuffer (Clause 25.2) 共享 Data Block 物理内存\n• Atomics (Clause 25.4) 原子操作: load, store, wait, notify, compareExchange\n• Clause 29 Memory Model: Happens-Before 偏序与数据竞争无冲突保证 (DRF-SC)",
      "lineHeight": 1.3
    },
    {
      "id": "zlyof48o",
      "type": "rectangle",
      "x": 900,
      "y": 1752,
      "width": 420,
      "height": 72,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3752,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "7xj8nlx8"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "7xj8nlx8",
      "type": "text",
      "x": 912,
      "y": 1762,
      "width": 396,
      "height": 52,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4752,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "控制抽象与异步对象 (Clause 27)\n• Promise (Clause 27.2) 状态流转与 PromiseReaction 反应记录\n• GeneratorFunction (Clause 27.3) 与 AsyncFunction (Clause 27.5) 协程机制",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "zlyof48o",
      "originalText": "控制抽象与异步对象 (Clause 27)\n• Promise (Clause 27.2) 状态流转与 PromiseReaction 反应记录\n• GeneratorFunction (Clause 27.3) 与 AsyncFunction (Clause 27.5) 协程机制",
      "lineHeight": 1.3
    },
    {
      "id": "ihwmfgf0",
      "type": "rectangle",
      "x": 900,
      "y": 1840,
      "width": 420,
      "height": 112,
      "angle": 0,
      "strokeColor": "#ced4da",
      "backgroundColor": "#ffffff",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 3840,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "60ebfey5"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "60ebfey5",
      "type": "text",
      "x": 912,
      "y": 1850,
      "width": 396,
      "height": 92,
      "angle": 0,
      "strokeColor": "#343a40",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 4840,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "元编程与宿主分层 (Clause 28, Annex B & D)\n• Clause 28 Reflection (Reflect 标准反射方法与 Proxy 1:1 对齐)\n• Clause 26 Managing Memory (WeakRef 与 FinalizationRegistry 内存管理)\n• Annex D Host Hooks: 宿主注入钩子 HostImportModuleDynamically 等\n• Annex B: Web 浏览器兼容性遗留规范 (__proto__, HTML 风格注释等)",
      "fontSize": 12.5,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 12.5,
      "containerId": "ihwmfgf0",
      "originalText": "元编程与宿主分层 (Clause 28, Annex B & D)\n• Clause 28 Reflection (Reflect 标准反射方法与 Proxy 1:1 对齐)\n• Clause 26 Managing Memory (WeakRef 与 FinalizationRegistry 内存管理)\n• Annex D Host Hooks: 宿主注入钩子 HostImportModuleDynamically 等\n• Annex B: Web 浏览器兼容性遗留规范 (__proto__, HTML 风格注释等)",
      "lineHeight": 1.3
    },
    {
      "id": "wz5ndsig",
      "type": "rectangle",
      "x": 540,
      "y": 2587.5,
      "width": 280,
      "height": 65,
      "angle": 0,
      "strokeColor": "#fa5252",
      "backgroundColor": "#ffe3e3",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 4004,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "yf3ay644"
        }
      ],
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "yf3ay644",
      "type": "text",
      "x": 550,
      "y": 2605.5,
      "width": 260,
      "height": 30,
      "angle": 0,
      "strokeColor": "#e03131",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 5004,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "5. 内存模型与宿主分层",
      "fontSize": 15,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 15,
      "containerId": "wz5ndsig",
      "originalText": "5. 内存模型与宿主分层",
      "lineHeight": 1.25
    },
    {
      "id": "2y06wdfq",
      "type": "arrow",
      "x": 400,
      "y": 640,
      "width": 140,
      "height": 1980,
      "angle": 0,
      "strokeColor": "#fa5252",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 80,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 6004,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          140,
          1980
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "v6pdrxvr",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "wz5ndsig",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "wz87kkb0",
      "type": "arrow",
      "x": 820,
      "y": 2620,
      "width": 80,
      "height": -930,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8690,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -930
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "wz5ndsig",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "vmnu0hmo",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "f6pqgr9h",
      "type": "arrow",
      "x": 820,
      "y": 2620,
      "width": 80,
      "height": -832,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8788,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -832
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "wz5ndsig",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "zlyof48o",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "rstjxfqn",
      "type": "arrow",
      "x": 820,
      "y": 2620,
      "width": 80,
      "height": -724,
      "angle": 0,
      "strokeColor": "#868e96",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 60,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 2
      },
      "seed": 8896,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          80,
          -724
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "wz5ndsig",
        "focus": 0,
        "gap": 5
      },
      "endBinding": {
        "elementId": "ihwmfgf0",
        "focus": 0,
        "gap": 5
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    }
  ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```
%%
