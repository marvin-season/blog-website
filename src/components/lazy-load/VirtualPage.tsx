import { useEffect, useMemo, useRef, useState } from "react";
import { createIntersectionObserver } from 'aio-tool';
export default function VirtualPage() {
    const [row, setRow] = useState(100);
    return (
        <>
            <div>
                {"Vertical: "}
                {row}
            </div>
            <Vertical row={row} startIndex={50} buffer={0} length={8} acceleration={1}/>
        </>
    );
}


export const Vertical = ({ row = 1000000, startIndex = 0, length = 2, acceleration = 1, buffer = 1 }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const bottomTargetRef = useRef(null);
    const topTargetRef = useRef(null);

    const [range, setRange] = useState({
        startIndex,
        end: startIndex + length,
    });

    const rows = useMemo(() => {
        return new Array(row)
            .fill(0)
            .map((_, i) => i)
            .slice(Math.max(0, range.startIndex - buffer), Math.min(range.end + buffer, row));
    }, [row, range]);

    useEffect(() => {
        const observer = createIntersectionObserver({
            options: {
                root: rootRef.current,
                threshold: 1,
                rootMargin: "0px 0px 20px 0px",
            },
            targets: [bottomTargetRef.current, topTargetRef.current],
            onIntersecting: (entries) => {
                entries.forEach((entry) => {
                    console.log(entry);
                    if (entry.target === topTargetRef.current) {
                        setRange((prev) => {
                            return {
                                startIndex: Math.max(0, prev.startIndex - acceleration),
                                end: prev.end,
                            };
                        });
                    } else if (entry.target === bottomTargetRef.current) {
                        setRange((prev) => {
                            return {
                                startIndex: prev.startIndex,
                                end: Math.min(row, prev.end + acceleration),
                            };
                        });
                    }
                });
            },
        });
        return () => {
            observer?.disconnect();
        };
    }, []);

    return (
        <div className={"h-[200px] overflow-y-auto border"} ref={rootRef}>
            <div
                ref={topTargetRef}
                className={"text-center text-sm text-gray-500"}
            >
                {range.end === row ? "暂无更多" : "下拉加载更多"}
            </div>
            {rows.map((item, index) => {
                return (
                    <div
                        ref={dom => {
                            if(dom) {
                                // 滚动到顶部时，向上滚动
                                if(range.startIndex !== 0 && dom.parentElement.scrollTop <= 0) {
                                    console.log('scroll', dom)
                                    dom.parentElement.scrollTo({
                                        top: dom.clientHeight
                                    })
                                }
                            }
                        }}
                        className={"h-[100px] border border-gray-300"}
                        key={item}
                    >
                        {item}
                    </div>
                );
            })}

            <div
                ref={bottomTargetRef}
                className={"text-center text-sm text-gray-500"}
            >
                {range.end === row ? "暂无更多" : "加载更多"}
            </div>
        </div>
    );
};
