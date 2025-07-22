// 技术标签组件
function TechTag({ name, className }: { name: string; className: string }) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
        >
            {name}
        </span>
    );
}

const themeMaps = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50",
    green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200/50 dark:border-green-700/50",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200/50 dark:border-yellow-700/50",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50",
};

// 技术栈展示组件
export function TechStack() {
    const technologies = [
        {
            name: "React",
            className: themeMaps.blue,
        },
        {
            name: "Next.js",
            className: themeMaps.blue,
        },
        {
            name: "TypeScript",
            className: themeMaps.yellow,
        },
        {
            name: "Shadcn UI",
            className: themeMaps.yellow,
        },
        {
            name: "Tailwind CSS",
            className: themeMaps.green,
        },
        {
            name: "Node.js",
            className: themeMaps.green,
        },
        {
            name: "Java",
            className: themeMaps.gray,
        },
        {
            name: "Docker",
            className: themeMaps.gray,
        },
    ];

    return (
        <div
            className="text-center mb-12 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
        >
            <div className="flex flex-wrap justify-center gap-2">
                {technologies.map((tech, index) => (
                    <TechTag
                        key={index}
                        name={tech.name}
                        className={tech.className}
                    />
                ))}
            </div>
        </div>
    );
}
