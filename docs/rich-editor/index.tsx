import { EditorProvider } from "@tiptap/react";
import { useEditorProps } from "./editor";
import { deserialize } from "./utils";

function App() {
  const editorProps = useEditorProps(deserialize("我是{{宫本武藏}},我的工作是 {{吃饭睡觉打拳击}}。"))
  return <div className="bg-[#f5f1f1] rounded-4xl flex flex-col justify-center items-center gap-4 p-8">
    <EditorProvider editable={true} {...editorProps}>
      <span>{'CTRL/Command + Enter to send'}</span>
    </EditorProvider>
  </div>;
}

export default App;