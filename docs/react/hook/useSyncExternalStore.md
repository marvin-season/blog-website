---
title: useSyncExternalStore
---
`useSyncExternalStore` 是 React 18 引入的一个 Hook，专门用于**订阅外部可变状态（external store）**，并确保 **一致性和并发安全**，特别适用于状态库或响应式框架的桥接。

---

## 🧠 为什么需要 useSyncExternalStore？

React 的并发渲染模式（Concurrent Mode）可能导致**不一致的订阅行为**。传统的 `useEffect + useState` 容易出现数据“撕裂”（tearing）现象。

`useSyncExternalStore` 提供了一个**官方推荐的订阅外部状态方案**，具备以下特性：

- 保证在渲染期间获取最新快照
- 在服务端渲染（SSR）中也能安全使用

---

{/* truncate */}

## 🔧 语法

```ts
const state = useSyncExternalStore(
  subscribe: (callback: () => void) => () => void,
  getSnapshot: () => any,
  getServerSnapshot?: () => any // 可选，仅用于 SSR
);
```

