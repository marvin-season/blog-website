import { Editor, useCurrentEditor } from "@tiptap/react";

export const Sender = ({
    onSend,
}: {
    onSend: (editor: Editor) => Promise<void>;
}) => {
    const { editor } = useCurrentEditor();

    return <>
        <div className={"border text-white px-4 py-1 rounded-[8px] bg-blue-500 hover:bg-blue-600 cursor-pointer"} onClick={() => {
            onSend(editor)
        }}>Send</div>
    </>
}


