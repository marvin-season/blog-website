import { Mark, mergeAttributes } from "@tiptap/core";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SelectionMarkProps: {};
    }
  }

interface SelectionMarkProps {

}
const SelectionMark = Mark.create<SelectionMarkProps>({
  name: 'selectionMark',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-selection-mark]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['selection-mark', mergeAttributes(HTMLAttributes, { 'data-selection-mark': '' }), 0];
  },

  addCommands() {
    return {
    };
  },
})

export default SelectionMark