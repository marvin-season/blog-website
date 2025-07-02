# 📘 Sticky 元素与负 margin 重叠行为分析

## ✅ 示例结构

```jsx
<div className='sticky top-0 h-40 z-10 bg-gray-100 -mb-30'>a</div>
<div className='bg-gray-500 h-70'>
  <div className='sticky top-40 h-40 z-0 bg-gray-200'>b</div>
</div>
```

🧠 关键点解析

1. -mb-30 的作用
   • -mb-30 即 margin-bottom: -7.5rem（-120px），会将后续元素向上“拉”。
   • 它使得 a 元素的下方空间减少，影响后续元素在视觉上的布局位置。

2. sticky 是如何工作的？
   • sticky 定位是相对于最近的滚动祖先或文档本身，不会受前一个元素的 margin 影响。
   • top-40 意味着 b 会在距离视口顶部 10rem（160px）处吸附。

3. 为什么加上 h-70 没有重叠？
   • h-70 即 height: 17.5rem（280px）给 b 的父容器提供了充足的垂直空间。
   • 即使 a 的负 margin 把后续内容拉高了 120px，b 仍然有空间在容器中正常布局。

4. 去掉 h-70 后为什么会重叠？
   • 缺乏高度支撑，导致 b 的父容器没有足够空间。
   • 此时 b 会被 a 的负 margin 拉入视图顶部区域，造成视觉重叠。

The element is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor and containing block (nearest block-level ancestor), including table-related elements, based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements.

This value always creates a new stacking context. Note that a sticky element "sticks" to its nearest ancestor that has a "scrolling mechanism" (created when overflow is hidden, scroll, auto, or overlay), even if that ancestor isn't the nearest actually scrolling ancestor.
