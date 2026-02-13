import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#f8f6f6] dark:bg-[#211111] font-display text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#ea2a33] rounded-xl flex items-center justify-center shadow-lg shadow-[#ea2a33]/20">
            <span className="material-icons text-white">lock_heart</span>
          </div>
          <span className="text-xl font-bold tracking-tight">VAULT</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <a className="hover:text-[#ea2a33] transition-colors" href="#">
            How it works
          </a>
          <a className="hover:text-[#ea2a33] transition-colors" href="#">
            Security
          </a>
          <a className="hover:text-[#ea2a33] transition-colors" href="#">
            Gallery
          </a>
        </div>
        <button className="bg-[#ea2a33]/10 text-[#ea2a33] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#ea2a33] hover:text-white transition-all">
          Sign In
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
          {/* Left Side: Content & CTA */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#ea2a33]/10 text-[#ea2a33] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#ea2a33]/20">
              <span className="material-icons text-sm">security</span>
              End-to-End Encrypted
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Give a Memory, <span className="text-[#ea2a33]">Not Just</span> a
              Moment.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Create a private, encrypted digital keepsake for your Valentine. A
              permanent vault for your most cherished photos, notes, and dates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* NOTE: I changed this to a Link so it routes to your creation page */}
              <Link
                to="/create"
                className="bg-[#ea2a33] text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-[#ea2a33]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Create & Pay $5
                <span className="material-icons">arrow_forward</span>
              </Link>
              <div className="flex items-center gap-3 px-2">
                <div className="text-sm font-medium text-slate-500">
                  <span className="text-slate-900 dark:text-white font-bold">
                    12k+
                  </span>{" "}
                  Vaults created
                </div>
              </div>
            </div>

            {/* Theme Selection Sub-section */}
            <div className="pt-10 space-y-6">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Choose Your Style
                </h3>
                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button className="group relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#ea2a33] ring-4 ring-[#ea2a33]/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff758c] to-[#ff7eb3]"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                    <span className="text-white text-[10px] font-bold uppercase leading-none">
                      Classic Romance
                    </span>
                  </div>
                </button>
                <button className="group relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-transparent hover:border-slate-300 transition-all">
                  <div className="absolute inset-0 bg-[#0f172a]">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent)]"></div>
                  </div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                    <span className="text-white text-[10px] font-bold uppercase leading-none">
                      Midnight Starlight
                    </span>
                  </div>
                </button>
                <button className="group relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-transparent hover:border-slate-300 transition-all">
                  <div className="absolute inset-0 bg-[#f4f1ea]">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                  </div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/20 to-transparent">
                    <span className="text-slate-800 text-[10px] font-bold uppercase leading-none">
                      Vintage Polaroid
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#ea2a33]/5 via-[#ea2a33]/0 to-[#ea2a33]/10 rounded-full blur-3xl -z-10"></div>
            <div className="relative w-[320px] h-[650px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl ring-8 ring-slate-800/50">
              <div className="w-full h-full bg-[#f8f6f6] rounded-[2.2rem] overflow-hidden relative border-4 border-slate-900">
                <div className="bg-gradient-to-b from-[#fff5f5] to-white min-h-full pt-10 px-6">
                  <div className="text-center mb-6">
                    <h4 className="text-[#ea2a33] font-bold text-xs uppercase tracking-widest mb-1">
                      Our Journey
                    </h4>
                    <h2 className="text-2xl font-extrabold text-slate-800">
                      Sarah & James
                    </h2>
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-pink-100 rotate-1 mb-4">
                    <div className="aspect-square rounded-xl bg-pink-100 overflow-hidden mb-3"></div>
                    <p className="text-[12px] font-medium text-slate-500 italic">
                      "The day we finally met at the airport. Best day ever."
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-[#ea2a33]/20 flex items-center gap-2">
                  <span className="material-icons text-[#ea2a33] text-sm">
                    lock
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">
                    Secure Vault
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
