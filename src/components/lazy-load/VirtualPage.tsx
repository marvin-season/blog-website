import { useEffect, useMemo, useRef, useState } from "react";

export default function VirtualPage() {
    const [row, setRow] = useState(1000000);
    return (
        <>
            <div>
                {"Vertical: "}
                {row}
            </div>
            <Vertical row={row} startIndex={10} length={5} />
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

export const Vertical = ({ row = 1000000, startIndex = 0, length = 5, acceleration = 2 }) => {
    const rootRef = useRef(null);
    const bottomTargetRef = useRef(null);
    const topTargetRef = useRef(null);

    const [range, setRange] = useState({
        startIndex,
        endIndex: startIndex + length,
    });

    const rows = useMemo(() => {
        return new Array(row)
            .fill(0)
            .map((_, i) => i)
            .slice(range.startIndex, range.endIndex);
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
                            if (prev.startIndex - acceleration <= 0) {
                                return {
                                    startIndex: 0,
                                    endIndex: prev.endIndex,
                                };
                            }
                            return {
                                startIndex: prev.startIndex - acceleration,
                                endIndex: prev.endIndex,
                            };
                        });
                    } else if (entry.target === bottomTargetRef.current) {
                        setRange((prev) => {
                            if (prev.startIndex + acceleration >= row) {
                                return {
                                    startIndex: row,
                                    endIndex: prev.endIndex,
                                };
                            }
                            return {
                                startIndex: prev.startIndex,
                                endIndex: prev.endIndex + acceleration,
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
                {range.endIndex === row ? "暂无更多" : "下拉加载更多"}
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
                {range.endIndex === row ? "暂无更多" : "加载更多"}
            </div>
        </div>
    );
};
