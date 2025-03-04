import { useCurrentEditor } from "@tiptap/react";
import { deserialize } from "./utils";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/shift-away.css"; // 过渡动画
import { useImperativeHandle, useState } from "react";
import { MentionKey, mentionListMap } from "./constant";
import { Tips } from "@site/src/components/rich-editor/tips";

export const Trigger = ({ ref }) => {
    const { editor } = useCurrentEditor();
    const [triggerKey, setTriggerKey] = useState<MentionKey>(undefined);

    if (!editor) {
        return null;
    }
    useImperativeHandle(ref, () => {
        return {
            setTriggerKey,
        };
    }, []);

    return (
        <>
            <div className="cursor-pointer px-4 py-2 bg-white w-full rounded-[12px] shadow text-blue-400 flex gap-2 items-center">
                {Object.entries(MentionKey).map(([key, value]) => {
                    return (
                        <Tippy
                            animation="shift-away"
                            className="border border-blue-300 backdrop-blur backdrop-opacity-80 p-4 rounded-[12px] shadow text-sm"
                            content={
                                <div className={"flex flex-col gap-2"}>
                                    {mentionListMap
                                        .get(value)
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    className="truncate cursor-pointer hover:text-blue-400"
                                                    onClick={() => {
                                                        editor.commands.setContent(
                                                            item?.serializable
                                                                ? deserialize(
                                                                      item.value,
                                                                  )
                                                                : item.value,
                                                        );
                                                    }}
                                                    key={index}
                                                >
                                                    {item.value}
                                                </div>
                                            );
                                        })}
                                </div>
                            }
                            interactive
                            placement={"top-start"} // 将弹窗位置设置为底部
                            visible={triggerKey === value}
                            onClickOutside={() => setTriggerKey(null)} // 点击外部关闭弹窗
                        >
                            <span
                                className="hover:text-blue-700"
                                onClick={() => {
                                    setTriggerKey(
                                        triggerKey === value ? null : value,
                                    );
                                }}
                            >
                                {value}
                            </span>
                        </Tippy>
                    );
                })}
                <Tips />
            </div>
        </>
    );
};
