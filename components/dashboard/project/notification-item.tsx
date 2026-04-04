function NotificationItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="bg-[#111] border border-white/5 rounded-xl p-4 flex gap-3 items-start">
            <div className="mt-0.5 shrink-0">{icon}</div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{text}</p>
        </div>
    );
}

export default NotificationItem