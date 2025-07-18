import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useState, useEffect } from "react";

// 用户头像组件 - 使用 ReactBits 风格
function UserAvatar() {
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

// 统计卡片组件 - 现代化设计
function StatCard({
    number,
    label,
    icon,
}: {
    number: string;
    label: string;
    icon: string;
}) {
    return (
        <div className="group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    {number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {label}
                </div>
                <div className="text-2xl mt-2 text-primary-500/60 dark:text-primary-400/60">
                    {icon}
                </div>
            </div>
        </div>
    );
}

// 特性卡片组件
function FeatureCard({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: string;
}) {
    return (
        <div className="group p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

// 导航按钮组件
function NavigationButton({
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

// 滚动指示器
function ScrollIndicator() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
            <div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}

// 粒子背景组件
function ParticleBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-400/30 dark:bg-primary-500/30 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                />
            ))}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`large-${i}`}
                    className="absolute w-1 h-1 bg-secondary-400/20 dark:bg-secondary-500/20 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${4 + Math.random() * 3}s`,
                    }}
                />
            ))}
        </div>
    );
}

// 搜索框组件
function SearchBox() {
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
                <div className="absolute right-4 text-xs text-gray-400 dark:text-gray-500">
                    ⌘K
                </div>
            </div>
        </div>
    );
}

// 技术标签组件
function TechTag({ name, color }: { name: string; color: string }) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 dark:bg-${color}-900/30 dark:text-${color}-300 border border-${color}-200/50 dark:border-${color}-700/50`}
        >
            {name}
        </span>
    );
}

// 技术栈展示组件
function TechStack() {
    const technologies = [
        { name: "React", color: "blue" },
        { name: "TypeScript", color: "blue" },
        { name: "Node.js", color: "green" },
        { name: "Python", color: "yellow" },
        { name: "Docker", color: "blue" },
        { name: "AWS", color: "orange" },
    ];

    return (
        <div
            className="text-center mb-12 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
        >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                技术栈
            </p>
            <div className="flex flex-wrap justify-center gap-2">
                {technologies.map((tech, index) => (
                    <TechTag key={index} name={tech.name} color={tech.color} />
                ))}
            </div>
        </div>
    );
}

// 最近活动时间线组件
function RecentActivity() {
    const activities = [
        {
            type: "blog",
            title: "React 18 新特性详解",
            date: "2024-01-15",
            icon: "📝",
            color: "blue",
        },
        {
            type: "code",
            title: "TypeScript 高级类型技巧",
            date: "2024-01-12",
            icon: "💻",
            color: "green",
        },
        {
            type: "interview",
            title: "前端面试高频题目",
            date: "2024-01-10",
            icon: "🎯",
            color: "purple",
        },
    ];

    return (
        <div
            className="max-w-2xl mx-auto mb-16 animate-slide-up"
            style={{ animationDelay: "0.8s" }}
        >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                最近更新
            </h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="group flex items-center space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    >
                        <div
                            className={`flex-shrink-0 w-10 h-10 bg-${activity.color}-100 dark:bg-${activity.color}-900/30 rounded-lg flex items-center justify-center text-lg`}
                        >
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {activity.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.date}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors duration-300"
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 社交媒体链接组件
function SocialLinks() {
    const socials = [
        {
            name: "GitHub",
            icon: "🐙",
            url: "https://github.com/marvin-season",
            color: "gray",
        },
        {
            name: "Twitter",
            icon: "🐦",
            url: "https://twitter.com",
            color: "blue",
        },
        {
            name: "LinkedIn",
            icon: "💼",
            url: "https://linkedin.com",
            color: "blue",
        },
        {
            name: "Email",
            icon: "📧",
            url: "mailto:contact@example.com",
            color: "red",
        },
    ];

    return (
        <div
            className="text-center mb-8 animate-slide-up"
            style={{ animationDelay: "0.9s" }}
        >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                关注我
            </p>
            <div className="flex justify-center space-x-4">
                {socials.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-${social.color}-300/50 dark:hover:border-${social.color}-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center text-xl hover:scale-110`}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}

// 页脚信息组件
function FooterInfo() {
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
                <p>© 2024 Marvin's Blog. 用 ❤️ 和 React 构建</p>
                <p className="mt-1">Powered by Docusaurus & Tailwind CSS</p>
            </div>
        </div>
    );
}

// 键盘快捷键提示组件
function KeyboardShortcuts() {
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

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={siteConfig.title}
            description="知识收集站 - 技术文档、博客文章、面试题库和AI助手"
        >
            <ScrollIndicator />

            {/* 键盘快捷键提示 */}
            <KeyboardShortcuts />

            {/* 英雄区域 */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* 背景渐变 */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

                {/* 粒子背景 */}
                <ParticleBackground />

                {/* 装饰性背景元素 */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
                <div
                    className="absolute top-40 right-20 w-96 h-96 bg-secondary-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute -bottom-8 left-40 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"
                    style={{ animationDelay: "2s" }}
                ></div>

                {/* 主要内容 */}
                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    {/* 头像 */}
                    <div className="flex justify-center mb-12 animate-fade-in">
                        <UserAvatar />
                    </div>

                    {/* 标题 */}
                    <h1 className="text-6xl md:text-7xl font-bold mb-8 animate-slide-up">
                        <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                            {siteConfig.title}
                        </span>
                    </h1>

                    {/* 副标题 */}
                    <p
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-slide-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        保持你自己的方式，收集和分享技术知识
                    </p>

                    {/* 搜索框 */}
                    <SearchBox />

                    {/* 技术栈 */}
                    <TechStack />

                    {/* 统计信息 */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto animate-slide-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <StatCard number="50+" label="技术文章" icon="📚" />
                        <StatCard number="100+" label="代码示例" icon="💻" />
                        <StatCard number="200+" label="面试题目" icon="🎯" />
                    </div>

                    {/* 特性展示 */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 animate-slide-up"
                        style={{ animationDelay: "0.6s" }}
                    >
                        <FeatureCard
                            title="技术文档"
                            description="深入浅出的技术文档，涵盖前端、后端、算法等多个领域"
                            icon="📖"
                        />
                        <FeatureCard
                            title="AI助手"
                            description="智能AI助手，帮助你快速获取技术信息和解决方案"
                            icon="🤖"
                        />
                        <FeatureCard
                            title="面试题库"
                            description="精选面试题目，助你在技术面试中脱颖而出"
                            icon="🎓"
                        />
                    </div>

                    {/* 导航按钮 */}
                    <div
                        className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up"
                        style={{ animationDelay: "0.7s" }}
                    >
                        <NavigationButton href="/docs" icon="📚">
                            查看文档
                        </NavigationButton>
                        <NavigationButton href="/blog" icon="✍️">
                            阅读博客
                        </NavigationButton>
                        <NavigationButton href="/interview" icon="🎯">
                            面试题库
                        </NavigationButton>
                        <NavigationButton href="/pages/ai-seek" icon="🤖">
                            AI助手
                        </NavigationButton>
                    </div>

                    {/* 最近活动 */}
                    <RecentActivity />

                    {/* 社交媒体链接 */}
                    <SocialLinks />

                    {/* 底部装饰 */}
                    <div className="mt-20 text-center">
                        <FooterInfo />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
