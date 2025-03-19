import { useEffect, useMemo, useRef, useState } from "react";

export default function VirtualPage() {
    const [row, setRow] = useState(10);
    return (
        <>
            <div>
                {"Vertical: "}
                {row}
            </div>
            <Vertical row={row} />
        </>
    );
}

function createIntersectionObserver({
                                        options,
                                        onIntersecting,
                                        targets = [],
                                        callback,
                                    }: {
    options: IntersectionObserverInit;
    targets: HTMLElement[];
    onIntersecting: (entries: IntersectionObserverEntry[]) => void;
    callback?: IntersectionObserverCallback;
}) {
    const observer = new IntersectionObserver((entries) => {
        const intersectionObserverEntries = entries.filter(
            (item) => item.isIntersecting,
        );
        if (intersectionObserverEntries.length > 0) {
            onIntersecting(intersectionObserverEntries);
        }
        callback && callback(entries, observer);
    }, options);

    targets.forEach((target) => {
        observer.observe(target);
    });

    return observer;
}

export const Vertical = ({ row = 1000000, startIndex = 3, length = 2, acceleration = 1, buffer = 1 }) => {
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

    console.log(rows);

    useEffect(() => {
        const observer = createIntersectionObserver({
            options: {
                root: rootRef.current,
                threshold: 1,
                rootMargin: "0px 0px 20px 0px",
            },
            targets: [bottomTargetRef.current, topTargetRef.current],
            onIntersecting: (entries) => {
                console.log(entries);
                entries.forEach((entry) => {
                    if (entry.target === topTargetRef.current) {
                        setRange((prev) => {
                            return {
                                startIndex: Math.max(0, prev.startIndex - acceleration),
                                end: prev.end,
                            };
                        });
                        // rootRef.current.scrollTo({
                        //     top: 100,
                        // });
                        console.log(rootRef.current.scrollTop);
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
