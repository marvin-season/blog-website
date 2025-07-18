import { useState } from "react";

// 用户头像组件 - 使用 ReactBits 风格
export function UserAvatar() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative group">
            {/* 背景光晕效果 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>

            {/* 装饰性圆环 */}
            <div className="absolute -inset-2 border border-primary-200/30 dark:border-primary-700/30 rounded-full animate-spin-slow"></div>

            <a
                href="https://github.com/marvin-season/blog-website"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative overflow-hidden rounded-full">
                    <img
                        src="img/loopy-smile.jpg"
                        alt="Marvin's Avatar"
                        className={`h-28 w-28 object-cover transition-all duration-500 ease-out ${
                            isHovered ? "scale-110" : "scale-100"
                        }`}
                    />
                    {/* 悬停时的叠加效果 */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    ></div>
                </div>

                {/* 状态指示器 */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse"></div>
            </a>
        </div>
    );
}
