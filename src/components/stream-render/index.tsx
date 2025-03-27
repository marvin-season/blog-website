import { useEffect, useRef, useState } from "react";
import { createIntersectionObserver, sleep } from "aio-tool";

import s from './s';

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
            await sleep(10);
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
                    typeof promiseRef.current === "function" &&
                        promiseRef.current(entries[0].target);
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
            <div className={"text-gray-600 text-xs"}>
                <em>Note: 打开控制台检查正在输出的元素</em>
                <div className={"h-[150px] overflow-y-scroll border"}>
                    <em>Full String:</em>
                    {s}
                </div>

            </div>
            <div
                ref={rootRef}
                className={"h-[80px] overflow-y-scroll border rounded text-gray-600 p-4"}
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
