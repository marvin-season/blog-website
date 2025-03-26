import { useEffect, useRef, useState } from "react";
import { createIntersectionObserver, sleep } from "aio-tool";

const s: string = `The central idea of React's API is to think of updates as if they cause the entire app to re-render. This allows the developer to reason declaratively, rather than worry about how to efficiently transition the app from any particular state to another (A to B, B to C, C to A, and so on).

Actually re-rendering the entire app on each change only works for the most trivial apps; in a real-world app, it's prohibitively costly in terms of performance. React has optimizations which create the appearance of whole app re-rendering while maintaining great performance. The bulk of these optimizations are part of a process called reconciliation.

Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM." A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via setState), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.`;

export default function StreamRender() {
    const [content, setContent] = useState("");
    const promiseRef = useRef<any>(false);
    const remainRef = useRef<string>('');
    const start = async () => {

        for (const char of s) {
            if (promiseRef.current === "continue") {
                setContent(prev => prev + char);
                await sleep(20);
            } else if (promiseRef.current === "abort") {
                remainRef.current += char;
                console.log('remain:', remainRef.current);
                await new Promise(resolve => {
                    promiseRef.current = (node: any) => {
                        console.log(node);
                        resolve(true);
                    };
                });
            }

        }
    };
    const targetRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = createIntersectionObserver({
            targets: [targetRef.current],
            options: {
                root: rootRef.current,
                rootMargin: "50%"
            },
            onIntersecting: () => {
            },
            callback: (entries) => {
                console.log(entries);
                if (entries[0].isIntersecting) {
                    typeof promiseRef.current === "function" && promiseRef.current(entries[0].target);
                    promiseRef.current = "continue";
                } else {
                    promiseRef.current = "abort";
                }
            },
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return <>
        <button className={"border px-2"} onClick={start}>start</button>
        <div ref={rootRef} className={"h-[100px] overflow-y-scroll border"}>
            {content}
            <div ref={targetRef}></div>
        </div>
    </>;
}