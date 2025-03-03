import {Message} from "../type";

export function History({messages, citeMessage, onRe, onCopy, onCite}:
                        {
                            messages: Message[],
                            citeMessage?: Message
                            onRe: (message: Message) => void;
                            onCopy: (message: Message) => void
                            onCite: (message: Message) => void
                        }) {
    if (!messages.length) {
        return <>
            空空如也
        </>
    }
    return messages.map((message) => {
        return <div key={message.id} className={`cursor-pointer flex gap-2 text-blue-300 text-sm ${citeMessage?.id === message.id && 'bg-blue-200 text-white'}`}>
            <span className={"text-gray-500"}>{message.content}</span>
            <span onClick={() => onRe(message)}>re</span>
            <span onClick={() => onCopy(message)}>cp</span>
            <span onClick={() => onCite(message)}>cite</span>
        </div>
    })
}