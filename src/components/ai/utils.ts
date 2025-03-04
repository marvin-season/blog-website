export const textDecoder = new TextDecoder()
export const textEncoder = new TextEncoder();

export async function sleep(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export async function* SSEMessageGenerator<T>(stream: ReadableStream) {
    if (!stream) {
        return
    }
    // @ts-ignore ReadableStream is not iterable in typescript
    // for await (const chunk of stream) {}
    let rest_str = ""
    const reader = stream.getReader();
    while (true) {
        const {done, value} = await reader.read()
        if (done) {
            break
        }

        const sse_chunk = textDecoder.decode(value);
        for (const line of sse_chunk.split(/\n+/)) {
            const json_str = line.replace(/data:\s*/, '').trim();
            if (json_str.length > 0) {
                try {
                    const message = JSON.parse(rest_str + json_str);
                    rest_str = "";
                    yield message as T; // 在生成器内yield消息
                } catch (e) {
                    rest_str += json_str
                    console.warn(e)
                }
            }

        }
    }

}

// 创建一个符合 SSE 格式的 ReadableStream
export function createMockStream(data: string) {
    const id = Date.now()
    return new ReadableStream({
        async start(controller) {
            for (const chunk of data.split(/\s+/)) {
                const line = `data: ${JSON.stringify({
                    id,
                    text: chunk + " ",
                })}`
                controller.enqueue(textEncoder.encode(line));
                await sleep(50);
            }
            controller.close(); // 结束流
        }
    });
}