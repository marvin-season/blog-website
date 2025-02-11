---
slug: React手写Table组件
title: React手写Table组件
authors: [marvin-season]
tags: [React, Table, antd, Typescript]
---

## 简要概括

一个 Table 组件，使用方式类似 antd 的 Table 组件，但是功能单一

## 实现思路

结构上包括表头和表体,数据上对应表头数据和表体数据，对表头数据和表体数据进行遍历生成 react 组件即可！

期待如下使用的使用方式：

```tsx
<Table datasource={[]} columns={[]} />
```

<a id="id1"></a>

:::tip
组件有如下基本功能：

- 显示列表数据
- 表体的列可以固定
- render 自定义显示内容
- 点击表体数据,触发 onClick 事件

表头数据: columns；
表体数据: datasource；
:::

## 实现过程

### 组件拆分

```tsx
const TableHead = () => <></>;
const TableBody = () => <></>;
const Table = () => <></>;
```

### ts 签名

```ts
export interface TableProps {
  onClick?: (data: RowColumnDataProps) => void;
  columns: ColumnProp[];
  datasource: DatasourceProp[];
}

export interface ColumnProp {
  key: string;
  width?: string;
  title: string;
  dataIndex: string;
  render?: (data: RowColumnDataProps) => ReactNode;
  fixed?: "left" | "right" | string;
}

export interface DatasourceProp {
  [_: string]: any;
}

export type RowColumnDataProps = {
  row: DatasourceProp;
  column: ColumnProp;
};
```

### 应用 ts 签名

```tsx
export const Table: FunctionComponent<TableProps> = ({
  datasource,
  columns,
  onClick,
}) => {};

const TableHead = ({ columns }: Pick<TableProps, "columns">) => {};

const TableBody = ({
  datasource,
  columns,
  onClick,
}: Pick<TableProps, "datasource" | "columns" | "onClick">) => {};
```

### 开发细节

围绕该组件的[基本功能](#id1)

**显示列表数据**
:::tip
表头数据： 1 个 for 循环；
表体数据： 2 个 for 循环；

**表头**

```tsx
const header = columns.map((column) => (
  <td key={column.key}>{column.title}</td>
));
```

**表体**

```tsx
const body = datasource.map((item, index) => {
  const tds = columns.map((column) => {
    return <td key={column.key}>{item[column.dataIndex]}</td>;
  });
  return <tr key={index}>{tds}</tr>;
});
```

:::

**表体的列可以固定**

使用 sticky 定位实现固定列。 在 columns 的配置项中我们期望传入 fixed: 'right',从而实现该列右侧固定

:::tip

将对应的 style 传入 td（列所在的表头表体数据格）即可。

```css
style {
  position: sticky;
  right: 0;
}

parentStyle {
  position: relative;
}
```

注意其他的数据格需要指定宽度

```tsx
const header = columns.map((column) => (
  const style = genStyle(column)
  <td key={column.key} style={style}>{column.title}</td>
));

const generateStyle = (column: ColumnProp) => {
  let defaultStyle = {
    width: '160px',
  };

  if (column.fixed) {
    const stickyStyle: any = {
      position: 'sticky',
      background: 'white',
      [column.fixed]: 0,
    };
    defaultStyle = { ...defaultStyle, ...stickyStyle };
  }
  return defaultStyle;
};
父元素样式此处省略

上述sticky定位中，right恒为0，
这样当指定多个列固定在同一侧时会出现bug，需要额外加逻辑，
处理right的值为右侧已经固定列的宽度
```

:::

**render 自定义显示内容**

用户可能需要在数据格中显示操作按钮，所以在 columns 配置项中提供一个 render 选项，详见 ts 签名

在渲染表体的时候调用 render 函数渲染自定义组件即可

```tsx
const tdContent = column.render ? (
  column.render({ row: item, column })
) : (
  <>{item[column.dataIndex]}</>
);
```

**点击表体数据,触发 onClick 事件**

调用组件下传的 onClick 事件并传入需要的数据即可，比如行数据和列数据。

```tsx
const td = (
  <td
    onClick={() => {
      onClick && onClick({ row, column });
    }}
  ></td>
);

```

## Recap

## To be continue ...
