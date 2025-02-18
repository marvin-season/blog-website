import { EditorProviderProps, JSONContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
// import { Markdown } from 'tiptap-markdown'
import InlinePlaceholder from './inline-placeholder'
import { serialize } from './utils'

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