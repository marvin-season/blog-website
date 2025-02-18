// 我是 {{宫本武藏}}, 我的工作是 {{吃饭睡觉打拳击}} => `

import type { JSONContent } from '@tiptap/core';

export function deserialize(input: string) {
  const content: JSONContent['content'] = [];
  const regex = /{{(.*?)}}/g; // 匹配 {{...}} 占位符
  let lastIndex = 0;

  while (true) {
    const match = regex.exec(input);
    if (!match) {
      // 如果没有更多匹配，添加剩余的普通文本
      if (lastIndex < input.length) {
        content.push({
          type: 'text',
          text: input.slice(lastIndex),
        });
      }
      break;
    }

    const [_full, value] = match;

    // 添加占位符前的普通文本
    if (lastIndex < match.index) {
      content.push({
        type: 'text',
        text: input.slice(lastIndex, match.index),
      });
    }

    // 添加占位符
    content.push({
      type: 'inlinePlaceholder',
      attrs: {
        placeholder: value,
        value: '',
      },
    });

    // 更新 lastIndex
    lastIndex = regex.lastIndex;
  }

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content,
      },
    ],
  } as JSONContent;
}
export const serialize = (json: JSONContent) => {
  let result = '';

  // 遍历 content 数组
  json.content?.forEach((block) => {
    if (block.type === 'paragraph') {
      block.content?.forEach((node) => {
        if (node.type === 'text') {
          // 普通文本直接拼接
          result += node.text;
        } else if (node.type === 'inlinePlaceholder') {
          // 占位符拼接为 {{...}} 格式
          const { placeholder, value } = node.attrs!;
          if (value) {
            result += value;
          } else {
            result += `{{${placeholder}}}`;
          }
        }
      });
    }
  });

  return result;
};
