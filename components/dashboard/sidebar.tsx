"use client"
import {Layers, LifeBuoy, LogOut, Rocket, Settings, X } from "lucide-react"
import SidebarLink from "./sidebar-link"
import { usePathname } from "next/navigation"

function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    return (
        <aside className="w-full border-r border-white/5 flex flex-col p-6 h-full bg-[#0A0A0A]">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="bg-brand p-1.5 rounded-lg">
                        <Rocket size={20} className="text-black" />
                    </div>
                    <div>
                        <h1 className="font-bold tracking-tight">Shipyard</h1>
                        <p className="text-[10px] text-gray-500 font-mono">V1.0.0-STABLE</p>
                    </div>
                </div>
                <button type="button" title="close" onClick={onClose} className="lg:hidden p-2 text-gray-500">
                    <X size={20} />
                </button>
            </div>
            <nav className="flex-1 space-y-2">
                <SidebarLink icon={<Rocket size={18} />} label="PROJECTS" active={
                    pathname === "/dashboard" ||
                    pathname === "/dashboard/new" ||
                    /^\/dashboard\/projects\/[^/]+$/.test(pathname)
                } />
                <SidebarLink icon={<Layers size={18} />} label="DEPLOYMENTS" active={pathname === "/dashboard/deployments" || /^\/dashboard\/deployments\/[^/]+$/.test(pathname)} />
                <SidebarLink icon={<Settings size={18} />} label="SETTINGS" active={pathname === "/dashboard/settings"} />
            </nav>

            <div className="pt-6 border-t border-white/5 space-y-4">
                <SidebarLink icon={<LogOut size={16} />} label="LOGOUT" small />
                <SidebarLink icon={<LifeBuoy size={16} />} label="SUPPORT" small />
            </div>
        </aside>
    )
}

export default Sidebar