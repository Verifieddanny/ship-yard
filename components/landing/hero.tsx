import { ArrowRight, CheckCircle2Icon } from 'lucide-react';

interface HeroProps {
  onOpenAuth: () => void;
}
export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className=" text-white py-20 lg:py-32 font-mono">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-display text-xs uppercase tracking-widest text-[#89CEFF]">
              Deployment Orchestration
            </p>
            <h1 className="text-6xl md:text-[4.5rem] font-bold leading-[0.9] tracking-tighter font-sans">
              From <span className="text-brand">git push</span> to<br /> live in seconds
            </h1>
            <p className="text-[#BEC8D2] text-lg md:text-xl max-w-md leading-relaxed font-sans">
              Shipyard is the zero-config infrastructure layer for modern engineering teams.
              Automate your entire pipeline with Shipyard's orchestration engine.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-sans">
            <button onClick={onOpenAuth} type='button' className="bg-linear-to-br from-[#89CEFF] to-[#0EA5E9] cursor-pointer hover:bg-sky-400 text-black font-bold py-4 px-8 rounded-md flex items-center gap-2 transition-colors duration-200">
              Get Started Free <ArrowRight size={20} />
            </button>
            {/* <button type='button' className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-md transition-all border border-white/5">
              View Documentation
            </button> */}
          </div>
        </div>

        {/* Right Terminal Mockup */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-brand/20 blur-3xl rounded-xl opacity-80 group-hover:opacity-100 transition-opacity"></div>

          <div className="relative bg-terminal border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-[13px]">
            <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-gray-500 text-xs ml-4">bash — shipyard deploy</span>
            </div>

            <div className="p-6 space-y-4 leading-relaxed">
              <div className="flex gap-2">
                <span className="text-[#89CEFF]">$</span>
                <span>git push shipyard main</span>
              </div>

              <div className="text-gray-500">
                <p>Enumerating objects: 14, done.</p>
                <p>Writing objects: 100% (14/14), 1.2 KiB | 1.2 MiB/s, done.</p>
              </div>

              <div className="flex items-center gap-2 text-emerald-400">
                <span className="animate-pulse">⟲</span>
                <span>Analyzing codebase...</span>
              </div>

              <div className="bg-white/5 border-l-2 border-brand p-2 pl-4">
                <span className="text-brand">[build]</span> Step 1/4: Generating Dockerfile...

              </div>
              <div className="text-gray-500 mt-1 ml-6">
                <p>Detected: Node.js 18.x with Vite</p>
                <p>Building layer for standard-linux-x64</p>
              </div>

              <div className="flex items-center gap-2 text-emerald-400">
                <span><CheckCircle2Icon height={12} width={12} /></span>
                <span>Build finished in 4.2s</span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <span className="text-gray-500">public</span>
                <span>Live at: <span className="underline text-brand cursor-pointer">shipyard.app/project-alpha</span></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}