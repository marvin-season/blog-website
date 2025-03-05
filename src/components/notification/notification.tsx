import { createContext, ReactNode, useState } from "react";

type Notification = {
    id: number;
    type: "warning" | "success" | "error";
    message: string;
    className: string;
};

const useContextValue = () => {
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
                className: "text-yellow-400",
            }),
        );

        setTimeout(() => {
            remove(id);
        }, 3000);
    };
    return {
        warning,
        notifications,
        remove,
    };
};

export default function NotificationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const value = useContextValue();

    return (
        <NotificationContext.Provider value={value}>
            {value.notifications.map((notification, index) => {
                return (
                    <div
                        key={notification.id}
                        className={`${notification.className} border fixed right-10`}
                        style={{
                            top: 50 + 40 * (index + 1),
                        }}
                    >
                        <span>{notification.message + notification.id}</span>

                        <button
                            onClick={() => {
                                value.remove(notification.id);
                            }}
                        >
                            close
                        </button>
                    </div>
                );
            })}

            {children}
        </NotificationContext.Provider>
    );
}

export const NotificationContext = createContext<
    ReturnType<typeof useContextValue>
>({
    notifications: [],
    remove(id: number): void {},
    warning(message: string): void {},
});
