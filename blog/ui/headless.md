---
slug: headless
title: Think In Headless
authors: [marvin-season]
tags: [javascript, headless-ui]
---

## What

一种快速组装UI的模式

## Comparing In Dev A Closable TodoCard

### 传统流程

- 定义组件 TodoCard
- 实现UI
- 注册事件
- 维护状态

```jsx
function TodoCard() {
    return (
        <div>
            <div>header</div>
            <button onClose={() => {}}>X</button>
            <div>
                <div>content1</div>
                <div>content2</div>
            </div>
        </div>
    );
}
```

### 无头组件开发流程

实际上初次看到这种代码是抵触的,比如
[headlessui](https://headlessui.com/react/menu), [shadcn](https://ui.shadcn.com/docs/components/accordion), Radix等等

可以看到从写法上Headless的开发代码似乎很臃肿,
为了实现一个简单的组件,往往需要搭很多积木

但是牛就牛在他的设计哲学,传统的方式**预定义样式**,然后**勾入功能业务逻辑**,进而实现完整的组件
但是headless相反, 预定义**功能逻辑**,然后在使用的时候**注入样式**
后者天然支持主题定制,这是对**SoC**的践行(最少知道,高内聚,低耦合那一套)

```tsx
"use client";

import { createElement } from "react";

export function TodoHeader({
    children,
    className,
    as = "div",
}: {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}) {
    return createElement(as, { className }, children);
}

export function TodoCardContainer({
    children,
    className,
    as = "div",
}: {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}) {
    return createElement(as, { className }, children);
}

export function TodoCardContent({
    children,
    className,
    as = "div",
}: {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}) {
    return createElement(as, { className }, children);
}

/**
 * 二进制位码说明:
 * 000 不需要权限也不需要确认
 * 001 需要确认是否删除
 * 010 需要权限
 */
const CODE = {
    NOTHING: 0b000,
    NEED_CONFIRM: 0b001,
    NEED_AUTH: 0b010,
} as const;

type CodeType = (typeof CODE)[keyof typeof CODE];

interface TodoCardCloseButtonProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    codeNumber?: CodeType;
    onClick?: () => void;
}

export function TodoCardCloseButton({
    children,
    className,
    as = "button",
    onClick,
    codeNumber = CODE.NEED_CONFIRM,
}: TodoCardCloseButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (codeNumber & CODE.NEED_AUTH) {
            alert("需要权限");
            return;
        }
        if (codeNumber & CODE.NEED_CONFIRM) {
            if (!confirm("需要确认是否删除")) return;
        }
        onClick?.();
    };

    return createElement(as, { className, onClick: handleClick }, children);
}
```

上述是一个headless的组件,在使用的时候,自己去组合拼装即可

```tsx
<div className="flex gap-4">
    {todos.map((todo) => (
        <TodoCardContainer
            className="border border-green-500 rounded-lg px-2"
            as="div"
            key={todo.id}
        >
            <TodoHeader className="flex justify-between">
                <div>{todo.title}</div>
                <TodoCardCloseButton
                    className="text-red-500"
                    onClick={() =>
                        setTodos(todos.filter((t) => t.id !== todo.id))
                    }
                >
                    close
                </TodoCardCloseButton>
            </TodoHeader>
            <TodoCardContent>
                <div>{todo.description}</div>
                <div>{todo.dueDate}</div>
                <div>{todo.priority}</div>
            </TodoCardContent>
        </TodoCardContainer>
    ))}
</div>
```

## Conclude

可以把 Headless 组件看作是一种 “逻辑控制抽象 + UI 留给调用方” 的 组合式组件开发方式
