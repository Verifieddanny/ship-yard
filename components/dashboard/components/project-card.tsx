import { statusColors } from "@/lib/status-color";
import { MessageCircleWarningIcon, ExternalLink, Activity, Zap } from "lucide-react";

function ProjectCard({ name, repo, status, meta, progress, error, errorMessage, deployedUrl, viewMode }: { name: string; repo: string; status: string; meta?: string; progress?: string; error: string | undefined; errorMessage: string; deployedUrl: string; viewMode: string }) {


    const isList = viewMode === 'list';
    const isPassed = status.toUpperCase() === 'PASSED';

    return (
        <div className={`
            bg-[#141414] border cursor-pointer border-white/5 rounded-xl p-6 hover:border-white/10 transition-all
            ${isList ? 'flex items-center justify-between space-y-0 gap-6' : 'space-y-6 flex-col'}
        `}>
            <div className={`flex ${isList ? 'flex-row items-center gap-8 flex-1' : 'flex-col'}`}>
                <div className="min-w-50">
                    <h4 className="font-bold text-lg">{name}</h4>
                    <p className="text-[11px] text-gray-500 font-mono truncate max-w-50">
                        {repo.replace('https://', '')}
                    </p>
                </div>

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full w-fit ${statusColors[status]}`}>
                    ● {status}
                </span>

                {isList && meta && <p className="text-[10px] text-gray-500 flex-1">{meta}</p>}
            </div>

            <div className={`${isList ? 'w-64' : 'w-full'}`}>
                {status.toUpperCase() === 'RUNNING' && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-mono text-blue-400 animate-pulse">
                            <span>OPTIMIZING ASSETS...</span>
                            <span>{progress || 70}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-brand h-full transition-all duration-500" style={{ width: `${progress || 70}%` }} />
                        </div>
                    </div>
                )}

                {error && !isList && (
                    <div>
                        <p className="text-[10px] text-[#FFB4AB] truncate mb-3 flex items-center gap-1">
                            <MessageCircleWarningIcon size={10} />
                            {error}
                        </p>
                        <div className="bg-[#0E0E0E] w-full h-[3.8rem] rounded-md border border-white/5 overflow-hidden">
                            <p className="text-[10px] text-[#FFB4AB]/60 font-mono p-4 line-clamp-2">{errorMessage}</p>
                        </div>
                    </div>
                )}

                {isPassed && !isList && (
                    <div className="space-y-4 animate-in fade-in duration-700">
                        <div className="flex items-center justify-between py-2 border-y border-white/5">
                            <div className="flex items-center gap-2">
                                <Activity size={12} className="text-emerald-500" />
                                <span className="text-[10px] text-gray-400 font-mono">HEALTHY</span>
                            </div>
                           
                        </div>
                        <a
                            href={deployedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold py-2 rounded-lg transition-colors group"
                        >
                            VIEW PRODUCTION <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ProjectCard;