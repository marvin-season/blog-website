import { createContext, ReactNode, useContext } from "react";
import NotificationStrategy from "./strategy/notification";

const useStrategy = () => {
    return NotificationStrategy;
};

export default function HelperProvider({
    children,
}: {
    children: ReactNode;
}) {
    const strategy = useStrategy();
    const state = strategy.useInitStateAction();

    return (
        <HelperContext.Provider value={state}>
            {strategy.UI().render(state)}
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
