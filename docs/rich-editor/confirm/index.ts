import { Editor, Extension } from '@tiptap/core';
interface MentionExtensionOptions {
  onConfirmKeyPress: (editor: Editor) => boolean; // 外部回调函数
}
export const ConfirmExtension = Extension.create({
  name: 'confirm',

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': ({ editor }) => {
        return this.options.onConfirmKeyPress(editor);
      },
    };
  },
});
