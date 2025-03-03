import {Message} from "../type";

export default function useChat() {
    async function* onRe(message: Message) {

        for (const msg of message.content) {
            await new Promise(resolve => setTimeout(resolve, 20));
            yield {
                id: message.id,
                content: msg
            }
        }
    }
    
    function onCopy(message: Message) {
        navigator.clipboard.writeText(message.content).then(() => {
            alert('copied to clipboard')
        });
    }

    return {
        onRe,
        onCopy
    }
}