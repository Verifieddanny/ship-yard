import { Globe, Clock, Link, Undo2Icon } from "lucide-react";

interface DeploymentRowProps {
    id: number;
    status: string;
    commit: string;
    date: string;
    latest: boolean;
    prevDeploymentId?: number | null;
    onRollback?: (currentId: number, prev: number) => void;
}

export default function DeploymentRow({

    id,
    status,
    commit,
    date,
    latest,
    prevDeploymentId,
    onRollback
}: DeploymentRowProps) {
    return (
        <div className="px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-12 flex-1">
                {latest ? (
                    <div className="flex items-center gap-2 text-xs font-bold w-24 text-emerald-400">
                        <Globe size={16} />
                        {status.toUpperCase()}
                    </div>
                ) : (
                    <div className={`flex items-center gap-2 text-xs font-bold w-24 ${status === "rolled_back" ? "text-orange-400" : "text-gray-700"}`}>
                        {status === "rolled_back" ? <Undo2Icon size={16} /> : <Link size={16} />}
                        {status === "rolled_back" ? "ROLLED BACK" : "DEPLOYED"}
                    </div>
                )}

                <div className="flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase mt-1">
                        Linked to <span className="text-gray-400">{commit.substring(0, 25)}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {latest && prevDeploymentId && (
                    <button
                        type="button"
                        onClick={() => onRollback?.(id, prevDeploymentId)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-orange-500/20 hover:text-orange-400 border border-white/10 hover:border-orange-500/50 text-[10px] font-bold transition-all uppercase cursor-pointer"
                    >
                        <Undo2Icon size={12} />
                        Rollback
                    </button>
                )}

                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <Clock size={12} />
                    {date}
                </div>
            </div>
        </div>
    );
}