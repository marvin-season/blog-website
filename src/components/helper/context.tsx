import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import NotificationStrategy from "./strategy/notification";

const useStrategies = () => {
    return [NotificationStrategy];
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

function Strategy(
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

export default function HelperProvider({ children }: { children: ReactNode }) {
    const strategies = useStrategies();
    const [actionContext, setActionContext] = useState({});

    return (
        <HelperContext.Provider value={actionContext}>
            {strategies.map((item) => {
                return (
                    <Strategy
                        key={item.name}
                        {...item}
                        setActionContext={setActionContext}
                    />
                );
            })}
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
