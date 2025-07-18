import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { NavigationButton } from ".";

export function ArticleNavigation() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <div
            className="flex flex-col md:flex-row justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: "0.7s" }}
        >
            <NavigationButton href={`${siteConfig.baseUrl}docs`} icon="📚">
                查看文档
            </NavigationButton>
            <NavigationButton href={`${siteConfig.baseUrl}blog`} icon="✍️">
                阅读博客
            </NavigationButton>
            <NavigationButton href={`${siteConfig.baseUrl}interview`} icon="🎯">
                面试题库
            </NavigationButton>
            <NavigationButton href={`http://ai.fuelstack.icu/`} icon="🤖">
                AI助手
            </NavigationButton>
        </div>
    );
}
