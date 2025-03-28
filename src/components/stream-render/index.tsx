import { useState } from "react";
import { sleep } from "aio-tool";

import s from "./s";
import useIntersectionObserver from "@site/src/hooks/use-intersection-observer";
import useIncreasingRender from "@site/src/hooks/use-increasing-render";

export default function StreamRender() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const { promiseRef, remainRef, start, cancel } = useIncreasingRender({
        onContinue(value) {
            setContent((prev) => prev + value);
        },
    });
    const handleStart = async () => {
        if (loading) return;
        setLoading(true);
        start();
        for (const char of s) {
            if (promiseRef.current === "cancel") break;
            remainRef.current += char;
            await sleep(10);
        }
        setLoading(false);
    };

    const { targetRef, rootRef } = useIntersectionObserver<
        HTMLDivElement,
        HTMLDivElement
    >({
        rootOptions: {
            rootMargin: "50%",
        },
        onIntersecting(entries) {
            typeof promiseRef.current === "function" &&
                promiseRef.current(entries[0].target);
            promiseRef.current = "continue";
        },
        onDisIntersecting(entries) {
            promiseRef.current = "abort";
        },
    });

    // const contentObject = parseThinkContent(content);
    return (
        <>
            <button className={"border px-2"} onClick={handleStart}>
                start
            </button>
            <button
                className={"border px-2"}
                onClick={() => {
                    setContent("");
                    setLoading(false);
                    cancel();
                }}
            >
                reset
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
                className={
                    "h-[80px] overflow-y-scroll border rounded text-gray-600 p-4"
                }
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
