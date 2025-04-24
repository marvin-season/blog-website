import type { ReactNode } from "react";
import React, { useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

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
                // style={{
                //     translate: 'calc(-50% + 50px)'
                // }}
                className={`absolute translate-x-[calc(50px-50%)] top-full left-0 bg-white shadow-lg rounded-md min-w-[160px] transition-all duration-500 ease-in-out ${isOpen
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
                    className={"!no-underline hover:bg-green-50 px-2 py-1 rounded"}
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

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <div className={"flex flex-col justify-center items-center"}>
                <div className={"flex justify-around pt-12 relative"}>
                    <Dropdown content={<UserLink />}>
                        <UserAvatar />
                        <span className="absolute inset-0 rounded-full bg-white/30 animate-ripple"></span>
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
