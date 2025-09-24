# Sticky Trapped(以纵向为例)

Sticky 元素相对于最近的可滚动祖先元素定位, 一般由top决定最终位置, 但是又会受到父容器的托举

**托举**: 当纵向滚动时,父容器底部与sticky元素重合,会拖着sticky往上走
## 父元素高度问题

```jsx
<div className="overflow-y-scroll h-screen bg-red-100">
    <div className="sticky size-20 bg-red-300 top-40 "></div>
</div>
```

