// 最近活动时间线组件
export function RecentActivity() {
    const activities = [
        {
            type: "blog",
            title: "React 18 新特性详解",
            date: "2024-01-15",
            icon: "📝",
            color: "blue",
        },
        {
            type: "code",
            title: "TypeScript 高级类型技巧",
            date: "2024-01-12",
            icon: "💻",
            color: "green",
        },
    ];

    return (
        <div
            className="max-w-2xl mx-auto mb-16 animate-slide-up"
            style={{ animationDelay: "0.8s" }}
        >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                最近更新
            </h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="group flex items-center space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    >
                        <div
                            className={`flex-shrink-0 w-10 h-10 bg-${activity.color}-100 dark:bg-${activity.color}-900/30 rounded-lg flex items-center justify-center text-lg`}
                        >
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {activity.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.date}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
