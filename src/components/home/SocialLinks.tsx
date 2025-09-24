// 社交媒体链接组件
export function SocialLinks() {
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
