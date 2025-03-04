import { Editor, EditorProvider } from "@tiptap/react";
import { deserialize, serialize } from "./utils";
import { useRef, useState } from "react";
import { useEditorProps } from "./hooks/use-editor-props";
import { Trigger } from "./trigger";
import { Sender } from "./sender";
import { Tips } from "./tips";
import './index.css'


function RichEditor({
    onSend
                    }: {
    onSend?: (value: string) => void
}) {
    const triggerRef = useRef(null)
    const handelSave = async (editor: Editor) => {
        const value = serialize(editor.getJSON())
        if (onSend) {
            onSend(value)
        } else {
            alert(value)
        }
    }

    const editorProps = useEditorProps({
        content: deserialize("我是{{宫本武藏}},我的爱好是{{爱好:吃饭#睡觉#打豆豆}}。"),
        async onMentionKeyPress(key) {
            triggerRef.current.setTriggerKey(key)
        },
        async onConfirmKeyPress(editor) {
            handelSave(editor)
        }
    })

    return <div className="rounded flex flex-col justify-center items-center gap-4">
        <EditorProvider editable={true} {...editorProps}>
            <div className="w-full flex gap-4 items-end">
                <Trigger ref={triggerRef} />
                <Sender onSend={async (editor) => {
                    handelSave(editor)
                }} />
            </div>
        </EditorProvider>
    </div>;
}

export default RichEditor;