import { Extension } from '@tiptap/core';
interface MentionExtensionOptions {
  onMentionKeyPress: (key: string) => boolean; // 外部回调函数
}
export const MentionExtension = Extension.create({
  name: 'mention',

  addKeyboardShortcuts() {
    return {
      // 监听 @ 键
      '@': () => {
        // 处理 @ 输入
        return this.options.onMentionKeyPress('@');
      },

      // 你也可以监听其他键
      '#': () => {
        console.log('# pressed');
        return false; // 允许其他行为
      },
    };
  },
});
