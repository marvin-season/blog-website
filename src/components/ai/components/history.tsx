import {Message} from "../type";
import {memo} from "react";

interface HistoryProps {
    citeMessage?: Message
    onRe: (message: Message) => void;
    onCopy: (message: Message) => void
    onCite: (message: Message) => void
}

export function Historical({citeMessage, isLast, message, onCite, onCopy, onRe}: {
    message: Message;
    isLast: boolean
} & HistoryProps) {
    console.log(message.content)
    return <div
        className={`bg-white px-4 py-1.5  ${isLast ? 'border-0' : 'border-b'} cursor-pointer flex gap-2 text-blue-300 text-sm  hover:bg-gray-100`}>
        <span className={"text-gray-500"}>{message.content}</span>
        <span onClick={() => onRe(message)}>re</span>
        <span onClick={() => onCopy(message)}>cp</span>
        <span onClick={() => onCite(message)}>cite</span>
    </div>
}

const MemoHistorical = memo(Historical,
    (prevProps, nextProps) =>
        prevProps.message.content === nextProps.message.content && prevProps.citeMessage?.id === nextProps.citeMessage?.id)

export function History({messages, ...restProps}: { messages: Message[], } & HistoryProps) {
    if (!messages.length) {
        return <div className={'text-center text-green-400 text-lg'}>
            空空如也
        </div>
    }
    return <div className={'max-h-[160px] overflow-y-auto border border-gray-200 rounded-lg'}>
        {
            messages.map((message, index) => {
                return <MemoHistorical key={message.id} {...restProps} message={message}
                                       isLast={index === messages.length - 1}/>
            })
        }
    </div>
}