import { Rocket } from 'lucide-react'

function DeploymentBar({ deploy }: { deploy: () => void }) {
    return (
        <div className="fixed bottom-0 md:left-64 left-0 right-0 bg-[#0A0A0A] border-t border-white/5 px-8 py-4 flex items-center justify-between z-50">
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Ready</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_#38bdf8] animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Validating Config...</span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <button type='button' className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Cancel</button>
                <button onClick={deploy} type='button' className="bg-brand cursor-pointer text-black font-bold md:px-8 md:py-2.5 px-3 py-2 rounded-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                    Deploy Project <Rocket size={18} />
                </button>
            </div>
        </div>
    )
}

export default DeploymentBar