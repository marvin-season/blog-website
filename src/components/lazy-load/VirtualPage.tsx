import { useState } from "react";
import useVirtualScroll from "@site/src/components/lazy-load/useVirtualScroll";

export default function VirtualPage() {
    const [idKey, setIdKey] = useState(Date.now);
    return (
        <>
            <button className={"bg-green-400 rounded-lg px-2 py-0.5 text-white hover:bg-green-500 cursor-pointer"}
                    onClick={() => {
                        setIdKey(Date.now());
                    }}>Reset
            </button>
            <Vertical key={idKey} row={10000} startIndex={50} buffer={2} length={5} acceleration={2} />
        </>
    );
}


export const Vertical = ({ row = 1000000, startIndex = 0, length = 2, acceleration = 1, buffer = 1 }) => {
    const { rootRef, render, handleItemRef, rows, range } = useVirtualScroll({ row, startIndex, length, acceleration, buffer });
    return (
        <div>
            {/*<ul className={"h-[190px] overflow-y-scroll"}>*/}
            {/*    <li>row: {row}</li>*/}
            {/*    <li>startIndex: {range.startIndex}</li>*/}
            {/*    <li>end: {range.end}</li>*/}
            {/*    <li>acceleration: {acceleration}</li>*/}
            {/*    <li>buffer: {buffer}</li>*/}
            {/*    <li>rows: {JSON.stringify(rows)}</li>*/}
            {/*</ul>*/}
            <div className={"h-[200px] overflow-y-auto border"} ref={rootRef}>
                {
                    render(rows.map((item, index) => {
                        return (
                            <div
                                ref={handleItemRef}
                                className={"h-[30px] border border-gray-300"}
                                key={item}
                            >
                                {item}
                            </div>
                        );
                    }))
                }

            </div>
        </div>

    );
};
