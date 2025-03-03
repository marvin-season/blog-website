export const textDecoder = new TextDecoder()
export const textEncoder = new TextEncoder();

export async function* SSEMessageGenerator<T>(stream: ReadableStream) {
    if (!stream) {
        return
    }

    // @ts-ignore ReadableStream is not iterable in typescript
    for await (const chunk of stream) {
        const sse_chunk = textDecoder.decode(chunk); // may be multi-line
        let rest_str = ""
        // 使用for...of 替代 forEach，确保yield在生成器体内
        for (const line of sse_chunk.split(/\n+/)) {
            const json_str = line.replace(/data:\s*/, '').trim();
            if (json_str.length > 0) {
                try {
                    const message = JSON.parse(rest_str + json_str);
                    rest_str = "";
                    yield message as T; // 在生成器内yield消息
                } catch (e) {
                    rest_str += json_str
                    console.log("e => ", {e, rest_str});
                }
            }

        }

    }
}

// 创建一个符合 SSE 格式的 ReadableStream
export function createMockStream(data: string) {
    return new ReadableStream({
        start(controller) {
            const id = Date.now()
            for (const chunk of data.split(/\s+/)) {
                const line = `data: ${JSON.stringify({
                    id,
                    text: chunk,
                })}`
                controller.enqueue(textEncoder.encode(line));
            }
            controller.close(); // 结束流
        }
    });
}