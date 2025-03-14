import { createMockStream, SSEMessageGenerator } from "aio-tool";

export default function useChat() {
    async function* send(value: string, {} = {}) {
        // will be replaced fetch response
        const stream = createMockStream("Hello! I am GPT chat bot!");

        for await (const message of SSEMessageGenerator<{
            id: string;
            text: string;
        }>(stream))
            yield { ...message, content: message.text };
    }

    return {
        send,
    };
}
