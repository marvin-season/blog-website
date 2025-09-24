---
slug: design-pattern
title: React 设计模式
authors: [marvin-season]
tags: [react]
---

## Render Props

详细参考 Formik 的实现，使用 render props 实现一个表格组件。
示例代码如下：

```tsx
const Table = <T,>({
    children,
    data,
}: {
    children: (props: T[]) => React.ReactNode;
    data: T[];
}) => {
    return children(data);
};

function Case() {
    return (
        <Table data={[{ name: "John Doe", age: 12 }]}>
            {(data) => (
                <div>
                    {data.map((item) => (
                        <div key={item.name}>
                            {item.name} {item.age}
                        </div>
                    ))}
                </div>
            )}
        </Table>
    );
}
```
