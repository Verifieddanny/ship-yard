function ConfigInput({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</label>
            <input
                title={value}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-300 outline-none focus:border-brand/40"
                defaultValue={value}
            />
        </div>
    );
}

export default ConfigInput