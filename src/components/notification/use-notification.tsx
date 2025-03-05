import { useContext } from "react";
import { NotificationContext } from "./notification";

export default function useNotification() {
    return useContext(NotificationContext);
}
