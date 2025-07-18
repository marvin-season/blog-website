// 技术标签组件
function TechTag({ name, color }: { name: string; color: string }) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 dark:bg-${color}-900/30 dark:text-${color}-300 border border-${color}-200/50 dark:border-${color}-700/50`}
        >
            {name}
        </span>
    );
}

// 技术栈展示组件
export function TechStack() {
    const technologies = [
        { name: "React", color: "blue" },
        { name: "TypeScript", color: "blue" },
        { name: "Node.js", color: "green" },
        { name: "Python", color: "yellow" },
        { name: "Docker", color: "blue" },
        { name: "AWS", color: "orange" },
    ];

    return (
        <div
            className="text-center mb-12 animate-slide-up"
            style={{ animationDelay: "0.5s" }}
        >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                技术栈
            </p>
            <div className="flex flex-wrap justify-center gap-2">
                {technologies.map((tech, index) => (
                    <TechTag key={index} name={tech.name} color={tech.color} />
                ))}
            </div>
        </div>
    );
}
