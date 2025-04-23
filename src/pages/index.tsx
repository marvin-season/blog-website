import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Danmaku from "rc-danmaku";

const Dropdown = ({ children, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block cursor-pointer"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {children}
            <div
                className={`absolute top-full left-0 bg-white shadow-lg rounded-md min-w-[160px] transition-all duration-500 ease-in-out ${isOpen
                    ? "opacity-100 translate-y-[12px] visible"
                    : "opacity-0 -translate-y-4 invisible"
                    }`}
            >
                {content}
            </div>
        </div>
    );
};

function UserLink() {
    const links = [
        { href: "docs/intro", label: "Docs" },
        {
            href: "http://ai.fuelstack.icu",
            label: "AI Editor",
            target: "_blank",
        },
    ];
    return (
        <div className={"flex flex-col p-4"}>
            {links.map((link, index) => (
                <a
                    key={index}
                    className={"!no-underline hover:bg-green-50 p-1"}
                    href={link.href}
                    target={link.target || "_self"}
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
}

function UserAvatar() {
    return (
        <a
            href="https://github.com/marvin-season/danny-website"
            target={"_blank"}
        >
            <img
                src={"img/loopy-smile.jpg"}
                alt={""}
                className={`h-[100px] w-[100px] rounded-full object-cover 
                                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white 
                                cursor-pointer
                            `}
            ></img>
        </a>
    );
}

const data = [
    "万物起于 Function，根于 Object，止于 null。",
    "JS 世界观的三大哲学真理之一",
    "Object.__proto__ === Function.prototype",
    "Function.__proto__ === Function.prototype",
    "Function.prototype.__proto__ === Object.prototype"
]
export function randomColorHex() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    const danmakuInsRef = useRef<Danmaku | null>(null);

    useEffect(() => {
        const danmakuIns = new Danmaku('.danmaku-wrapper',
            {
                rowHeight: 60, // 弹幕轨道高度，默认40（单位px）
                speed: 90, // 弹幕速度，默认100（单位px/s）
                opacity: 0.8, // 弹幕透明度，默认为1，范围 0-1
                maxRow: 0, // 弹幕最大轨道数，会根据容器高度自动计算，也可以手动赋值（此处设为0表示使用自动计算高度）
                minGapWidth: 30, //弹幕之前的最小间隔宽度，默认值20（单位px）
            }
        );
        danmakuInsRef.current = danmakuIns;
        let i = 0;
        const timer = setInterval(() => {
            if (danmakuInsRef.current) {
                danmakuInsRef.current.push(data[i++ % data.length], {
                    color: randomColorHex()
                });

            }
        }, 2000);

        return () => {
            clearInterval(timer)
        }
    }, []);

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <div className={"danmaku-wrapper flex flex-col justify-center items-center"}>
                <div className={"flex justify-around pt-12"}>
                    <Dropdown content={<UserLink />}>
                        <UserAvatar />
                    </Dropdown>
                </div>
                <div
                    className={`
                    mt-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                    text-transparent bg-clip-text text-4xl font-bold
                    whitespace-nowrap overflow-hidden
                    border-r-4 border-r-green-500
                    w-0 animate-typing-infinite
                `}
                >
                    {siteConfig.tagline}
                </div>
            </div>
        </Layout>
    );
}
