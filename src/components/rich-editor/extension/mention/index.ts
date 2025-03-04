import { Extension } from "@tiptap/core";
import { MentionKey } from "../../constant";
interface MentionExtensionOptions {
    onMentionKeyPress: (key: MentionKey) => boolean; // 外部回调函数
}
export const MentionExtension = Extension.create({
    name: "mention",

    addKeyboardShortcuts() {
        // iterate over all keys in MentionKey

        return Object.entries(MentionKey).reduce((prev, [key, value]) => {
            prev[value] = () => {
                this.options.onMentionKeyPress(value);
                return true;
            };
            return prev;
        }, {});
    },
});
