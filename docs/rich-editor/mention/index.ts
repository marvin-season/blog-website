import { Extension } from '@tiptap/core';

export const MentionExtension = Extension.create({
  name: 'mention',

  addKeyboardShortcuts() {
    return {
      // 监听 @ 键
      'Shift-@': () => {
        // 处理 @ 输入
        alert('@ key pressed');
        return false; // 返回 true 防止默认行为
      },

      // 你也可以监听其他键
      Enter: () => {
        console.log('Enter key pressed');
        return false; // 允许其他行为
      },
    };
  },
});
