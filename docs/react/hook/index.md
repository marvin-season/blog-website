# react hooc

## 概述

react 中的 hook 以链表的方式存储起来

### 源码实现

```js
let isMount = true;
let workInprogressHook = null; // 指向当前处理的hook， 初始化为链表的头指针

const fiber = {
  stateNode: App,
  memoizedState: null, // state hook， 也是个链表， workInprogressHook为其移动指针
};

function schedule() {
  workInprogressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}
```

## useState

useState 负责组件的状态存储， 并提供了状态更新的入口；

### 源码实现

```js
function useState(initialState) {
  let hook;

  if (isMount) {
    // 初始化为所有的useState创建hook对象
    hook = {
      memoizedState: initialState,
      next: null,
      // hook对应的update队列
      quque: {
        pending: null,
      },
    };
    // 已经有hook充当链表头
    if (fiber.memoizedState) {
      workInprogressHook.next = hook;
    } else {
      fiber.memoizedState = hook;
    }
    // 指针指向当前最新的hook
    workInprogressHook = hook;
  } else {
    // 更新逻辑
    hook = workInprogressHook;
    workInprogressHook = workInprogressHook.next;
  }

  let baseState = hook.memoizedState;

  // 更新队列有任务
  if (hook.quque.pending) {
    let firstUpdate = hook.quque.pending;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);

      firstUpdate = firstUpdate.next;
    } while (firstUpdate != hook.quque.pending.next);
    hook.quque.pending = null;
  }

  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.quque)];
}

function dispatchAction(quque, action) {
  const update = {
    action,
    next: null,
  };

  // 串联 更新链表
  if (quque.pending == null) {
    update.next = update;
  } else {
    // 环形链表
    update.next = quque.pending.next;
    quque.pending.next = update;
  }

  quque.pending = update;

  schedule();
}
```

:::tip
- 更新状态的action以环状链表的方式封装
- 每次调用action，会重新调用schedule函数，重新计算下一轮状态并返回
:::

## 执行

```js
function App() {
  const [number, updateNumber] = useState(0);
  const [number1, updateNumber1] = useState(10);
  const [number2, updateNumber2] = useState(10);
  console.log("isMount", isMount);
  console.log("number", number);
  console.log("number1", number1);
  return {
    onClick() {
      updateNumber((number) => number + 1);
      updateNumber((number) => number + 2);
    },
    onFocus() {
      updateNumber1((number1) => number1 + 10);
    },
  };
}
```
