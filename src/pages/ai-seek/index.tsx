import Layout from "@theme/Layout";
import { RichEditor } from "@site/src/components/rich-editor";
import {
    History,
    useChat,
    useHandle,
    useMessage,
} from "@site/src/components/ai";

export default function AI() {
    const { messages, appendMessage, removeMessage, createOrAppendContent } =
        useMessage();

    const { onRe, onCopy, onCite, setLoading, citeMessage, loading } =
        useHandle();

    const { send } = useChat();
    return (
        <Layout
            wrapperClassName={"flex-shrink-0  h-[calc(100vh-64px)]"}
            title={`AI Helper`}
            description="Personal Information"
        >
            <div
                className={
                    "shadow-lg p-4 border border-gray-200 rounded-lg h-full flex flex-col justify-end"
                }
            >
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
                        await Array.fromAsync(
                            onRe(message),
                            createOrAppendContent,
                        );
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
        </Layout>
    );
}
