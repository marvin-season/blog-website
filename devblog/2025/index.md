## 深度思考功能
### 提取思考信息
`<think>这是思考内容</think> hello`
以流或者整体的方式处理上述字符串，将think标签包裹的部份提取为单独的字段，最终输出为：
```json
{
  "content": " hello",
  "think_content": "这是思考内容"
}
```
如果标签不闭合，例如: `<think>这是思考内容 hello`，则不提取字段，输出为：
```json
{
  "think_content": "这是思考内容 hello",
  "content": ""
}
```

```js
function processContent(input) {
  // Check if there is a closed <think> tag
  const closedPattern = /<think>([\s\S]*?)<\/think>/;
  const closedMatch = input.match(closedPattern);
  if (closedMatch) {
    // Extract think content and remove the <think> block from input to get remaining content.
    const thinkContent = closedMatch[1];
    const content = input.replace(closedPattern, '').trim();
    return {
      content: content,
      think_content: thinkContent
    };
  } else {
    // If not a properly closed tag, check for an opening <think> tag
    const openPattern = /<think>([\s\S]*)/;
    const openMatch = input.match(openPattern);
    if (openMatch) {
      return {
        content: "",
        think_content: openMatch[1].trim()
      };
    }
    // When no <think> tag is present, return the whole string as content.
    return {
      content: input.trim(),
      think_content: ""
    };
  }
}

// Example usage:
console.log(processContent("<think>这是思考内容</think> hello"));
// Expected output: { content: "hello", think_content: "这是思考内容" }

console.log(processContent("<think>这是思考内容 hello"));
// Expected output: { content: "", think_content: "这是思考内容 hello" }
```

### 扩展组件
```tsx
function ThinkComponent1({ content = "a" }) {
    return <div>think1: {content}</div>;
}

function ThinkComponent2({ content = "a" }) {
    return <div>think2: {content}</div>;
}

const withThink = <
P extends object,
>(
    Component: ComponentType<P>,
    ThinkComponent: FunctionComponent<{ content: string }>,
) => {
    return (props: P & { fullContent: string }) => {
        const { content, think_content } = parseThinkContent(props.fullContent);
        return (
            <>
                <ThinkComponent content={think_content} />
                <Component {...props} content={content} />
            </>
        );
    };
};

const PlainContent = ({ content = '', age = 10 }) => <div>{content}</div>;
const MultiContent = withThink(
    PlainContent,
    ThinkComponent2,
);

<MultiContent
    fullContent={
        "<think>借助 IntersectionObserver API, 监听将要进入视口内的dom，当该 dom</think>hello world"
    }
/>
```