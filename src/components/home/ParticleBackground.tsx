// 粒子背景组件
export function ParticleBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-400/30 dark:bg-primary-500/30 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                />
            ))}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`large-${i}`}
                    className="absolute w-1 h-1 bg-secondary-400/20 dark:bg-secondary-500/20 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${4 + Math.random() * 3}s`,
                    }}
                />
            ))}
        </div>
    );
}
