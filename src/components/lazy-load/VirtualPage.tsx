import { useEffect, useRef, useState } from "react";

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
    callback
}: {
    options: IntersectionObserverInit;
    targets: HTMLElement[];
    onIntersecting: (entries: IntersectionObserverEntry[]) => void;
    callback?: IntersectionObserverCallback
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

export const Vertical = ({ row = 1000000 }) => {
    const rootRef = useRef(null);
    const anchorRef = useRef(null);

    const [pageCeil, setPageCeil] = useState(5);

    useEffect(() => {
        const observer = createIntersectionObserver({
            options: {
                root: rootRef.current,
            },
            targets: [anchorRef.current],
            onIntersecting: (entries) => {
                setPageCeil((prev) => {
                    if (prev + 1 >= row) {
                        return row;
                    }
                    return prev + 1;
                });
            },
        });
        return () => {
            observer?.disconnect();
        };
    }, []);

    return (
        <div className={"h-[200px] overflow-y-auto border"} ref={rootRef}>
            {new Array(row)
                .fill(0)
                .slice(0, pageCeil)
                .map((_, index) => {
                    return (
                        <div
                            className={"h-[50px] border border-gray-300"}
                            key={index}
                        >
                            {index}
                        </div>
                    );
                })}

            <div
                ref={anchorRef}
                className={"text-center text-sm text-gray-500"}
            >
                {pageCeil === row ? "暂无更多" : "加载更多"}
            </div>
        </div>
    );
};
