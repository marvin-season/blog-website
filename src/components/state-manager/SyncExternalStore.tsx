import { Fragment, ReactNode, useSyncExternalStore } from "react";

interface Message {
    state: {
        content: string;
        id: string
    };
    ui: ({ item }: { item: Message["state"] }) => ReactNode;
}

interface DataProps {
    messages: Message[];
}

const data: DataProps = {
    messages: [],
};
let listener = null;
const store = {
    subscribe: (callback: () => void) => {
        listener = callback;
        return () => {
            listener = null;
        };
    },
    getSnapshot: () => {
        return data.messages;
    },
    update(state: Message["state"], ui: Message["ui"]) {
        const index = data.messages.findIndex(item => item.state.id === state.id);

        if (index !== -1) {
            const updatedMessage = {
                ...data.messages[index],
                state: {
                    ...data.messages[index].state,
                    content: data.messages[index].state.content + state.content,
                },
            };

            data.messages = [
                ...data.messages.slice(0, index),
                updatedMessage,
                ...data.messages.slice(index + 1),
            ];
        } else {
            data.messages = [...data.messages, { state, ui }];
        }


        listener?.();
    },

};

const Content: Message["ui"] = ({ item }) => {
    return <div className={"p-2 bg-white text-sm rounded-xl text-gray-600"}>{item.content}</div>;
};

export default function SyncExternalStore() {
    const messages = useSyncExternalStore(store.subscribe, store.getSnapshot);
    return <>
        <div className={"bg-gray-400 p-2 rounded-xl flex flex-col gap-2"}>
            {
                messages.map((message, index) => {
                    return <Fragment key={index}>
                        {
                            message.ui({ item: message.state })
                        }
                    </Fragment>;
                })
            }
        </div>
        <div className={"cursor-pointer "} onClick={() => {
            store.update({
                content: "hello",
                id: "123",
            }, Content);
        }}>add
        </div>
    </>;
}