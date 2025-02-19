import {
  Editor,
  EditorProviderProps,
  JSONContent,
  useCurrentEditor,
} from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import InlinePlaceholder from '../extension/inline-placeholder';
import { MentionExtension } from '../extension/mention';
import { ConfirmExtension } from '../extension/confirm';

export const useEditorProps = ({
  content,
  setTriggerKey,
  onConfirmKeyPress
}: {
  content: string | JSONContent;
  setTriggerKey: (key: string) => void;
  onConfirmKeyPress: (editor: Editor) => Promise<boolean | void>;
}) => {
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
          setTriggerKey(key);
        },
      }),
      ConfirmExtension.configure({
        onConfirmKeyPress
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'w-full prose-sm focus:outline-none p-10 bg-white shadow rounded-[16px]',
      },
    },
  } as EditorProviderProps;
};
