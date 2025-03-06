import { ReactNode, useState } from "react";
import { IStrategy } from "./index";

type Notification = {
    id: number;
    type: "warning" | "success" | "error";
    message: string;
    className: string;
};

// 提取 useInitState 方法的类型
type StateType = ReturnType<typeof useInitState>;
type ActionType = ReturnType<typeof useAction>;

function useAction(state: StateType) {
    const remove = (id: number) => {
        state.setNotifications((prev) => prev.filter((item) => item.id !== id));
    };
    const warning = (message: string) => {
        let id = (state.notifications.at(-1)?.id || 0) + 1;
        state.setNotifications((prev) => {
            id = (prev.at(-1)?.id || 0) + 1;
            return prev.concat({
                message,
                id,
                type: "warning",
                className: "bg-white shadow-sm border-gray-200",
            });
        });

        setTimeout(() => {
            remove(id);
        }, 6000);
    };
    return {
        remove,
        warning,
    };
}

function useInitState() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    return {
        setNotifications,
        notifications,
    };
}

function NotificationUI(props: StateType & ActionType): ReactNode {
    return props?.notifications.map((notification, index) => {
        return (
            <div
                key={notification.id}
                className={`${notification.className} min-w-[220px] min-h-[90px] cursor-pointer border rounded-lg px-2 py-0.5 fixed right-10`}
                style={{
                    top: 50 + 40 * (index + 1),
                }}
            >
                <span className={"text-sm"}>
                    {notification.message + notification.id}
                </span>

                <button
                    onClick={() => {
                        props.remove(notification.id);
                    }}
                >
                    close
                </button>
            </div>
        );
    });
}

const NotificationStrategy: IStrategy = {
    name: "notification",
    description: "notification desc",
    useAction,
    useInitState,
    useUI(state: StateType, action: ActionType) {
        return <NotificationUI {...state} {...action} />;
    },
};

export default NotificationStrategy;
