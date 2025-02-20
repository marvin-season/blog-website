import { useCurrentEditor } from "@tiptap/react";
import { deserialize } from "./utils";
import Tippy from "@tippyjs/react";
import 'tippy.js/animations/shift-away.css'; // 过渡动画
import { useImperativeHandle, useState } from "react";
import { MentionKey } from "./constant";

const templateList = [
    "我是{{角色名}}, 我的工作是{{主要活动}}，我的爱好是{{爱好}}",
    "我喜欢{{活动1}}和{{活动2}}，但我最擅长{{技能:下棋#游戏#写作}}。",
    "在我的{{生活}}中，{{事情1}}和{{事情2}}是我每天必做的事。",
]
export const Trigger = ({ ref }) => {
    const { editor } = useCurrentEditor();
    const [triggerKey, setTriggerKey] = useState<MentionKey>(undefined);

    if (!editor) {
        return null
    }
    useImperativeHandle(ref, () => {
        return {
            setTriggerKey
        }
    }, [])

    return <>
        <div className='cursor-pointer px-4 py-2 bg-white w-full rounded-[12px] shadow text-blue-500'>
            {
                Object.entries(MentionKey).map(([key, value]) => {
                    return <Tippy
                        animation="shift-away"
                        className='border border-blue-300 backdrop-blur backdrop-opacity-80 p-4 rounded-[12px] shadow text-sm'
                        content={<div className={"flex flex-col gap-2"}>
                            {
                                templateList.map((item, index) => {
                                    return <div className='truncate cursor-pointer hover:text-blue-400' onClick={() => {
                                        editor.commands.setContent(deserialize(item))
                                    }} key={index}>{item}</div>
                                })
                            }
                        </div>}
                        interactive
                        placement={'top-start'} // 将弹窗位置设置为底部
                        visible={triggerKey === key}
                        onClickOutside={() => setTriggerKey(null)} // 点击外部关闭弹窗
                    >
                        <span onClick={() => {
                            setTriggerKey(triggerKey === value ? null : value)
                        }}>
                            {key}
                        </span>


                    </Tippy>
                }
                )
            }

        </div>
        {/* trigger @ */}

    </>
}