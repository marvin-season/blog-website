// 特性卡片组件
export function FeatureCard({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: string;
}) {
    return (
        <div className="group p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
