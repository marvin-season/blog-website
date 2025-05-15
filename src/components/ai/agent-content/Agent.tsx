import { useState } from "react";

const Agent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const status = props['data-status'];
    const description = props['data-description'];
    const [collapsed, setCollapsed] = useState(false);
    const isLoading = status === 'loading';

    return (
        <div
            className="rounded-lg p-4 bg-gray-50 shadow my-4 font-sans text-gray-900"
            {...props}
        >
            <div className="text-sm text-gray-600 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    Status:
                    <strong className="text-gray-800">{status}</strong>
                    {isLoading && (
                        <span className="animate-spin inline-block w-3 h-3 border-2 border-t-transparent border-gray-500 rounded-full" />
                    )}
                </div>
                <div className="text-xs text-gray-400">{'Agent'}</div>
            </div>
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-xs text-blue-600 hover:underline mb-2"
            >
                {collapsed ? '展开内容' : '收起内容'}
            </button>
            {!collapsed && <div className="text-xs text-gray-400 leading-relaxed">{description}</div>}
        </div>
    );
}

export default Agent;