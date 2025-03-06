import React, { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";

type Confirm = {
    id?: number;
    type?: "primary";
    render: () => ReactNode;
    onBeforeConfirm?: () => Promise<void> | void;
    onConfirm?: () => Promise<void> | void;
    className?: string;
};

function useInitState() {
    const idRef = useRef(0);
    const [modals, setModals] = useState<Confirm[]>([]);

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
        open: async (confirm: Confirm, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            const target = e.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            console.log('Element position:', rect);
            state.idRef.current++;
            state.setModals((prev) => {
                // async code
                return prev.concat({ ...confirm, id: state.idRef.current });
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

    return props?.modals.map((confirm, index) => {
        return (
            <div key={confirm.id} className={"fixed inset-0 z-999 backdrop-blur flex items-center justify-center"} onClick={() => {
                props.close(confirm.id)
            }}>
                <div key={confirm.id} className={`fixed w-[500px] min-h-[200px] z-999
                bg-[#fefefe] border border-gray-200 rounded-2xl shadow-2xl p-4 flex flex-col justify-between ${confirm.className}`}
                     onClick={e => {
                         e.stopPropagation()
                     }}
                >
                    <div className={"text-lg font-bold"}>这是标题 {confirm.id}</div>
                    <div className={"flex-1"}>{confirm.render()}</div>
                    <div className={"flex justify-end gap-2"}>
                        <button
                            className={'cursor-pointer rounded border px-2.5 py-1.5 text-[#222] leading-4 text-sm'}
                            onClick={() => {
                                props.close(confirm.id);
                            }}
                        >
                            取消
                        </button>
                        <button
                            className={'cursor-pointer rounded bg-blue-500 hover:bg-blue-600 px-2.5 py-1.5 text-white leading-4 text-sm'}
                            onClick={async () => {
                                setLoading(true);
                                try {
                                    await confirm.onBeforeConfirm?.();
                                    props.close(confirm.id);
                                    await confirm.onConfirm?.();
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
            </div>

        );
    });
}

const ConfirmStrategy: IStrategy<StateType, ActionType> = {
    name: "confirm",
    description: "Confirm desc",
    useAction,
    useInitState,
    useUI(state: StateType, action: ActionType) {
        return <ModalUI {...state} {...action} />;
    },
};

export default ConfirmStrategy;
