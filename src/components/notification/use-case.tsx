import useNotification from "./use-notification";
export default function UseCase() {
    const notification = useNotification();
    return (
        <>
            <button
                className={'text-yellow-400 border'}
                onClick={(e) => {
                    notification.warning("网络异常");
                }}
            >
                Warning
            </button>
        </>
    );
}
