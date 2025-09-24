import { useMouse } from "ahooks";

export function Background() {
    const mouse = useMouse();

    return (
        <div className="fixed inset-0 overflow-hidden -z-10">
            {/* 基础背景 */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

            {/* 鼠标发光效果 */}
            <div className="fixed w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none transition-transform duration-100 ease-out" />

            {/* 第二个发光层 - 更柔和 */}
            <div
                className="fixed w-64 h-64 rounded-full opacity-20 blur-2xl pointer-events-none transition-transform duration-150 ease-out"
                style={{
                    background:
                        "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
                    transform: `translate(${mouse.clientX - 128}px, ${mouse.clientY - 128}px)`,
                    left: 0,
                    top: 0,
                }}
            />

            {/* 第三个发光层 - 最柔和 */}
            <div
                className="fixed w-32 h-32 rounded-full opacity-15 blur-xl pointer-events-none transition-transform duration-200 ease-out"
                style={{
                    background:
                        "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 70%, transparent 100%)",
                    transform: `translate(${mouse.clientX - 64}px, ${mouse.clientY - 64}px)`,
                    left: 0,
                    top: 0,
                }}
            />
        </div>
    );
}
