import { Message } from "../type";
import { useEffect } from "react";

const useInit = (
    {
        appendMessage,
    }: {
        appendMessage: (message: Message) => void,
    }) => {


    useEffect(() => {
        appendMessage({
            id: "init_id",
            content: "这是一段初始化的消息，用于模拟填充",
        });
    }, []);
};
export default useInit;