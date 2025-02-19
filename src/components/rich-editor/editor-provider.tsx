import { Editor, EditorProvider } from "@tiptap/react";
import { deserialize, serialize } from "./utils";
import { useState } from "react";
import { useEditorProps } from "./hooks/use-editor-props";
import { Trigger } from "./trigger";
import { Sender } from "./sender";
import { Tips } from "./tips";


function RichEditor() {
    const [triggerKey, setTriggerKey] = useState<string>(undefined);
    const handelSave = async (editor: Editor) => {
        alert(serialize(editor.getJSON()))
    }

    const editorProps = useEditorProps({
        content: deserialize("我是{{宫本武藏}},我的爱好是{{爱好:吃饭#睡觉#打豆豆}}。"),
        async onMentionKeyPress(key) {
            setTriggerKey(key)
        },
        async onConfirmKeyPress(editor) {
            handelSave(editor)
        }
    })

    return <div className="bg-[#f5f1f1] rounded-4xl flex flex-col justify-center items-center gap-4 p-8 pb-4">
        <EditorProvider editable={true} {...editorProps}>
            <div className="w-full flex gap-4 items-end">
                <Trigger triggerKey={triggerKey} setTriggerKey={setTriggerKey} />
                <Sender onSend={async (editor) => {
                    handelSave(editor)
                }} />
            </div>
            <Tips />
        </EditorProvider>
    </div>;
}

export default RichEditor;