import { Database, Terminal } from "lucide-react"

function Footer() {
    return (
        <footer className="px-4 md:px-8 py-6 border-t border-white/5 flex flex-col md:flex-row gap-4 justify-between text-[10px] md:text-[11px] text-gray-500 font-mono uppercase tracking-widest">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <span>Built with ❤️ by DevDanny</span>
            </div>
            <div className="flex gap-4 justify-center">
                <Terminal size={14} className="hover:text-white cursor-pointer" />
                <Database size={14} className="hover:text-white cursor-pointer" />
            </div>
        </footer>
    )
}

export default Footer