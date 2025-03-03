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
        onRe
    } = useChat()

    return <div className={'shadow-lg p-4 border border-gray-200 rounded-lg'}>
        <History messages={messages} onRe={async (message) => {
            // remove old Message
            removeMessage(message);
            for await (const msg of onRe(message)) {
                createOrAppendContent(msg)
            }
        }}/>
        <div>
            <button className={"px-2.5 py-0.5 border rounded text-blue-400 hover:text-blue-500 cursor-pointer"}
                    onClick={() => {
                        appendMessage({
                            id: Date.now().toString(),
                            content: Date.now().toString()
                        })
                    }}>添加
            </button>
        </div>
    </div>
}