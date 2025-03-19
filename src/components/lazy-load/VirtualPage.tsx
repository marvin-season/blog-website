import { useEffect, useMemo, useRef, useState } from "react";
import { createIntersectionObserver } from 'aio-tool';
export default function VirtualPage() {
    const [idKey, setIdKey] = useState(Date.now);
    return (
        <>
            <button className={"bg-green-400 rounded-lg px-2 py-0.5 text-white hover:bg-green-500 cursor-pointer"} onClick={() => {
                setIdKey(Date.now())
            }}>Reset</button>
            <Vertical key={idKey} row={10000} startIndex={50} buffer={2} length={5} acceleration={2}/>
        </>
    );
}


export const Vertical = ({ row = 1000000, startIndex = 0, length = 2, acceleration = 1, buffer = 1 }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const bottomTargetRef = useRef(null);
    const topTargetRef = useRef(null);

    const [range, setRange] = useState({
        startIndex: startIndex - acceleration + buffer, // TODO: solve the problem of the first scroll
        end: startIndex - acceleration + buffer + length,
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
        <div>
            <ul className={"h-[190px] overflow-y-scroll"}>
                <li>row: {row}</li>
                <li>startIndex: {range.startIndex}</li>
                <li>end: {range.end}</li>
                <li>acceleration: {acceleration}</li>
                <li>buffer: {buffer}</li>
                <li>rows: {JSON.stringify(rows)}</li>
            </ul>
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
                                            top: dom.clientHeight * acceleration //TODO: scroll at the first time is not correct
                                        })
                                    }
                                }
                            }}
                            className={"h-[30px] border border-gray-300"}
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
        </div>

    );
};
