

// 联合类型
interface AIOutputProps {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
};
export default function AIOutput({ messages }: AIOutputProps) {
    return <>
        {
            messages.map((message, index) => {
                return <div key={index}>
                    <span>{message.role}:</span>
                    <span>{message.content}</span>
                </div>
            })
        }

    </>
}