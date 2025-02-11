---
slug: React开发记录
title: React开发记录
authors: [marvin-season]
tags: []
---

## 组件的最新状态值

### 方案一

使用 useState callback

```tsx
let fetchData: (
  url: string,
  onData: (message: string) => void,
  onSettled: () => void
) => void;

const [messages, setMessages] = useState([]);

const simulateMessageUpdate = () => {
  fetchData(
    "/url",
    () => {
      const updatedMessages = ["New Message 1"];
      setMessages((pre) => [...pre, ...updatedMessages]);
    },
    () => {
      saveMessages();
    }
  );
};

const saveMessages = () => {
  setMessages((pre) => {
    localStorage.setItem(key, pre);
    return pre;
  });
};
```

:::tip
🔔 useReducer 肯定可以

🔔 需要注意状态 messages 的更新和读取

1、需要保证 messages 更新是基于是最新状态更新的

```jsx
// call back方式， pre为更新队列中上次更新的状态值，不是当前闭包函数中的状态值
setMessages((pre) => [...pre, ...updatedMessages]);
```

2、读取到的 messages 是最新的状态

```jsx
// 想要拿到更新后的最新状态，可以这样
setMessages((pre) => {
  localStorage.setItem(key, pre);
  return pre;
});
```

:::

### 方案二

使用 useEffect

```tsx
const [settled, setSettled] = useState<boolean>(false);

const onSettled = () => {
  setSettled(true);
};

useEffect(() => {
  if (settled) {
    localStorage.setItem(key, messages);
  }
}, [settled, messages]);
```

:::tip
setSettled 触发组件重新调用，dom 更新，messages 也自然是最新的值，messages 的更新队列在 settled 之前
:::

## 消息自动滚动

### Element.scrollIntoView

```jsx
useEffect(() => {
  if (processRef.current) {
    processRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}, [messages]);

const div = (
  <div style={{ height: "100px", overflow: "scroll" }}>
    <div ref={processRef}>
      {messages.map((item, index) => (
        <div key={index}>{item.id}</div>
      ))}
    </div>
  </div>
);
```

:::tip
```js
scrollIntoView({{ behavior: "smooth", block: "end" }})
```
🔔 配置项 block:'end'

🔔 容器元素设置固定高度，overflow: 'scroll'
:::

### Element.scrollTo

```jsx
processRef?.current.scrollTo({ left: 100, top: 200, behavior: "smooth" });

const container = (
  <div ref={processRef} style={{ height: "100px", overflow: "scroll" }}>
    {messages.map((item, index) => (
      <div key={index}>{item.id}</div>
    ))}
  </div>
);
```

:::tip
🔔 100 表示滚动条沿着 x 轴与坐标店的距离，200 则是 y 轴

🔔 注意`processRef`和`style`在同一个元素,否则会失效
:::
