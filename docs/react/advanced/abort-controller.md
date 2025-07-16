```tsx
import { useCallback, useEffect, useRef } from "react";

export function useAbortController(callback: () => void) {
    const abortControllerRef = useRef<AbortController>(new AbortController());

    const reset = useCallback(() => {
        abortControllerRef.current = new AbortController();
        abortControllerRef.current.signal.onabort = callback;
    }, [callback]);

    useEffect(() => {
        abortControllerRef.current.signal.onabort = callback;
        return () => {
            abortControllerRef.current.signal.onabort = null;
        };
    }, [callback]);

    return {
        abortControllerRef,
        abort: (reason?: string) => {
            abortControllerRef.current.abort(reason);
            reset();
        },
    };
}
```

使用方式

```tsx
const { abortControllerRef, abort } = useAbortController(() => {
    xhr.abort(); // 中断 XMLHttpRequest 请求
});

fetch("https://api.example.com/data", {
    signal: abortControllerRef.current.signal, // 可中断fetch请求
}).catch((err) => {
    if (err.name === "AbortError") {
        console.log("abort");
    }
});

export default function App() {
    return <button onClick={() => abort()}>abort</button>;
}
```
