function LogLine({ line, type, text, className = "" }: { line: string; type: "info" | "success" | "error" | undefined; text: string; className?: string }) {
    const typeColors: Record<string, string> = {
        info: 'text-blue-400',
        success: 'text-emerald-400',
        error: 'text-red-400',
    };

    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const formatText = (content: string) => {
        const parts = content.split(urlRegex);
        return parts.map((part, i) =>
            urlRegex.test(part) ? (
                <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-brand underline hover:text-white transition-colors">
                    {part}
                </a>
            ) : part
        );
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
                <span className={`text-gray-300 break-all ${className}`}>{formatText(text)}</span>
            </div>
        </div>
    );
}

export default LogLine