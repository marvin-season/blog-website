import {createMockStream, SSEMessageGenerator} from "@site/src/components/ai/utils";

export default function useChat() {
    async function* send(value: string, {} = {}) {
        // will be replaced fetch response
        const stream = createMockStream("hello! i am GPT chat bot!");

        for await (const message of SSEMessageGenerator<{
            id: string;
            text: string;
        }>(stream)) yield {...message, content: message.text};
    }

    return {
        send
    }
}