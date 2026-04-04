import { CheckCircle2, FolderOpen } from 'lucide-react';

function RepoItem({ name, branch, time, selected, onClick }: { name: string; branch: string; time: string; selected: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`
        group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
        ${selected ? 'bg-brand/5 border-brand' : 'bg-white/5 border-white/5 hover:border-white/20'}
      `}
        >
            <div className="flex items-center gap-4">
                <div className="text-gray-400 group-hover:text-brand transition-colors">
                    <FolderOpen size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold">{name}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                        <span className="bg-white/5 px-1.5 py-0.5 rounded text-gray-400">{branch}</span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>
            {selected && <CheckCircle2 size={18} className="text-brand" />}
        </div>
    );
}


export default RepoItem