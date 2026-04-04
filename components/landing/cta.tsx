import React from 'react';

export default function CTA() {
  return (
    <section className="py-32 bg-background relative">
   
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tight">
              Ready to ship?
            </h2>
            <p className="text-[#BEC8D2] font-sans text-lg md:text-xl">
              Join 10,000+ developers deploying on Shipyard today.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              type="button" 
              className="group relative bg-linear-to-br from-[#89CEFF] to-[#0EA5E9] cursor-pointer text-black font-bold py-4 px-12 rounded-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(137,206,255,0.3)] hover:shadow-[0_0_30px_rgba(137,206,255,0.5)]"
            >
              Sign Up for Free
            </button>
            
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
              No credit card required
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}