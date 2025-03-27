import { useEffect, useRef, useState } from "react";
import { createIntersectionObserver, sleep } from "aio-tool";

const s: string = `<think>The central idea of React's API is to think of updates as if they cause the entire app to re-render. This allows the developer to reason declaratively, rather than worry about how to efficiently transition the app from any particular state to another (A to B, B to C, C to A, and so on).

Actually re-rendering the entire app on each change only works for the most trivial apps; in a real-world app, it's prohibitively costly in terms of performance. React has optimizations which create the appearance of whole app re-rendering while maintaining great performance. The bulk of these optimizations are part of a process called reconciliation.

Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM." A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via setState), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.`;
export default function StreamRender() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const promiseRef = useRef<any>("");
    const remainRef = useRef<string>("");
    const start = async () => {
        if (loading) return;
        setLoading(true);
        promiseRef.current = "continue";
        consumer().then();
        for (const char of s) {
            if (promiseRef.current === "cancel") break;
            remainRef.current += char;
            await sleep(20);
        }
        setLoading(false);
    };

    const consumer = async () => {
        if (promiseRef.current === "continue") {
            setContent((prev) => {
                const result = prev + remainRef.current;
                remainRef.current = "";
                return result;
            });
        } else if (promiseRef.current === "abort") {
            await new Promise((resolve) => {
                promiseRef.current = (node: any) => {
                    console.log(node);
                    resolve(true);
                };
            });
        }
        requestAnimationFrame(consumer);
    };

    const targetRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = createIntersectionObserver({
            targets: [targetRef.current],
            options: {
                root: rootRef.current,
                rootMargin: "50%",
            },
            onIntersecting: () => {},
            callback: (entries) => {
                if (entries[0].isIntersecting) {
                    console.log("continue");
                    typeof promiseRef.current === "function" &&
                        promiseRef.current(entries[0].target);
                    promiseRef.current = "continue";
                } else {
                    console.log("abort");
                    promiseRef.current = "abort";
                }
            },
        });

        return () => {
            observer.disconnect();
        };
    }, []);
    // const contentObject = parseThinkContent(content);
    return (
        <>
            <button className={"border px-2"} onClick={start}>
                start
            </button>
            <button
                className={"border px-2"}
                onClick={() => {
                    setContent("");
                    setLoading(false);
                    promiseRef.current = "cancel";
                }}
            >
                clean
            </button>
            <div className={"text-gray-600 p-4 text-xs"}>
                <em>Note: 打开控制台检查正在输出的元素</em>
                <div>
                    <em>Full String:</em>
                    {s}
                </div>

            </div>
            <div
                ref={rootRef}
                className={"h-[50px] overflow-y-scroll border rounded text-gray-600 p-4"}
            >
                {/*<div className={"text-sm text-gray-500"}>{contentObject.think_content}</div>*/}
                <div>
                    {content.match(/.{1,50}/g)?.map((item, index) => {
                        return <span key={index}>{item}</span>;
                    })}
                </div>
                <div ref={targetRef}></div>
            </div>
        </>
    );
}
