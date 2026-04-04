function LogLine({ line, type, text, className = "" }: any) {
    const typeColors: any = {
        info: 'text-blue-400',
        success: 'text-emerald-400',
        error: 'text-red-400',
    };

    return (
        <div className="flex gap-4 hover:bg-white/5 transition-colors group">
            <span className="text-gray-700 w-6 text-right select-none shrink-0 tabular-nums">
                {line}
            </span>
            <div className="flex gap-2 min-w-0">
                {type && (
                    <span className={`font-bold shrink-0 ${typeColors[type]}`}>
                        [{type}]
                    </span>
                )}
                <span className={`text-gray-300 break-all ${className}`}>{text}</span>
            </div>
        </div>
    );
}

export default LogLine