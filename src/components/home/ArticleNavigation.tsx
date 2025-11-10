import { NavigationButton } from ".";

export function ArticleNavigation() {
    return (
        <div
            className="flex flex-col md:flex-row justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: "0.7s" }}
        >
            <NavigationButton href={`/docs`} icon="📚">
                Docs
            </NavigationButton>
            <NavigationButton href={`/blog`} icon="✍️">
                Blog
            </NavigationButton>
            <NavigationButton href={`https://app.fuelstack.icu/`} icon="🤖">
                Shadcn/UI Registry
            </NavigationButton>
        </div>
    );
}
