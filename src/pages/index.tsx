import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
    UserAvatar,
    ParticleBackground,
    SearchBox,
    TechStack,
    FooterInfo,
    ArticleNavigation,
    Background,
    DecorativeBackground,
} from "../components/home";

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
                <Background />
                {/* 粒子背景 */}
                <ParticleBackground />

                {/* 装饰性背景元素 */}
                <DecorativeBackground />

                {/* 主要内容 */}
                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    {/* 头像 */}
                    <div className="flex justify-center my-12 animate-fade-in">
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
                    ></p>

                    {/* 搜索框 */}
                    <SearchBox />

                    {/* 技术栈 */}
                    <TechStack />

                    {/* 站内导航按钮 */}
                    <ArticleNavigation />

                    {/* 最近活动 */}

                    {/* 社交媒体链接 */}

                    {/* 底部装饰 */}
                    <div className="mt-20 text-center">
                        <FooterInfo />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
