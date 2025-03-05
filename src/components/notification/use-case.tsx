import useNotification from "./use-notification";
export default function UseCase() {
    const notification = useNotification();
    return (
        <>
            <button
                className={'cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white border-2 rounded-lg px-2 py-0.5'}
                onClick={(e) => {
                    notification.warning("网络异常");
                }}
            >
                警告
            </button>
        </>
    );
}
