import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
    UserAvatar,
    StatCard,
    FeatureCard,
    NavigationButton,
    ScrollIndicator,
    ParticleBackground,
    SearchBox,
    TechStack,
    RecentActivity,
    SocialLinks,
    FooterInfo,
    KeyboardShortcuts,
} from "../components/home";

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
