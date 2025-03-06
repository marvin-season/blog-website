import { ReactNode, useRef, useState } from "react";
import { IStrategy } from "./index";

type Modal = {
    id: number;
    type?: "primary";
    render: () => ReactNode;
    onBeforeConfirm: () => Promise<void> | void;
    className?: string;
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
        open: async ({ render, onBeforeConfirm }: Partial<Modal>) => {
            state.idRef.current++;
            state.setModals((prev) => {
                // async code
                return prev.concat({ id: state.idRef.current, render, onBeforeConfirm });
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
    return props?.modals.map((modal, index) => {
        // const [loading, setLoading] = useState(false);
        return (
            <div
                key={modal.id}
                className={`${modal.className} fixed w-[500px] min-h-[200px] translate-x-[-250px] translate-y-[-100px] left-[50%] top-[50%] 
                bg-[#fefefe] rounded-2xl shadow-2xl p-4 flex flex-col justify-between`}
            >
                <div className={"text-lg font-bold"}>这是标题 {modal.id}</div>
                <div className={"flex-1"}>{modal.render()}</div>
                <div className={"flex justify-end gap-2"}>
                    <button
                        onClick={() => {
                            props.close(modal.id);
                        }}
                    >
                        取消
                    </button>
                    <button
                        onClick={async () => {
                            // props.promiseRef.current?.(modal);
                            // setLoading(true)
                            await modal.onBeforeConfirm()
                            // setLoading(false)
                            props.close(modal.id);
                        }}
                    >
                        a
                        {/*{loading ? 'loading' : '确认'}*/}
                    </button>
                </div>
            </div>
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
