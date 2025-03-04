import {
    Editor,
    EditorProviderProps,
    JSONContent,
    useCurrentEditor,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import InlinePlaceholder from "../extension/inline-placeholder";
import { MentionExtension } from "../extension/mention";
import { ConfirmExtension } from "../extension/confirm";
import { MentionKey } from "../constant";
import SelectionMark from "../extension/selection-mark";

export const useEditorProps = ({
    content,
    onMentionKeyPress,
    onConfirmKeyPress,
}: {
    content: string | JSONContent;
    onMentionKeyPress: (key: MentionKey) => Promise<void>;
    onConfirmKeyPress: (editor: Editor) => Promise<boolean | void>;
}) => {
    return {
        editorContainerProps: {
            className: "w-full",
        },
        autofocus: true,
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            InlinePlaceholder,
            MentionExtension.configure({
                onMentionKeyPress,
            }),
            ConfirmExtension.configure({
                onConfirmKeyPress,
            }),
            SelectionMark,
        ],
        content,
        editorProps: {
            attributes: {
                class: "w-full prose-sm focus:outline-none p-6 pt-8 bg-white border border-gray-100 shadow rounded-[16px]",
            },
        },
    } as EditorProviderProps;
};
