
function BuildInput({ label, value, badge, icon }: { label: string; value: string; badge?: string; icon?: React.ReactNode }) {
    const inputId = `${label.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}-input`;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label htmlFor={inputId} className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{label}</label>
                {badge && <span className="text-[10px] font-mono text-emerald-400">{badge}</span>}
            </div>
            <div className="relative">
                <input
                    id={inputId}
                    type="text"
                    defaultValue={value}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-[#89CEFF] focus:outline-none focus:border-brand/50"
                />
                {icon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</div>}
            </div>
        </div>
    );
}

export default BuildInput