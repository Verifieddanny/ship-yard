import { MessageCircleWarningIcon } from "lucide-react";

function ProjectCard({ name, repo, status, meta, progress, error, errorMessage, emptyState, segments, viewMode }: any) {
    const statusColors: any = {
        RUNNING: 'bg-blue-500/10 text-blue-400',
        FAILED: 'bg-red-500/10 text-red-400',
        PASSED: 'bg-emerald-500/10 text-emerald-400',
        QUEUED: 'bg-gray-500/10 text-gray-400',
    };

    const isList = viewMode === 'list';

    return (
        <div className={`
      bg-[#141414] border cursor-pointer border-white/5 rounded-xl p-6 hover:border-white/10 transition-all
      ${isList ? 'flex items-center justify-between space-y-0 gap-6' : 'space-y-6 flex-col'}
    `}>
            <div className={`flex ${isList ? 'flex-row items-center gap-8 flex-1' : 'flex-col'}`}>
                <div className="min-w-50">
                    <h4 className="font-bold text-lg">{name}</h4>
                    <p className="text-[11px] text-gray-500 font-mono uppercase">github.com/{repo}</p>
                </div>

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full w-fit ${statusColors[status]}`}>
                    ● {status}
                </span>

                {isList && meta && <p className="text-[10px] text-gray-500 flex-1">{meta}</p>}
            </div>

            <div className={`${isList ? 'w-64' : 'w-full'}`}>
                {progress && (
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="bg-brand h-full" style={{ width: `${progress}%` }} />
                    </div>
                )}
                {error && !isList && (<div>

                    <p className="text-[10px] text-[#FFB4AB] truncate mb-3 flex items-center gap-1">
                        <MessageCircleWarningIcon size={10} />
                        {error}</p>

                    <div className="bg-[#0E0E0E] w-full h-[3.8rem]">
                        <p className="text-[10px] text-[#FFB4AB]/60 font-display p-4 ">{errorMessage}</p>
                    </div>
                </div>


                )}
            </div>
        </div>
    );
}

export default ProjectCard