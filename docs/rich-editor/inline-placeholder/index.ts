import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import View from './view';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    inlinePlaceholder: {
    };
  }
}

interface InlinePlaceholderAttributes {
  placeholder: string;
  value: string;
  type: 'input';
  HTMLAttributes?: Record<string, any>;
}

const InlinePlaceholder = Node.create<InlinePlaceholderAttributes>({
  name: 'inlinePlaceholder',

  group: 'inline',

  inline: true,

  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'inlinePlaceholder',
      },
      placeholder: '请输入内容',
      type: 'input',
      value: '',
    };
  },

  addAttributes() {
    return {
      placeholder: {
        default: '',
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-placeholder') || '',
        renderHTML: (attributes: InlinePlaceholderAttributes) => {
          return {
            'data-placeholder': attributes.placeholder,
          };
        },
      },
      value: {
        default: '',
        rendered: false,
        // 从 html 中解析 为 prosemirror 中的 state
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-value') || '',
        renderHTML: (attributes: InlinePlaceholderAttributes) => {
          return {
            'data-value': attributes.value,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type=${this.name}]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes || {}, HTMLAttributes),
      node.attrs.placeholder,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(View);
  }
});

export default InlinePlaceholder;
