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
        navbar: {
            title: "Home",
            logo: {
                alt: "My Site Logo",
                src: "img/loopy.png",
            },
            items: [
                // {to: '/ai-seek', label: 'AISeek', position: 'left'},
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Tutorial",
                },
                { to: "/blog", label: "Blog", position: "left" },
                {
                    to: "/interview",
                    label: "Interview",
                    position: "left",
                    activeBaseRegex: `/interview`,
                },
                { to: "/personal", label: "Personal", position: "left" }, // 新增
                { to: "/reference", label: "Reference", position: "left" }, // 新增
                {
                    to: "http://resume.fuelstack.icu/",
                    label: "Resume",
                    position: "right",
                },
                {
                    to: "http://ai.fuelstack.icu/",
                    label: "AI Seek",
                    position: "right",
                },
                {
                    to: "https://github.com/marvin-season/blog-website",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Tutorial",
                            to: "/docs/effective",
                        },
                    ],
                },
                {
                    title: "备案信息",
                    items: [
                        {
                            label: "ICP备案号：陇ICP备2025016591号",
                            href: "https://beian.miit.gov.cn/",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Blog",
                            to: "/blog",
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/marvin-season/blog-website",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus. `,
        },
        prism: {
            theme: prismThemes.oneDark,
            darkTheme: prismThemes.oneDark,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
