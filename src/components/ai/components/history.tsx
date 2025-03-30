import { Message } from "../type";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash-es";

interface HistoryProps {
    citeMessage?: Message;
    onRe: (message: Message) => void;
    onCopy: (message: Message) => void;
    onCite: (message: Message) => void;
}

export function Historical({
    citeMessage,
    isLast,
    message,
    onCite,
    onCopy,
    onRe,
}: {
    message: Message;
    isLast: boolean;
} & HistoryProps) {
    console.log(message.content);
    return (
        <div
            className={`bg-white px-4 py-1.5  ${isLast ? "border-0" : "border-b"} cursor-pointer flex gap-2 text-blue-300 text-sm  hover:bg-gray-100`}
        >
            <span className={"text-gray-500"}>{message.content}</span>
            <span onClick={() => onRe(message)}>re</span>
            <span onClick={() => onCopy(message)}>cp</span>
            <span onClick={() => onCite(message)}>cite</span>
        </div>
    );
}

const MemoHistorical = memo(
    Historical,
    (prevProps, nextProps) =>
        prevProps.message.content === nextProps.message.content &&
        prevProps.citeMessage?.id === nextProps.citeMessage?.id,
);

export function History({
    messages,
    ...restProps
}: { messages: Message[] } & HistoryProps) {
    const [isAtBottom, setIsAtBottom] = useState(true);
    const containerRef = useRef(null);
    const anchorRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                setIsAtBottom(!!entries[0]?.isIntersecting);
            },
            {
                root: containerRef.current,
                rootMargin: "30px",
            },
        );
        if (anchorRef.current) {
            observer.observe(anchorRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [containerRef, anchorRef]);

    const scrollToBottom = useCallback(
        debounce(
            () => {
                containerRef.current.scrollTo({
                    top: containerRef.current.scrollHeight,
                    behavior: "smooth",
                });
            },
            50,
            {
                leading: true,
            },
        ),
        [containerRef],
    );

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        isAtBottom && scrollToBottom();
    }, [messages]);

    return (
        <div
            ref={containerRef}
            className={
                "relative h-[200px] overflow-y-auto border border-gray-200 rounded-lg"
            }
        >
            {messages.map((message, index) => {
                return (
                    <MemoHistorical
                        key={message.id}
                        {...restProps}
                        message={message}
                        isLast={index === messages.length - 1}
                    />
                );
            })}
            {!isAtBottom && (
                <div
                    className={
                        "sticky bottom-0 left-[50%] text-center bg-[#0002] backdrop-blur-sm: cursor-pointer"
                    }
                >
                    <span onClick={scrollToBottom}>DOWN</span>
                </div>
            )}
            <div ref={anchorRef}></div>
        </div>
    );
}
