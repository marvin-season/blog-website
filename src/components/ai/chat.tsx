import useMessage from "./hooks/use-message";
import useHandle from "./hooks/use-handle";
import useChat from "./hooks/use-chat";
import useInit from "./hooks/use-init";
import useTask from "./hooks/use-task";

import { History } from "./components/history";
import { RichEditor } from "@site/src/components/rich-editor";
import "./polyfill";

export default function() {
    const { messages, appendMessage, removeMessage, createOrAppendContent } =
        useMessage();

    const { onRe, onCopy, onCite, setLoading, citeMessage, loading } =
        useHandle();

    const { send } = useChat();

    // 初始化任务，考虑放入 任务队列中
    useInit({ appendMessage });

    // 额外的任务处理，放在 队列中
    useTask();

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
                        const it = send(value);
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
