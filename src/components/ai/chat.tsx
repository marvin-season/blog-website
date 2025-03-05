import useMessage from "./hooks/use-message";
import useHandle from "./hooks/use-handle";
import useChat from "./hooks/use-chat";
import useTask from "./hooks/use-task";

import { History } from "./components/history";
import { RichEditor } from "@site/src/components/rich-editor";
import "./polyfill";
import { useEffect } from "react";

export default function() {
    const { messages, appendMessage, removeMessage, createOrAppendContent } =
        useMessage();

    const { onRe, onCopy, onCite, setLoading, citeMessage, loading } =
        useHandle();

    const { send } = useChat();

    // 额外的任务处理，放在 队列中
    const { enqueue } = useTask();
    useEffect(() => {
        enqueue({
            id: "append_init_id1",
            invoke: () => {
                appendMessage({
                    id: "init_id1",
                    content: "shadow-lg p-4 border border-gray-200 rounded-lg",
                });
            },
        }).then(() => {
            console.log("append ok");
        });
        enqueue({
            id: "append_init_id2",
            invoke: () => {
                appendMessage({
                    id: "init_id2",
                    content: "bg-blue-400 text-white text-sm",
                });
            },
        }).then(() => {
            console.log("append ok");
        });

    }, []);

    return (
        <div className={"shadow-lg p-4 border border-gray-200 rounded-lg"}>
            <History
                citeMessage={citeMessage}
                messages={messages}
                onCite={onCite}
                onCopy={onCopy}
                onRe={async (message) => {
                    setLoading(true);
                    // remove old Message
                    removeMessage(message);
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync
                    await Array.fromAsync(onRe(message), createOrAppendContent);
                    setLoading(false);
                }}
            />
            {loading && <div>loading...</div>}
            <div>
                {citeMessage && (
                    <span className={"bg-blue-400 text-white text-sm"}>
                        {citeMessage.content}
                    </span>
                )}
            </div>
            <RichEditor
                onSend={async (value) => {
                    setLoading(true);
                    appendMessage({
                        id: Date.now().toString() + "user",
                        content: value,
                    });
                    try {
                        await Array.fromAsync(
                            send(value),
                            createOrAppendContent,
                        );
                    } catch (err) {
                        createOrAppendContent({
                            id: Date.now() + "error",
                            content: err.message,
                        });
                    } finally {
                        setLoading(false);
                    }
                }}
            />
        </div>
    );
}
