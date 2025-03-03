import useMessage from "./hooks/use-message";
import useChat from "./hooks/use-chat";
import {History} from "./components/history";

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
        <div>
            {citeMessage && <span className={"bg-blue-200 text-white"}>{citeMessage.content}</span>}
        </div>
        <div>
            <button className={"px-2.5 py-0.5 border rounded text-blue-400 hover:text-blue-500 cursor-pointer"}
                    onClick={() => {
                        appendMessage({
                            id: Date.now().toString(),
                            content: Date.now().toString()
                        })
                    }}>
                {loading ? '加载中' : '添加'}
            </button>
        </div>
    </div>
}