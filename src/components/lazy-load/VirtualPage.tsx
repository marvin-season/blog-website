import { ReactNode, useState } from "react";
import useVirtualScroll from "@site/src/components/lazy-load/useVirtualScroll";

export default function VirtualPage() {
    const [idKey, setIdKey] = useState(Date.now);
    return (
        <>
            <button
                className={
                    "bg-green-400 rounded-lg px-2 py-0.5 text-white hover:bg-green-500 cursor-pointer"
                }
                onClick={() => {
                    setIdKey(Date.now());
                }}
            >
                Reset
            </button>
            <Vertical key={idKey} />
        </>
    );
}

export const Vertical = () => {
    const originRows = Array.from({ length: 10000 }).map((_, i) => {
        return {
            id: i,
            renderItem: (handleItemRef: any) => (
                <div
                    ref={handleItemRef}
                    className={"h-[30px] border border-gray-300"}
                    key={i}
                >
                    {i}
                </div>
            ),
        };
    });
    const { rootRef, render, handleItemRef, rows, devtoolsRender } =
        useVirtualScroll<{
            id: number;
            renderItem: (handleItemRef: any) => ReactNode;
        }>({ originRows });

    return (
        <div>
            {devtoolsRender()}
            <div className={"h-[200px] overflow-y-auto border"} ref={rootRef}>
                {render(
                    rows.map((item, index) => {
                        return item.renderItem(handleItemRef);
                    }),
                )}
            </div>
        </div>
    );
};
