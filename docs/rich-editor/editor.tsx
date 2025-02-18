import { EditorProviderProps, JSONContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
// import { Markdown } from 'tiptap-markdown'
import InlinePlaceholder from './inline-placeholder'
import { serialize } from './utils'
import Tippy from '@tippyjs/react'
import { useState } from 'react'

export const useEditorProps = (content: string | JSONContent) => {
    return {
        editorContainerProps: {
            className: 'w-full',
        },
        autofocus: true,
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            InlinePlaceholder
        ],
        content,
        editorProps: {
            attributes: {
                class: 'w-full prose-sm focus:outline-none w-3/4 p-10 bg-white shadow rounded-[16px]',
            },
            handleKeyDown(editorView, event) {
                if (event.key === '@') {
                    alert('trigger @')
                    return true
                }
                // 监听键盘事件
                if (event.key === 'Enter' && !event.shiftKey) {
                    console.log('trigger Enter')
                    handleSave(editorView.state.toJSON().doc)
                    return true
                }

                return false // 返回 false 不拦截事件
            },
        },
    } satisfies EditorProviderProps
}

const handleSave = (json: JSONContent) => {
    alert(serialize(json))
}

const templateList = [
    "我是{{宫本武藏}},我的工作是 {{吃饭睡觉打拳击}}。",
    "请帮我查询 {{昨天}}的日程"
]
export const Trigger = () => {
    const [activedKey, setActivedKey] = useState<string>(undefined);
    return <>
        <Tippy
            delay={100}
            duration={0}
            content={<div className={""}>
                {
                    templateList.map((item, index) => {
                        return <div onClick={() => {
                            console.log('click', item)
                        }} key={index}>{item}</div>
                    })
                }
            </div>}
            interactive
            placement={'top-start'} // 将弹窗位置设置为底部
            visible={activedKey === '@'}
            onClickOutside={() => setActivedKey(null)} // 点击外部关闭弹窗
        >
            <div className='cursor-pointer p-4 bg-white w-full rounded-[12px] shadow text-blue-500'>
                <span onClick={() => {
                    setActivedKey('@')
                }}>
                    {'@'}
                </span>
            </div>

        </Tippy>
    </>
}