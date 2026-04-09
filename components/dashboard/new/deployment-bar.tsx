import { Rocket, Loader2 } from 'lucide-react'

function DeploymentBar({ deploy, isPending }: { deploy: () => void; isPending: boolean }) {
    return (
        <div className="fixed bottom-0 md:left-64 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/5 px-8 py-4 flex items-center justify-between z-50">
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isPending ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {isPending ? 'Communicating with GitHub...' : 'System Ready'}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <button
                    disabled={isPending}
                    type='button'
                    className="text-xs font-bold text-gray-500 hover:text-white transition-colors disabled:opacity-30"
                >
                    Cancel
                </button>
                <button
                    onClick={deploy}
                    disabled={isPending}
                    type='button'
                    className="bg-brand cursor-pointer text-black font-bold md:px-8 md:py-2.5 px-3 py-2 rounded-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:opacity-50 disabled:cursor-wait"
                >
                    {isPending ? (
                        <>Processing <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                        <>Deploy Project <Rocket size={18} /></>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeploymentBar;
