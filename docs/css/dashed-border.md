## 自定义虚线边框最佳实践--SVG

参考 https://kovart.github.io/dashed-border-generator/

生成想要的虚线框代码

```css
.dashed {
    padding: 20px;
    width: 100%;
    height: 100%;

    /* dashed border */
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23333' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='98' stroke-linecap='round'/%3e%3c/svg%3e");
    border-radius: 12px;
}
```
