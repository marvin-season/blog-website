// 统计卡片组件 - 现代化设计
export function StatCard({
    number,
    label,
    icon,
}: {
    number: string;
    label: string;
    icon: string;
}) {
    return (
        <div className="group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    {number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {label}
                </div>
                <div className="text-2xl mt-2 text-primary-500/60 dark:text-primary-400/60">
                    {icon}
                </div>
            </div>
        </div>
    );
}
