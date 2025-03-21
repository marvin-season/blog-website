import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createIntersectionObserver } from "aio-tool";

export interface VirtualScrollOptions<T> {
    originRows?: T[];
    startIndex?: number;
    length?: number;
    acceleration?: number;
    buffer?: number;
}

export interface VirtualScrollResult<T> {
    rootRef: React.RefObject<HTMLDivElement>;
    topTargetRef: React.RefObject<HTMLDivElement>;
    bottomTargetRef: React.RefObject<HTMLDivElement>;
    rows: T[];
    range: { startIndex: number; end: number };
    render: (children: ReactNode) => ReactNode;
    handleItemRef: (dom: HTMLDivElement) => void;
    devtoolsRender: () => ReactNode;
}

export default function useVirtualScroll<T>(options?: VirtualScrollOptions<T>): VirtualScrollResult<T> {
    const {
        originRows = [],
        startIndex = 10,
        length = 10,
        acceleration = 4,
        buffer = 1,
    } = options || {};

    const rootRef = useRef<HTMLDivElement>(null);
    const topTargetRef = useRef<HTMLDivElement>(null);
    const bottomTargetRef = useRef<HTMLDivElement>(null);

    const [range, setRange] = useState({
        startIndex: startIndex - acceleration + buffer,
        end: startIndex - acceleration + buffer + length,
    });
    const row = useMemo(() => {
        return originRows.length;
    }, [originRows]);

    const rows = useMemo(() => {
        const sliceStart = Math.max(0, range.startIndex - buffer);
        const sliceEnd = Math.min(range.end + buffer, row);
        return originRows.slice(sliceStart, sliceEnd);
    }, [originRows, range, buffer, row]);

    useEffect(() => {
        const observer = createIntersectionObserver({
            options: {
                root: rootRef.current,
                threshold: 1,
                rootMargin: "0px 0px 20px 0px",
            },
            targets: [topTargetRef.current, bottomTargetRef.current],
            onIntersecting: (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === topTargetRef.current) {
                        setRange((prev) => ({
                            startIndex: Math.max(0, prev.startIndex - acceleration),
                            end: prev.end,
                        }));
                    } else if (entry.target === bottomTargetRef.current) {
                        setRange((prev) => ({
                            startIndex: prev.startIndex,
                            end: Math.min(row, prev.end + acceleration),
                        }));
                    }
                });
            },
        });
        return () => {
            observer?.disconnect();
        };
    }, [acceleration, row]);

    const render = useCallback((children: ReactNode) =>{
        return <>
            <div
                ref={topTargetRef}
                className={"text-center text-sm text-gray-500"}
            >
                {range.end === row ? "暂无更多" : "下拉加载更多"}
            </div>
            {children}
            <div
                ref={bottomTargetRef}
                className={"text-center text-sm text-gray-500"}
            >
                {range.end === row ? "暂无更多" : "加载更多"}
            </div>
        </>
    }, [range, row])

    const handleItemRef = useCallback((dom: HTMLDivElement) => {
        if (dom) {
            // 滚动到顶部时，向上滚动
            if (range.startIndex !== 0 && dom.parentElement.scrollTop <= 0) {
                console.log("scroll", dom.clientHeight * acceleration, dom.clientHeight);
                const target = dom.parentElement.children.item(acceleration + 1);
                let top = 0;
                if(target) {
                    top = target.getBoundingClientRect().top - dom.parentElement.getBoundingClientRect().top
                } else {
                    top = dom.clientHeight * acceleration + topTargetRef.current.clientHeight
                }
                dom.parentElement.scrollTo({
                    top, //TODO: scroll at the first time is not correct
                });
            }
        }
    }, [range])

    const devtoolsRender = useCallback(() => {
        return <ul className={"h-[190px] overflow-y-scroll"}>
            <li>row: {row}</li>
            <li>startIndex: {range.startIndex}</li>
            <li>end: {range.end}</li>
            <li>acceleration: {acceleration}</li>
            <li>buffer: {buffer}</li>
            <li>rows: {JSON.stringify(rows)}</li>
        </ul>
    }, [row, range, acceleration, rows, buffer])

    return { rootRef, topTargetRef, bottomTargetRef, rows, range, render, handleItemRef, devtoolsRender };
}

