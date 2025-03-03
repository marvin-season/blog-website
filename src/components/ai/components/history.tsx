import {Message} from "../type";

export function History({messages, onRe, onCopy}:
                        {
                            messages: Message[],
                            onRe: (message: Message) => void;
                            onCopy: (message: Message) => void
                        }) {
    if (!messages.length) {
        return <>
            空空如也
        </>
    }
    return messages.map((message) => {
        return <div key={message.id} className={"cursor-pointer flex gap-2 text-blue-300 text-sm"}>
            <span className={"text-gray-500"}>{message.content}</span>
            <span onClick={() => onRe(message)}>re</span>
            <span onClick={() => onCopy(message)}>copy</span>
        </div>
    })
}