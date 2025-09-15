# scrollbar

## 隐藏滚动条

```css
::-webkit-scrollbar {
    display: none;
}
```

## 自定义滚动条样式

```css
*::-webkit-scrollbar {
    width: 2px;
}

*::-webkit-scrollbar-track {
    background: #f9f9f9;
    border-radius: 2px;
}

*::-webkit-scrollbar-thumb {
    background: #cccfd4;
    border-radius: 2px;
}

*::-webkit-scrollbar-thumb:hover {
    background: #b8b4b4;
}
```

## 滚动条导致页面抖动

```css
* {
    scrollbar-gutter: stable;
}
```
