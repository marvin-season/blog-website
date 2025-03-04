import { useState } from "react";
import { Message } from "../type";
import { useLatest } from "ahooks";

const useMessage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = useLatest(messages);

    /** useCallback is not necessary in react 19 */
    function appendMessage(message: Message) {
        setMessages((prev) => prev.concat(message));
    }

    function removeMessage(message: Message) {
        setMessages((prev) => prev.filter((msg) => msg.id !== message.id));
    }

    function appendMessageContent(message: Message) {
        setMessages((prev) =>
            prev.map((item) => {
                if (item.id === message.id) {
                    return {
                        ...item,
                        content: item.content + message.content,
                    };
                }
                return item;
            }),
        );
    }

    function createOrAppendContent(message: Message) {
        if (
            messagesRef.current.findIndex((item) => item.id === message.id) > -1
        ) {
            appendMessageContent(message);
        } else {
            appendMessage(message);
        }
    }

    function getMessages() {
        return messages;
    }

    return {
        messages,
        appendMessage,
        getMessages,
        removeMessage,
        createOrAppendContent,
    };
};
export default useMessage;
