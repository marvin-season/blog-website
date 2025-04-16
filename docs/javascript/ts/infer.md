---
title: 类型体操 infer 
---
## 🧩 一、infer 是什么？

infer 是 TypeScript 条件类型（Conditional Types）中的一个关键字，用于在类型判断中临时声明一个类型变量，通过结构匹配的方式，把复杂类型中的某部分“提取”出来。

它的设计目的是为了解决 类型提取（Type Extraction）的问题。


## 🚀 二、infer 能解决什么问题？

我们在写复杂泛型时，常会遇到这种需求：

✅「我想从一个类型中提取某一部分（比如函数的参数、返回值、数组的元素、Promise 的解析类型）」

传统写法必须写多个泛型参数并手动约束，而 infer 可以自动推导并提取想要的部分类型。

## 📚 三、语法和工作原理

基本结构：
```ts
type Some<T> = T extends SomeType<infer X> ? X : DefaultType
```
```text
•	T 是传入的类型
•	SomeType<infer X> 是你希望匹配的类型结构
•	如果 T 能匹配 SomeType<X>，那么就提取出 X
•	否则进入 : 分支返回默认类型
```
这个过程就是「结构匹配 + 自动提取」。

## 🔍 四、核心机制：结构类型匹配

infer 本质依赖的是 TypeScript 的结构类型系统。例如：
```ts
type A<T> = T extends [infer First, infer Rest] ? First : never;

type R = A<[string, number]>; // 推导出 string
```
工作原理是：
```text
•	TS 编译器尝试将你写的类型结构 [infer First, infer Rest] 去匹配传入的类型 [string, number]
•	匹配成功后，First 和 Rest 被「提取」出来，类型系统就能拿来继续用
```

## 🧠 五、作用域限制

infer 声明的变量 只能在 ? 分支内访问：
```ts
T extends Something<infer X> ? X : never; // ✅ OK
T extends Something<infer X> ? string : X; // ❌ X 不在作用域
```

## 🏗 六、递归 infer（进阶用法）

你可以在 infer 中递归使用类型推导，比如：
```ts
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;

type R = DeepUnwrap<Promise<Promise<string>>>; // R = string
```