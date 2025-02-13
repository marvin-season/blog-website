---
slug: vue-grid-layout
title: Vue-grid-layout
authors: [marvin-season]
tags: [javscript]
date: '2023-12-01'
---

# Drag-and-Drop Layout Solution Based on Vue-Grid-Layout

## Business Scenario

Users can perform operations such as **dragging** and **resizing** the content on the page to customize the layout of the page.

[demo](https://codesandbox.io/embed/vue-grid-layout-vue2-x38xpy?fontsize=14&hidenavigation=1&theme=dark)

## What is Vue-Grid-Layout?

[Vue-Grid-Layout](https://jbaysolutions.github.io/vue-grid-layout/) is a drag-and-drop layout component that can meet the above requirements. It is a secondary development based on [Gridster](http://dsmorse.github.io/gridster.js/), supporting drag-and-drop, scaling, responsive layout, etc.

## How to Use?

### Installation

```bash
npm install vue-grid-layout --save
# or
yarn add vue-grid-layout
```

### Usage

It's very simple, a container component, and an element component. The container component is mainly responsible for the layout, and the element component is responsible for displaying the content you want to fill.

```vue
<template>
 <grid-layout>
    <grid-item></grid-item>
  </grid-layout>
</template>
<script>
import { GridLayout, GridItem } from "vue-grid-layout";
```

[Note: Complete basic code](#section)

---

## Learn More

### Two Concepts

**Container Component**: GridLayout has an important property called layout

- layout is an array
- Each item in the array determines the layout of the element component in the container
- The array corresponds to the element components one by one

**Element Component**: Just fill the content you want to display into the element component.

Note: The meaning of the fields in the array items:

```ts
{
  i: string // id
  x: number // x-axis,
  y: number // y-axis,
  w: number // width,
  h: number // height
  static: boolean // won't be draggable, resizable or moved by other items
  // other custom properties
}
```

Note: The attribute configuration of the element component:

[Refer to the official website GridLayout](https://jbaysolutions.github.io/vue-grid-layout/guide/properties.html#gridlayout)

[Refer to the official website GridLayout-Item](https://jbaysolutions.github.io/vue-grid-layout/guide/properties.html#griditem)

### Extended Configuration

`Resizable`

```vue
<grid-layout :isResizable="true" :layout.sync="layout" :col-num="12" <grid-item>...</grid-item>   
>
</grid-layout>
```

`Draggable`

```vue
<grid-layout :is-draggable="true" :layout.sync="layout" :col-num="12" <grid-item>...</grid-item>   
>
</grid-layout>
```

`Responsive`

```vue
<grid-layout
  :responsive="true"
  :responsiveLayouts="{ lg: [...layout] }"
  :breakpoints="breakpoints"
  :cols="cols"
  :layout.sync="layout"
  :col-num="12"
  <grid-item
>...</grid-item>   
>
</grid-layout>
```

<a id="section"></a>

## Complete Basic Code

```vue
<template>
  <grid-layout :layout.sync="layout">
    <grid-item
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
    >
      12321
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: { GridLayout, GridItem },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 3, h: 2, i: '1', static: false },
        { x: 6, y: 0, w: 3, h: 2, i: '2', static: false },
      ],
    }
  },
}
</script>
