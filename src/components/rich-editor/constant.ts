export enum MentionKey {
  '@' = '@',
  '#' = '#',
}

export const mentionListMap = new Map<MentionKey, string[]>();
mentionListMap.set(MentionKey['@'], [
  '我是{{角色名}}, 我的工作是{{主要活动}}，我的爱好是{{爱好}}',
  '我喜欢{{活动1}}和{{活动2}}，但我最擅长{{技能:下棋#游戏#写作}}。',
  '在我的{{生活}}中，{{事情1}}和{{事情2}}是我每天必做的事。',
]);

mentionListMap.set(MentionKey['#'], [
  '在我的{{生活}}中，{{事情1}}和{{事情2}}是我每天必做的事。',
  '我的爱好是{{爱好:吃饭#睡觉#打豆豆}}。',
]);
