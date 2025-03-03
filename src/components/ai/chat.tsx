import useMessage from "./hooks/use-message";
import useChat from "./hooks/use-chat";
import {History} from "./components/history";
import {RichEditor} from "@site/src/components/rich-editor";

export default function () {
    const {
        messages,
        appendMessage,
        removeMessage,
        createOrAppendContent
    } = useMessage();

    const {
        onRe,
        onCopy,
        onCite,
        setLoading,
        citeMessage,
        loading
    } = useChat()

    return <div className={'shadow-lg p-4 border border-gray-200 rounded-lg'}>
        <History
            citeMessage={citeMessage}
            messages={messages}
            onCite={onCite}
            onCopy={onCopy}
            onRe={async (message) => {
                setLoading(true)
                // remove old Message
                removeMessage(message);
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync
                // @ts-ignore
                await Array.fromAsync(onRe(message), createOrAppendContent)
                setLoading(false)
            }}/>
        {loading && <div>loading...</div>}
        <div>
            {citeMessage && <span className={"bg-blue-200 text-white"}>{citeMessage.content}</span>}
        </div>
        <RichEditor onSend={value => {
            setLoading(true);
            appendMessage({
                id: Date.now().toString(),
                content: value
            })
        }}/>
    </div>
}