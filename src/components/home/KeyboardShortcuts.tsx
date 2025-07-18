// 键盘快捷键提示组件
export function KeyboardShortcuts() {
    const shortcuts = [
        { key: "⌘K", description: "搜索" },
        { key: "⌘D", description: "切换主题" },
        { key: "⌘/", description: "显示快捷键" },
    ];

    return (
        <div
            className="fixed bottom-6 right-6 z-40 animate-slide-up"
            style={{ animationDelay: "1.2s" }}
        >
            <div className="group relative">
                <button className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center text-lg">
                    ⌨️
                </button>

                {/* 快捷键提示 */}
                <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                        <div className="font-medium mb-1">快捷键</div>
                        {shortcuts.map((shortcut, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">
                                    {shortcut.key}
                                </kbd>
                                <span>{shortcut.description}</span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            </div>
        </div>
    );
}
