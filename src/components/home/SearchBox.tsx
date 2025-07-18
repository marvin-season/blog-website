import { useState } from "react";

// 搜索框组件
export function SearchBox() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className="relative max-w-md mx-auto mb-12 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
        >
            <div
                className={`relative flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
                    isFocused
                        ? "border-primary-300/50 dark:border-primary-600/50 shadow-lg"
                        : "border-gray-200/50 dark:border-gray-700/50"
                }`}
            >
                <div className="absolute left-4 text-gray-400 dark:text-gray-500">
                    🔍
                </div>
                <input
                    type="text"
                    placeholder="搜索技术文章、代码示例..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {/* beta icon */}
                <span className="absolute right-4 text-xs text-gray-400 dark:text-gray-500">
                    Beta
                </span>
            </div>
        </div>
    );
}
