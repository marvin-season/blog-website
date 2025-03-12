import { useEffect, useRef, useState } from "react";

export default function App() {
    const [row, setRow] = useState(10);
    return <>
        <Layout />
        <div>
            {"Vertical: "}
            {row}
        </div>
        <Vertical row={row} />
    </>;
}

/**
 * 一定宽度后自动换行
 * @constructor
 */
function Layout() {
    return <>
        <div className={"flex justify-between w-1/3 flex-wrap border"}>
            <div className={"min-h-[24px] flex-1 border max-w-[100%]"}>
                <div contentEditable={true} className={"w-auto"}></div>
            </div>
            <div className={"flex ml-auto"}>
                <div>@</div>
                <div>#</div>
            </div>
        </div>
    </>;
}

export const Vertical = ({ row = 1000000 }) => {
    const rootRef = useRef(null);
    const anchorRef = useRef(null);

    const [pageCeil, setPageCeil] = useState(5);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            if (entries.findIndex(item => item.isIntersecting) > -1) {
                setPageCeil(prev => {
                    if (prev + 1 >= row) {
                        return row;
                    }
                    return prev + 1;
                });
            }
        }, {
            root: rootRef.current,
        });
        if (anchorRef.current) {
            observer.observe(anchorRef.current);
        }
        return () => {
            observer?.disconnect();
        };
    }, []);

    return <div className={"h-[300px] overflow-y-auto border"} ref={rootRef}>
        {
            new Array(row).fill(0).slice(0, pageCeil).map((_, index) => {
                return <div className={"h-[100px] border border-gray-300"} key={index}>{index}</div>;
            })
        }

        <div ref={anchorRef} className={"text-center text-sm text-gray-500"}>
            {
                pageCeil === row ? "暂无更多" : "加载更多"
            }

        </div>
    </div>;
};