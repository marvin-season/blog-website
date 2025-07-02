# Sticky 失效的原因

Sticky 元素相对于最近的可滚动祖先元素定位, top/left/right/bottom 决定最终位置,不脱离原文档流

## 父元素高度问题

```jsx
<div className="overflow-y-scroll h-screen bg-red-100">
    <div className="sticky size-20 bg-red-300 top-40 "></div>
</div>
```

sticky 元素:
size: 80px
top: 160px

那么需要其父级元素的高度 >= (80 + 160) px

入锅父级元素不是 **可滚动的块** sticky 元素在确定最终位置时,会带着父级元素跑,最后基于 nearest ancestor scrollable block element 来确定值,
如果是可滚动的块,则基于父级元素确定最终位置
