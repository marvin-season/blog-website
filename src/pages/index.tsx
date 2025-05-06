import type { ReactNode } from "react";
import React, { useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";


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
                    <UserAvatar />
                </div>
                <button className="mt-4 border rounded px-2 py-0.5 border-gray-200 hover:bg-gray-100">
                    <a className="!text-blue-500 !no-underline" href="http://ai.fuelstack.icu/">ai seek</a>
                </button>
            </div>
        </Layout>
    );
}
