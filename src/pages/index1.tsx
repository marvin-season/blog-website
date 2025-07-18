import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";

// 特性卡片组件
function FeatureCard({
    title,
    description,
    icon,
    href,
}: {
    title: string;
    description: string;
    icon: string;
    href: string;
}) {
    return (
        <a
            href={href}
            className="group block p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2"
        >
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-glow">
                        {icon}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {description}
                    </p>
                </div>
            </div>
        </a>
    );
}

// 用户头像组件
function UserAvatar() {
    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <a
                href="https://github.com/marvin-season/blog-website"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
            >
                <img
                    src="img/loopy-smile.jpg"
                    alt="Marvin's Avatar"
                    className="h-24 w-24 rounded-full object-cover shadow-large border-4 border-white dark:border-gray-800 cursor-pointer transition-all duration-300 hover:scale-110"
                />
            </a>
        </div>
    );
}

// 统计数字组件
function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {number}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-400 mt-1 font-medium">
                {label}
            </div>
        </div>
    );
}

// 快速链接组件
function QuickLinks() {
    const links = [
        {
            href: "/docs/effective",
            label: "📚 文档中心",
            description: "技术文档和教程",
            color: "from-blue-500 to-cyan-500",
        },
        {
            href: "/blog",
            label: "✍️ 博客文章",
            description: "技术分享和心得",
            color: "from-purple-500 to-pink-500",
        },
        {
            href: "/interview",
            label: "💼 面试题",
            description: "前端面试题库",
            color: "from-green-500 to-emerald-500",
        },
        {
            href: "http://ai.fuelstack.icu/",
            label: "🤖 AI 助手",
            description: "智能编程助手",
            color: "from-orange-500 to-red-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={
                        link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                    }
                    className={clsx(
                        "group block p-6 rounded-2xl bg-gradient-to-br",
                        link.color,
                        "text-white shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2",
                    )}
                >
                    <div className="text-2xl mb-3">
                        {link.label.split(" ")[0]}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        {link.label.split(" ").slice(1).join(" ")}
                    </h3>
                    <p className="text-white/90 text-sm">{link.description}</p>
                </a>
            ))}
        </div>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={siteConfig.title}
            description="知识收集站 - 技术文档、博客文章、面试题库和AI助手"
        >
            {/* 英雄区域 */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* 背景渐变 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

                {/* 装饰性背景元素 */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                <div
                    className="absolute top-40 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
                    style={{ animationDelay: "2s" }}
                ></div>

                {/* 主要内容 */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    {/* 头像 */}
                    <div className="flex justify-center mb-8">
                        <UserAvatar />
                    </div>

                    {/* 标题 */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            {siteConfig.title}
                        </span>
                    </h1>

                    {/* 副标题 */}
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
                        保持你自己的方式，收集和分享技术知识
                    </p>

                    {/* 统计信息 */}
                    <div className="flex justify-center space-x-12 mb-12">
                        <StatCard number="50+" label="技术文章" />
                        <StatCard number="100+" label="代码示例" />
                        <StatCard number="200+" label="面试题目" />
                    </div>

                    {/* 快速链接 */}
                    <QuickLinks />

                    {/* 底部装饰 */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">
                                持续更新中
                            </span>
                            <div
                                className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"
                                style={{ animationDelay: "0.5s" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
