---
slug: ai-deep-think
title: 深度思考扩展
authors: [marvin-season]
tags: [javascript, ai]
---

## S

DeepSeek 的爆火带来的深度思考模式，需要在已有流式对话中实现【前端】

## T

在原有的对话基础上加入深度思考的交互，并支持不同的思考风格

## A

解析深度思考内容，开发新的深度思考组件，尽可能不改变原有组件实现深度思考的功能扩展，=> HOC正是这一思想

## R

扩展原有组件，实现深度思考功能

<!-- truncate -->

## Concrete

### 原有组件

```jsx
function Content({ content }) {
    return <div>{content}</div>;
}
```

### 目标组件

#### **错误的方式：直接修改原组件**

```jsx {1,3} showLineNumbers
function ContentWithThink({ content, think }) {
    return (
        <div>
            <div>{think}</div>
            <div>{content}</div>
        </div>
    );
}
```

#### **推荐的方式:HOC**

```tsx showLineNumbers
const withThink = <P extends object>(
    Component: ComponentType<P>,
    ThinkComponent: FunctionComponent<ThinkContentStyleProps>,
) => {
    return (props: P & { content: string }) => {
        const { content, think_content, closedMatch, openMatch } =
            parseThinkContent(props.content);

        return (
            <>
                <Think
                    closedMatch={!!closedMatch}
                    openMatch={!!openMatch}
                    think_content={think_content}
                    ThinkComponent={ThinkComponent}
                />
                <Component {...props} content={content} />
            </>
        );
    };
};

export const ContentWithThink = memo(
    withThink(Content, ThinkContentStyle),
    (prev, next) => {
        return prev.content === next.content;
    },
);
```

**withThink**是一个**HOC**组件，用于扩展传入的**Content**组件,其中**ThinkContentStyle**为配置思考组件的风格提供了入口，
HOC中的**Think**组件则定一个思考组件的逻辑以及布局

```tsx showLineNumbers
const Think = ({
    closedMatch,
    openMatch,
    think_content,
    ThinkComponent,
}: ThinkProps) => {
    const [status, setStatus] = useState<ThinkStatus>(ThinkStatus.completed);

    const match = useMemo(() => {
        return openMatch || closedMatch;
    }, [openMatch, closedMatch]);

    useEffect(() => {
        if (openMatch) {
            setStatus(ThinkStatus.thinking);
        }
    }, [openMatch]);

    useEffect(() => {
        if (closedMatch) {
            setStatus(ThinkStatus.completed);
        }
    }, [closedMatch]);

    useEffect(() => {
        EE.on(ThinkEvent, ({ thinkStatus }: { thinkStatus: ThinkStatus }) => {
            // 完整匹配到了
            if (closedMatch) {
                setStatus(ThinkStatus.completed);
                return;
            }
            setStatus(thinkStatus);
        });
        return () => {
            EE.off(ThinkEvent);
        };
    }, [status]);

    return (
        <>
            {match && (
                <ThinkComponent think_content={think_content} status={status} />
            )}
        </>
    );
};
```

## How To Use

直接替换原来的组件为高阶组件

```tsx
() => <ContentWithThink content={content} className={className} />;
```

## Recap

- 使用高阶组件扩展了业务功能，尽可能的没有操作原有的代码
- 将新功能全部聚合在HOC中
