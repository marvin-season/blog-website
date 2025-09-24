// 键盘快捷键提示组件
export function DecorativeBackground() {
    return (
        <>
            <div className="absolute top-20 left-20 w-96 h-96 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div
                className="absolute top-40 right-20 w-96 h-96 bg-secondary-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"
                style={{ animationDelay: "1s" }}
            ></div>
            <div
                className="absolute -bottom-8 left-40 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"
                style={{ animationDelay: "2s" }}
            ></div>
        </>
    );
}
