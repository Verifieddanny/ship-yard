import { CheckCircle2, XCircle } from "lucide-react";

function BuildRow({ status, commit, id, time, color }: { status: string; commit: string; id: string; time: string; color: string }) {
    return (
        <div className="px-6 py-5 flex items-center justify-between hover:bg-white/2 transition-colors group">
            <div className="flex items-center gap-12 flex-1">
                <div className={`flex items-center gap-2 text-xs font-bold w-24 ${color}`}>
                    {status === 'Success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {status}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white">{commit}</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase mt-1">
                        <span className="text-gray-400">{id}</span> by @devdanny
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <span className="text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-gray-400 uppercase">main</span>
                <span className="text-xs font-mono text-gray-500 w-16 text-right">{time}</span>
            </div>
        </div>
    );
}

export default BuildRow;