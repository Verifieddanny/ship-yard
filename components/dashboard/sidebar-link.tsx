export default function SidebarLink({ icon, label, active = false, small = false }: any) {
    return (
        <a className={`
      flex items-center gap-3 px-3 py-2 rounded-md transition-all cursor-pointer
      ${active ? 'bg-white/5 text-brand' : 'text-gray-400 hover:text-white hover:bg-white/5'}
      ${small ? 'text-[11px] font-mono tracking-wider' : 'text-xs font-bold'}
    `}
            href={label.toLowerCase() === 'projects' ? '/dashboard' : `/dashboard/${label.toLowerCase()}`}>
            {icon} <span>{label}</span>
        </a>
    );
}
