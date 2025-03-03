import {Message} from "../type";

export default function useChat() {
    async function* onRe(message: Message) {

        for (const msg of message.content) {
            await new Promise(resolve => setTimeout(resolve, 50));
            yield {
                id: message.id,
                content: msg
            }
        }
    }

    return {
        onRe
    }
}