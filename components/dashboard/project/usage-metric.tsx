function UsageMetric({ label, value, progress }: { label: string; value: string; progress: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[11px]">
                <span className="text-gray-500 font-sans">{label}</span>
                <span className="font-mono text-white">{value}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}

export default UsageMetric