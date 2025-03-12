import { useEffect, useRef, useState } from "react";

export default function App() {
    const [row, setRow] = useState(1000000);
    return <>
        <div>
            {"Vertical: "}
            {row}
        </div>
        <Vertical row={row} />
    </>;
}

export const Vertical = ({ row = 1000000 }) => {
    const rootRef = useRef(null);
    const intersectionObserverRef = useRef<IntersectionObserver>(null);
    const [pageCeil, setPageCeil] = useState(5);
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    useEffect(() => {
        console.log(count);
        intersectionObserverRef.current = new IntersectionObserver((entries, observer) => {
            if (entries.findIndex(item => item.isIntersecting) > -1) {
                setPageCeil(prev => {
                    if (prev + 1 >= countRef.current) {
                        return countRef.current;
                    }
                    return prev + 1;
                });
            }
        }, {
            root: rootRef.current,
        });
        setTimeout(() => {
            setCount(row);
            countRef.current = row;
        });

        return () => {
            intersectionObserverRef.current?.disconnect();
        };
    }, [row]);
    return <div className={"h-[300px] overflow-y-auto border"} ref={rootRef}>
        {
            new Array(count).fill(0).slice(0, pageCeil).map((_, index) => {
                return <div className={"h-[100px] border border-gray-300"} key={index} ref={(dom) => {
                    if (!dom) return;
                    if (index === pageCeil - 1) {
                        intersectionObserverRef.current?.observe(dom);
                    } else {
                        intersectionObserverRef.current?.unobserve(dom);
                    }
                }}>{index}</div>;
            })
        }
    </div>;
};