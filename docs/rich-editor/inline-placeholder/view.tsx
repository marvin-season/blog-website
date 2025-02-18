import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { memo } from "react";
const caculteWidth = (value: string) => {
    // 如果是英文的话，一个字符占用 0.5rem，中文占用 1rem
    // 英文的个数
    const englishCount = value.replace(/[\u4e00-\u9fa5@#]/g, '').length
    // 中文的个数
    const chineseCount = value.length - englishCount
    return englishCount * 0.5 + chineseCount * 1.0
}

let timer: number | null = null;
const View = ({ node, updateAttributes }: NodeViewProps) => {
    const { type, value, placeholder } = node.attrs
    
    console.log('type', type)
    // 当输入变化时更新 value 属性
    const handleInput = (e: React.FormEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const newValue = inputElement.value || '';
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            updateAttributes({ value: newValue })
        }, 200);
    };

    const count = caculteWidth(value ? value : placeholder);

    return (
        <NodeViewWrapper as="span">
            <NodeViewContent
                as={'span'}
            >
                {
                    type === 'input' && <input type="password"
                        style={{ width: `${count}rem` }}
                        className={`outline-none border-b border-blue-500 mx-2 box-border text-gray-500`}
                        contentEditable={false}
                        onInput={handleInput}
                        placeholder={placeholder}
                        defaultValue={value}
                    />
                }
                {
                    type === 'select' && <select defaultValue={value}>
                        <option value="1">1</option>
                    </select>
                }

            </NodeViewContent>
        </NodeViewWrapper>
    )
}

export default View