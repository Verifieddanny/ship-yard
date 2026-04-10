export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                    <div className="space-y-4">
                        <p className="text-gray-400 font-sans text-sm">
                            Built with <span className="text-red-500">❤️</span> by DevDanny
                        </p>
                       
                    </div>

                    <div className="flex flex-wrap gap-8 items-center">
                        <a
                            href="https://github.com/Verifieddanny"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                        >
                            <span>Github</span>
                        </a>

                        <a
                            href="https://x.com/dannyclassi_c"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                        >
                            <span>X / Twitter</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/devdanny0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                        >
                            <span>Linkedin</span>
                        </a>

                        <a
                            href="https://tiktok.com/@verifieddanny"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                        >
                            <span>Tiktok</span>
                        </a>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-[10px] uppercase font-mono tracking-widest">
                        © {currentYear} Shipyard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}