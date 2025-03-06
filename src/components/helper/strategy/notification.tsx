import { useState } from "react";

type Notification = {
    id: number;
    type: "warning" | "success" | "error";
    message: string;
    className: string;
};

// 提取 useInitStateAction 方法的类型
type StateType = ReturnType<typeof useInitStateAction>;

function useInitStateAction() {
    const remove = (id: number) => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const warning = (message: string) => {
        const id = (notifications.at(-1)?.id || 0) + 1;
        setNotifications((prev) =>
            prev.concat({
                message,
                id,
                type: "warning",
                className: "bg-white shadow-sm border-gray-200",
            }),
        );

        setTimeout(() => {
            remove(id);
        }, 6000);
    };

    return {
        remove,
        warning,
        notifications,
    };
}

function NotificationUI(state: StateType) {
    return state?.notifications.map((notification, index) => {
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
                        state.remove(notification.id);
                    }}
                >
                    close
                </button>
            </div>
        );
    });
}

const NotificationStrategy = {
    useInitStateAction,
    UI() {
        return {
            render(state: StateType) {
                return <NotificationUI {...state} />;
            },
        };
    },
};

export default NotificationStrategy;
