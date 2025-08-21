# gradient
## text gradient

tailwindcss
```html
<div class="bg-gradient-to-r from-[#89FFF8] to-[#4dffa7] bg-clip-text text-transparent">Hello World</div>

<h1 class="text-5xl font-bold bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
  三色渐变文字
</h1>

<h1 class="text-5xl font-bold 
  bg-[linear-gradient(to_right,#ff4d8d_0%,#ffd93b_30%,#4dffa7_60%,#3b82f6_100%)] 
  bg-clip-text text-transparent">
  四色渐变文字
</h1>
```

styles
```css
.gradient {
  background: linear-gradient(to right, #89FFF8, #4dffa7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```