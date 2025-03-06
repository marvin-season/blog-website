import { createContext, ReactNode, useContext } from "react";
import NotificationStrategy from "./strategy/notification";

const useStrategy = () => {
    return NotificationStrategy;
};

export interface IStrategy {
    name: string;
    description: string;
    useInitState: () => Record<string, any>;
    useAction: (state: Record<string, any>) => Record<string, Function>;
    useUI: (
        state: Record<string, any>,
        action: Record<string, Function>,
    ) => ReactNode;
}

export default function HelperProvider({ children }: { children: ReactNode }) {
    const strategy = useStrategy();
    const state = strategy.useInitState();
    const action = strategy.useAction(state);
    console.log(action);
    return (
        <HelperContext.Provider value={action}>
            {strategy.useUI(state, action)}
            {children}
        </HelperContext.Provider>
    );
}

export const HelperContext = createContext<any>({
    notifications: [],
    remove(id: number): void {},
    warning(message: string): void {},
});

export function useHelper() {
    return useContext(HelperContext);
}
