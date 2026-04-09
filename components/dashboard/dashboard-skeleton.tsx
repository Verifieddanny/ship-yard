export default function DashboardSkeleton() {
    return (
        <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">

            <div className="hidden lg:flex w-64 border-r border-white/5 flex-col p-6 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded-lg animate-pulse" />
                    <div className="w-24 h-4 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="space-y-4 pt-10">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full h-10 bg-white/5 rounded-md animate-pulse" />
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between">
                    <div className="w-64 h-8 bg-white/5 rounded-md animate-pulse" />
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-8 bg-white/5 rounded-md animate-pulse" />
                        <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <div className="w-32 h-3 bg-white/5 rounded animate-pulse" />
                            <div className="w-64 h-10 bg-white/5 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}