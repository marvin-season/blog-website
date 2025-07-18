import Layout from "@theme/Layout";

export default function TestTheme(): React.JSX.Element {
    return (
        <Layout title="主题测试" description="测试亮色主题下的文字对比度">
            <div className="container margin-vert--lg">
                <h1 className="text-4xl font-bold mb-8">主题对比度测试</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 文字对比度测试 */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            文字对比度
                        </h2>
                        <p className="text-base mb-4">
                            这是普通段落文字，应该清晰可见。
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            这是次要文字，应该有适当的对比度。
                        </p>
                        <a
                            href="#"
                            className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                        >
                            这是一个链接，hover时应该有明显的颜色变化
                        </a>
                    </div>

                    {/* 代码块测试 */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-semibold mb-4">代码块</h2>
                        <code className="text-sm">
                            const example = "代码文字应该清晰可见";
                        </code>
                        <pre className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <code>
                                {`function test() {
  console.log("代码块测试");
}`}
                            </code>
                        </pre>
                    </div>

                    {/* 表格测试 */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-semibold mb-4">表格</h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">标题1</th>
                                    <th className="text-left p-2">标题2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">内容1</td>
                                    <td className="p-2">内容2</td>
                                </tr>
                                <tr>
                                    <td className="p-2">内容3</td>
                                    <td className="p-2">内容4</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 按钮测试 */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-semibold mb-4">按钮</h2>
                        <div className="space-y-4">
                            <button className="button">主要按钮</button>
                            <button className="button button--secondary">
                                次要按钮
                            </button>
                        </div>
                    </div>
                </div>

                {/* 导航栏测试 */}
                <div className="card p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4">导航栏样式</h2>
                    <nav className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            导航链接1
                        </a>
                        <a
                            href="#"
                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            导航链接2
                        </a>
                        <a
                            href="#"
                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            导航链接3
                        </a>
                    </nav>
                </div>

                {/* 侧边栏测试 */}
                <div className="card p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4">侧边栏样式</h2>
                    <div className="space-y-2">
                        <a
                            href="#"
                            className="block p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white"
                        >
                            侧边栏链接1
                        </a>
                        <a
                            href="#"
                            className="block p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white"
                        >
                            侧边栏链接2
                        </a>
                        <a
                            href="#"
                            className="block p-2 rounded bg-blue-600 text-white"
                        >
                            活动链接
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
