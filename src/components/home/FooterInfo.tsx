// 页脚信息组件
export function FooterInfo() {
    return (
        <div
            className="text-center animate-slide-up"
            style={{ animationDelay: "1s" }}
        >
            <div className="inline-flex items-center space-x-3 text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">持续更新中</span>
                <div
                    className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                ></div>
            </div>

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-500">
                <p>
                    © {new Date().getFullYear()} Marvin's Blog. 用 ❤️ 和 React
                    构建
                </p>
                <p className="mt-1">Powered by Docusaurus & Tailwind CSS</p>
            </div>
        </div>
    );
}
