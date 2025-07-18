import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    themes: ["@docusaurus/theme-mermaid", "@docusaurus/theme-live-codeblock"],
    markdown: {
        mermaid: true,
    },
    title: "Collections of Knowledge",
    tagline: "Keep in your own way",
    favicon: "img/loopy.png",

    // Set the production url of your site here
    url: "https://your-docusaurus-site.example.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/blog-website/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "marvin-season", // Usually your GitHub org/user name.
    projectName: "blog-website", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //   'https://github.com/marvin-season/blog-website/tree/main/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    blogSidebarCount: "ALL",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: ({ permalink, blogPath, blogDirPath, locale }) => {
                        // https://github.com/marvin-season/blog-website/tree/main/create-docusaurus/templates/shared/
                        return `https://github.com/marvin-season/blog-website/tree/main/blog/${blogPath}`;
                    },
                    // Useful options to enforce blogging best practices
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "interview",
                path: "interview",
                routeBasePath: "interview",
            },
        ],
    ],
    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",

        // 现代化导航栏配置
        navbar: {
            title: "Home",
            logo: {
                alt: "Knowledge Collections Logo",
                src: "img/loopy.png",
                srcDark: "img/loopy.png",
            },
            hideOnScroll: true,
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Document",
                },
                {
                    to: "/blog",
                    label: "Blog",
                    position: "left",
                },
                {
                    to: "/interview",
                    label: "Interview",
                    position: "left",
                    activeBaseRegex: `/interview`,
                },
                {
                    to: "/personal",
                    label: "Personal",
                    position: "left",
                },
                {
                    to: "/reference",
                    label: "Reference",
                    position: "left",
                },
                {
                    type: "dropdown",
                    label: "Links",
                    position: "right",
                    items: [
                        {
                            label: "Resume",
                            to: "http://resume.fuelstack.icu/",
                        },
                        {
                            label: "AI Assistant",
                            to: "http://ai.fuelstack.icu/",
                        },
                        {
                            label: "GitHub",
                            to: "https://github.com/marvin-season/blog-website",
                        },
                    ],
                },
                {
                    type: "search",
                    position: "right",
                },
            ],
        },

        // 现代化页脚配置
        footer: {
            style: "light",
            links: [
                {
                    title: "备案信息",
                    items: [
                        {
                            label: "ICP备案号：陇ICP备2025016591号",
                            href: "https://beian.miit.gov.cn/",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Marvin's Knowledge Collections. Built with ❤️ and Docusaurus.`,
        },

        // 代码高亮主题
        prism: {
            theme: prismThemes.oneDark,
            darkTheme: prismThemes.oneDark,
        },

        // 颜色模式配置
        colorMode: {
            defaultMode: "light",
            disableSwitch: true,
            respectPrefersColorScheme: true,
        },

        // 元数据
        metadata: [
            {
                name: "keywords",
                content:
                    "前端开发, React, JavaScript, TypeScript, 面试题, 技术文档",
            },
            {
                name: "description",
                content: "知识收集站 - 技术文档、博客文章、面试题库和AI助手",
            },
            { name: "author", content: "Marvin" },
        ],

        // 社交卡片
        socials: {
            github: "https://github.com/marvin-season/blog-website",
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
