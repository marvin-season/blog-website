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
            target={`${href.includes("http") ? "_blank" : "_self"}`}
            className="flex justify-between group inline-flex items-center space-x-3 px-6 py-3 bg-white/8 backdrop-blur-sm rounded-xl border border-gray-200/50  hover:border-primary-300/50  transition-all duration-300 hover:shadow-lg text-gray-700"
        >
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
