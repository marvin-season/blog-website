import { EditorProvider } from "@tiptap/react";
import { Trigger, useEditorProps, Sender, Tips } from "./editor";
import { deserialize } from "./utils";
import { useState } from "react";

function App() {
    const [triggerKey, setTriggerKey] = useState<string>(undefined);

    const editorProps = useEditorProps({
        content: deserialize("我是{{宫本武藏}},我的工作是 {{吃饭睡觉打拳击}}。"),
        setTriggerKey
    })

    return <div className="bg-[#f5f1f1] rounded-4xl flex flex-col justify-center items-center gap-4 p-8 pb-4">
        <EditorProvider editable={true} {...editorProps}>
            <div className="w-full flex gap-4 items-end">
                <Trigger triggerKey={triggerKey} setTriggerKey={setTriggerKey} />
                <Sender />
            </div>
            <Tips />
        </EditorProvider>
    </div>;
}

export default App;