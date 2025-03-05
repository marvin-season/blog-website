import { createContext, ReactNode } from "react";
import NotificationStrategy from "./strategy/notification";

const useStrategy = () => {
    return NotificationStrategy;
};

const useContextValue = () => {
    return useStrategy();
};

export default function NotificationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const strategy = useContextValue();
    const state = strategy.useInitStateAction();
    console.log('ui',strategy.UI())
    return (
        <NotificationContext.Provider value={state}>
            {strategy.UI().render(state)}
            {children}
        </NotificationContext.Provider>
    );
}

export const NotificationContext = createContext<any>({
    notifications: [],
    remove(id: number): void {},
    warning(message: string): void {},
});
