## useLayoutEffect vs useEffect
- useLayoutEffect: 在 layout 前执行，适用于频繁操作DOM，不会引起回流带来的性能损耗
- useEffect: 在 paint 后执行，适用于异步操作，如数据请求、订阅等, 不要操作DOM，否则会有reflow等性能损耗

## useMemo
`useMemo(() => a + 1, [a])` 中，当 a 变成 2 又变回 1，a + 1 会重新执行一次，不会复用第一次的缓存结果。
如果你想基于值缓存怎么办？
```js
const cache = useRef(new Map());

const result = useMemo(() => {
  if (cache.current.has(a)) return cache.current.get(a);

  const computed = a + 1;
  cache.current.set(a, computed);
  return computed;
}, [a]);
```
