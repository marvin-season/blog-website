---
slug: react-think
title: React Think
authors: [marvin-season]
tags: [javascript]
date: "2024-02-04"
---
Web开发的本质就是将 **数据** 呈现到页面，平滑的交互带来好的用户体验(User Perceived Performance)，性能优化也此为主。

## 原生JS
如果不使用 React，我们可以使用原生JS来实现页面的交互，比如下面的例子：

```js
const addbtn = document.getElementById("add");
const counter = document.getElementById("counter");

addbtn.onclick = function() {
    // some business logic
  num.innerText = parseInt(counter.innerText) + 1;
};
```

可以看到 **数据** 和 **UI**有很强的粘性，业务代码不够清晰，维护性差。且频繁的操作DOM会导致性能问题。

### 如何优化？
不直接操作DOM，而是在DOM和数据之间加一层，当我们需要更新数据时去通知这一层，至于更新优化的逻辑，全部集中在这一层。

React就扮演了这样的角色。

## React如何工作

https://github.com/acdlite/react-fiber-architecture

https://jser.pro/ddir/rie?reactVersion=18.3.1&snippetKey=hq8jm2ylzb9u8eh468

**以数据为核心，驱动视图更新**
React架构如下：
Scheduler -> Reconciler -> Renderer

```jsx
const Counter = () => {
    const [counter, setCounter] = useState(0);
    return <>
        <span>{counter}</span>
        <button onClick={() => setCounter(prev => prev + 1)}>add</button>
    </>
}
```
调用setCounter触发更新任务,Scheduler依据任务的优先级选择任务，将任务交给 Reconciler, Reconciler 负责找出变化的部份，将变化的部份交给Render，Render负责将变化的部份渲染到页面上。
Reconciler的工作是最复杂的，初次渲染时，Reconciler会生成一颗Fiber树，当更新时Reconciler 利用**双缓存机制**克隆原来的树，将更新后的节点更新到新树上，最后将新树替换原来的树。