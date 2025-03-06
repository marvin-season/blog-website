import { useHelper } from "./index";

export default function UseCase() {
    const helper = useHelper();
    return (
        <>
            <button
                className={
                    "cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white border-2 rounded-lg px-2 py-0.5"
                }
                onClick={(e) => {
                    helper.notification.warning("网络异常");
                }}
            >
                警告
            </button>

            <button
                className={
                    "cursor-pointer bg-blue-400 hover:bg-blue-500 text-white border-2 rounded-lg px-2 py-0.5"
                }
                onClick={async (e) => {
                    const result = await helper.modal.open(() => {
                        return <>hi</>;
                    });
                    result.confirmPromise.then(msg => {
                        console.log(msg, '确认关闭');
                    })
                }}
            >
                modal
            </button>
        </>
    );
}
