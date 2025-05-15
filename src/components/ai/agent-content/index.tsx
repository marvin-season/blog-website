import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'
import { createMockStream, sleep } from 'aio-tool'
import { useEffect, useMemo, useRef, useState } from 'react'
import Agent from './Agent'

type Props = {}

type ContentType = { id: string; text: string; type?: 'agent' }

const source = `
# Hello, *world*!
This is a simple markdown example using **react-markdown**.

<agent data-status="loading"></agent>
<agent data-status="loading"></agent>
`

const components: Components & {
    agent?: React.ElementType
} = {
    agent: ({ node, ...props }) => <Agent {...props} />,
}

export default function ReactMarkdownTest({ }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState<ContentType[]>([]);
    const contentValue = useMemo(() => contents.map(c => c.text).join('\n'), [contents]);
    const handleStream = async () => {
        const stream = createMockStream(source, /\n/);
        // @ts-ignore
        for await (const element of stream) {
            const id = crypto.randomUUID();
            const text = element.text;
            const isAgent = text.includes('<agent');
            if (isAgent) {
                const agentMessage = { id, text, type: 'agent' } as ContentType
                setContents(prev => [...prev, agentMessage]);
                // scroll to top
                requestIdleCallback(() => {
                    containerRef.current.scrollTo({
                        top: containerRef.current.scrollHeight,
                        behavior: 'smooth',
                    });
                })
                await sleep(3000);
                agentMessage.text = '<agent data-status="success" data-description="hello"></agent>'
                setContents(prev => {
                    const index = prev.findIndex(c => c.id === agentMessage.id);
                    if (index !== -1) {
                        const newContents = [...prev];
                        newContents[index] = agentMessage;
                        return newContents;
                    }
                    return prev;
                });
            } else if (text?.length > 0) {
                const stream = createMockStream(text);
                // @ts-ignore
                for await (const element of stream) {
                    await sleep(100);
                    const id = crypto.randomUUID();
                    const text = element.text;
                    setContents(prev => [...prev, { id, text }]);

                }
            }
        }
    }

    return (
        <>
            <div className={`flex gap-2 mb-2 ${loading ? 'pointer-events-none opacity-50' : ''}`}>
                <button className='border px-2 py-0.5 text-sm rounded-lg bg-blue-300' onClick={async () => {
                    setLoading(true);
                    await handleStream()
                    setLoading(false);
                }}>加载</button>
                <button className='border px-2 py-0.5 text-sm rounded-lg bg-red-300' onClick={() => {
                    setContents([]);
                }
                }>清空</button>
            </div>
            <div id="container" ref={containerRef} className='w-full h-[300px] overflow-y-auto border p-2 rounded-lg bg-gray-100'>
                <Markdown rehypePlugins={[rehypeRaw]} components={components}>
                    {contentValue}
                </Markdown>
            </div>
        </>
    )
}