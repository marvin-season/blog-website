import type { ReactNode } from "react";

// 导航按钮组件
export function NavigationButton({
    href,
    children,
    icon,
}: {
    href: string;
    children: ReactNode;
    icon: string;
}) {
    return (
        <a
            href={href}
            className="group inline-flex items-center space-x-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        >
            <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                {icon}
            </span>
            <span className="font-medium">{children}</span>
            <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </a>
    );
}
