

// 联合类型
interface AIOutputProps {
    messages: Array<{ role: 'user' | 'assistant'; content: string; attachments?: any[] }>;
};
export default function AIOutput({ messages }: AIOutputProps) {
    return <>
        {
            messages.map((message, index) => {
                return <div key={index}>
                    <span>{message.role}:</span>
                    <span>{message.content}</span>
                    <span> refers: {message.attachments?.map((item, index) => <span key={index}>{item.label}</span>)}</span>
                </div>
            })
        }

    </>
}