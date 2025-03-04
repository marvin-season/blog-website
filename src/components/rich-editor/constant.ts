export enum MentionKey {
    At = "@",
    Sharp = "#",
}

export const mentionListMap = new Map<
    MentionKey,
    { value: string; serializable?: boolean }[]
>();
mentionListMap.set(MentionKey.At, [
    {
        value: "我是{{角色名}}, 我的工作是{{主要活动}}，我的爱好是{{爱好}}",
        serializable: true,
    },
    {
        value: "我喜欢{{活动1}}和{{活动2}}，但我最擅长{{技能:下棋#游戏#写作}}。",
        serializable: true,
    },
    {
        value: "在我的{{生活}}中，{{事情1}}和{{事情2}}是我每天必做的事。",
        serializable: true,
    },
]);

mentionListMap.set(MentionKey.Sharp, [
    {
        value: "hello <span data-selection-mark>world</span>, this is the future",
    },
    { value: "我的爱好是{{爱好:吃饭#睡觉#打豆豆}}。", serializable: true },
]);
