import { EditorProvider } from "@tiptap/react";
import { Trigger, useEditorProps } from "./editor";
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
            <Trigger triggerKey={triggerKey} setTriggerKey={setTriggerKey}/>
            <div className="text-gray-400 text-sm">{'CTRL/Command + Enter or Typing @'}</div>
        </EditorProvider>
    </div>;
}

export default App;