import { Editor, EditorProviderProps, JSONContent, useCurrentEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import InlinePlaceholder from './inline-placeholder'
import { deserialize, serialize } from './utils'
import Tippy from '@tippyjs/react'
import { MentionExtension } from './mention'
import { ConfirmExtension } from './confirm'

export const useEditorProps = ({ content, setTriggerKey }: { content: string | JSONContent, setTriggerKey: (key: string) => void }) => {
    return {
        editorContainerProps: {
            className: 'w-full',
        },
        autofocus: true,
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            InlinePlaceholder,
            MentionExtension.configure({
                onMentionKeyPress: (key: string) => {
                    setTriggerKey(key)
                }
            }),
            ConfirmExtension.configure({
                onConfirmKeyPress: (editor: Editor) => {
                    handleSave(editor.getJSON())
                }
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'w-full prose-sm focus:outline-none w-3/4 p-10 bg-white shadow rounded-[16px]',
            },
        },
    } as EditorProviderProps
}

const handleSave = (json: JSONContent) => {
    alert(serialize(json))
}

const templateList = [
    "我是{{角色名}}, 我的工作是{{主要活动}}，我的爱好是{{爱好}}",
    "我喜欢{{活动1}}和{{活动2}}，但我最擅长{{技能:下棋#游戏#写作}}。",
    "在我的{{生活}}中，{{事情1}}和{{事情2}}是我每天必做的事。",
]
export const Trigger = ({ setTriggerKey, triggerKey }) => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null
    }
    return <>
        {/* trigger @ */}
        <Tippy
            delay={100}
            className='border border-blue-300 backdrop-blur backdrop-opacity-80 p-4 rounded-[12px] shadow text-sm'
            duration={0}
            content={<div className={"flex flex-col gap-2"}>
                {
                    templateList.map((item, index) => {
                        return <div className='truncate cursor-pointer hover:text-blue-400' onClick={() => {
                            editor.commands.setContent(deserialize(item))
                        }} key={index}>{item}</div>
                    })
                }
            </div>}
            interactive
            placement={'top-start'} // 将弹窗位置设置为底部
            visible={triggerKey === '@'}
            onClickOutside={() => setTriggerKey(null)} // 点击外部关闭弹窗
        >
            <div className='cursor-pointer px-4 py-2 bg-white w-full rounded-[12px] shadow text-blue-500'>
                <span onClick={() => {
                    setTriggerKey(triggerKey === '@' ? null : '@')
                }}>
                    {'@'}
                </span>
            </div>

        </Tippy>
    </>
}

export const Sender = () => {
    const { editor } = useCurrentEditor();

    return <>
        <div className={"border text-white px-3 py-1 rounded-[12px] bg-blue-500 cursor-pointer"} onClick={() => {
            handleSave(editor.getJSON())
        }}>Send</div>
    </>
}


export const Tips = () => {
    return <div className="text-gray-400 text-sm">{'CTRL/Command + Enter or Typing @'}</div>
}