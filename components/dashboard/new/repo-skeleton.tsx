export default function RepoSkeleton() {
    return (
        <div className="space-y-2 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-5 bg-white/10 rounded" />
                        <div className="space-y-2">
                            <div className="w-32 h-4 bg-white/10 rounded" />
                            <div className="flex gap-2">
                                <div className="w-10 h-3 bg-white/10 rounded" />
                                <div className="w-16 h-3 bg-white/10 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}