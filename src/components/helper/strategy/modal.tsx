import React, { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css"; // 过渡动画
type Modal = {
    id?: number;
    type?: "primary";
    render: () => ReactNode;
    onBeforeConfirm?: () => Promise<void> | void;
    onConfirm?: () => Promise<void> | void;
    className?: string;
    target?: React.RefObject<Element> | Element | null;
};

function useInitState() {
    const idRef = useRef(0);
    const [modals, setModals] = useState<Modal[]>([]);

    return {
        idRef,
        modals,
        setModals,
    };
}

// 提取 useInitState 方法的类型
export type StateType = ReturnType<typeof useInitState>;
export type ActionType = ReturnType<typeof useAction>;

function useAction(state: StateType) {
    return {
        open: async (modal: Modal) => {
            state.idRef.current++;
            state.setModals((prev) => {
                // async code
                return prev.concat({
                    target: document.activeElement,
                    id: state.idRef.current,
                    ...modal,
                });
            });
            return {
                id: state.idRef.current,
            };
        },
        close: (id: number) => {
            state.setModals((prev) => prev.filter((item) => item.id !== id));
        },
    };
}

function ModalUI(props: StateType & ActionType): ReactNode {
    // only one
    const [loading, setLoading] = useState(false);

    return props?.modals.map((modal, index) => {
        console.log('modal', modal);
        return (
            <Tippy
                key={modal.id}
                animation="scale"
                className="backdrop-blur bg-[#fffa] backdrop-opacity-80 p-2 rounded-lg shadow-2xl text-sm min-w-[300px] lg:min-w-[800px] md:min-w-[500px] sm:min-w-[260px]"
                content={
                    <div className={`min-h-[200px] flex flex-col justify-between ${modal.className}`}>
                        <div className={"text-lg font-bold"}>
                            这是标题 {modal.id}
                        </div>
                        <div className={"flex-grow-1 flex-shrink-0"}>{modal.render()}</div>
                        <div className={"flex justify-end gap-2"}>
                            <button
                                className={
                                    "cursor-pointer rounded border px-2.5 py-1.5 text-[#222] leading-4 text-sm"
                                }
                                onClick={() => {
                                    props.close(modal.id);
                                }}
                            >
                                取消
                            </button>
                            <button
                                className={
                                    "cursor-pointer rounded bg-blue-500 hover:bg-blue-600 px-2.5 py-1.5 text-white leading-4 text-sm"
                                }
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        await modal.onBeforeConfirm?.();
                                        props.close(modal.id);
                                        await modal.onConfirm?.();
                                    } catch (e) {
                                        console.error(e);
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                {loading ? "loading" : "确认"}
                            </button>
                        </div>
                    </div>
                }
                interactive
                reference={modal.target}
                placement={"top-start"} // 将弹窗位置设置为底部
                visible={!!modal}
                onClickOutside={() => {
                    props.close(modal.id);
                }} // 点击外部关闭弹窗
            />
            // <div
            //     key={modal.id}
            //     className={
            //         "fixed inset-0 z-999 backdrop-blur flex items-center justify-center"
            //     }
            //     onClick={() => {
            //         props.close(modal.id);
            //     }}
            // >
            //     <div
            //         key={modal.id}
            //         className={`fixed w-[500px] min-h-[200px] z-999
            //     bg-[#fefefe] border border-gray-200 rounded-2xl shadow-2xl p-4 flex flex-col justify-between ${modal.className}`}
            //         onClick={(e) => {
            //             e.stopPropagation();
            //         }}
            //     >
            //
            //     </div>
            // </div>
        );
    });
}

const ModalStrategy: IStrategy<StateType, ActionType> = {
    name: "modal",
    description: "Modal desc",
    useAction,
    useInitState,
    useUI(state: StateType, action: ActionType) {
        return <ModalUI {...state} {...action} />;
    },
};

export default ModalStrategy;
