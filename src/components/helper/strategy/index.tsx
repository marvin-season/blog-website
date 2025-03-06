import NotificationStrategy from "./notification";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

export interface IStrategy {
    name: "notification" | "modal" | "confirm";
    description: string;
    useInitState: () => Record<string, any>;
    useAction: (state: Record<string, any>) => Record<string, Function>;
    useUI: (
        state: Record<string, any>,
        action: Record<string, Function>,
    ) => ReactNode;
}

export function Strategy(
    item: IStrategy & {
        setActionContext: Dispatch<SetStateAction<Record<string, any>>>;
    },
) {
    const state = item.useInitState();
    const action = item.useAction(state);

    useEffect(() => {
        item.setActionContext((prev) => {
            if (prev[item.name]) {
                return prev;
            }
            prev[item.name] = action;
            return prev;
        });
    }, []);

    return item.useUI(state, action);
}

export const useStrategies = () => {
    return [NotificationStrategy];
};
