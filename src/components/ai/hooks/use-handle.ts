import { Message } from "../type";
import { useState } from "react";

export default function useHandle() {
    const [citeMessage, setCiteMessage] = useState<Message>();
    const [loading, setLoading] = useState(false);

    async function* onRe(message: Message) {
        for (const msg of message.content) {
            await new Promise((resolve) => setTimeout(resolve, 20));
            yield {
                id: message.id,
                content: msg,
            };
        }
    }

    function onCopy(message: Message) {
        if (isSecureContext) {
            navigator.clipboard.writeText(message.content).then(() => {
                alert("copied to clipboard");
            });
        }
        alert("拷贝失败");
    }

    function onCite(message: Message) {
        setCiteMessage((prev) => {
            if (prev?.id === message.id) {
                return undefined;
            }
            return message;
        });
    }

    return {
        onRe,
        onCopy,
        onCite,
        setLoading,
        loading,
        citeMessage,
    };
}
