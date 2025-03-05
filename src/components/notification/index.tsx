import NotificationProvider from "./notification";
import UseCase from "./use-case";

export { default as Notification } from "./notification";

export const App = () => {
    return (
        <NotificationProvider>
            <UseCase />
        </NotificationProvider>
    );
};
