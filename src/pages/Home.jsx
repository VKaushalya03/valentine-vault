import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#fdfaf3] dark:bg-[#121212] font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-hidden">
      {/* Very subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ea2a3310 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          {/* LOGO: Heart with a Keyhole */}
          <div className="w-10 h-10 bg-gradient-to-tr from-[#ea2a33] to-[#ff758c] rounded-xl flex items-center justify-center shadow-lg shadow-[#ea2a33]/30 overflow-hidden relative">
            <span className="material-icons text-white text-2xl">favorite</span>
            <svg
              className="absolute w-2.5 h-4 text-[#ea2a33] top-[11px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C9.24 2 7 4.24 7 7C7 8.95 8.12 10.63 9.77 11.47L8.5 18H11V20H13V18H15.5L14.23 11.47C15.88 10.63 17 8.95 17 7C17 4.24 14.76 2 12 2ZM12 9C10.9 9 10 8.1 10 7C10 5.9 10.9 5 12 5C13.1 5 14 5.9 14 7C14 8.1 13.1 9 12 9Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">VAULT</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-grow w-full">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
            {/* Left Side: Content & CTA */}
            <div className="space-y-8 relative">
              <div className="inline-flex items-center gap-2 bg-[#ea2a33]/10 text-[#ea2a33] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#ea2a33]/20 backdrop-blur-sm">
                <span className="material-icons text-sm">security</span>
                End-to-End Encrypted
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Give a Memory, <span className="text-[#ea2a33]">Not Just</span>{" "}
                a Moment.
              </h1>

              <div className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Create a private, encrypted digital keepsake for your Valentine.
                A permanent vault for your most cherished photos, notes, and
                dates.
                <span className="block mt-4 font-bold text-[#ea2a33] bg-pink-100 dark:bg-[#ea2a33]/20 p-3 rounded-xl text-center border border-pink-200 shadow-sm">
                  🎁 100% Free for Valentine's Day!
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/create"
                  className="bg-[#ea2a33] text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-[#ea2a33]/30 hover:scale-[1.02] hover:bg-[#d41f27] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  Create Your Free Vault
                  <span className="material-icons group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side: Completed Mobile Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#ea2a33]/10 via-[#ea2a33]/0 to-[#ea2a33]/10 rounded-full blur-3xl -z-10"></div>

              <div className="relative w-[320px] h-[650px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl ring-8 ring-slate-800/50 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800 mr-1"></div>
                </div>

                <div className="w-full h-full bg-[#fdfaf3] rounded-[2.2rem] overflow-hidden relative border-4 border-black shadow-inner">
                  <div className="absolute top-0 inset-x-0 h-10 flex justify-between items-center px-6 pt-1 text-[10px] font-bold text-slate-800 z-20">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <span className="material-icons text-[10px]">
                        signal_cellular_4_bar
                      </span>
                      <span className="material-icons text-[10px]">wifi</span>
                      <span className="material-icons text-[10px]">
                        battery_full
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-[#fff5f5] to-[#fdfaf3] h-full w-full pt-16 px-5 pb-20 relative">
                    <div className="absolute inset-0 pointer-events-none opacity-5">
                      <svg
                        className="absolute -top-10 -right-10 w-40 h-40 text-[#ea2a33] transform -rotate-45"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L6 21c1.5-2.5 4-5 8-5h1c4 0 6-3 6-5 0-2-2-3-4-3zm-2 11c-2.32 0-4.57.85-6.38 2.38l1.32 1.2A8.995 8.995 0 0 1 15 20h1c.5 0 .96.1 1.4.27l1.1-1.68c-.76-.38-1.6-.59-2.5-.59h-1z" />
                      </svg>
                    </div>

                    <div className="text-center mb-6 relative z-10">
                      <div className="inline-flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-pink-100 shadow-sm mb-3">
                        <span className="material-icons text-[#ea2a33] text-[10px]">
                          lock_open
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-[#ea2a33] font-bold">
                          Unlocked
                        </span>
                      </div>
                      <h2
                        className="text-4xl font-handwritten font-bold text-slate-800"
                        style={{ fontFamily: '"Caveat", cursive' }}
                      >
                        For Sarah
                      </h2>
                    </div>

                    <div className="bg-white p-3 pb-10 rounded-sm shadow-xl border border-slate-200 rotate-2 relative z-10 group">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/50 backdrop-blur-md border border-white/30 shadow-sm rotate-1 z-20"></div>
                      <div className="aspect-square bg-slate-100 overflow-hidden rounded-sm mb-3 border border-slate-200/50 shadow-inner">
                        <img
                          src="/couple.png"
                          alt="Happy Couple"
                          className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex flex-col h-full justify-between">
                        <p
                          className="text-[20px] font-handwritten text-center leading-tight text-slate-700"
                          style={{ fontFamily: '"Caveat", cursive' }}
                        >
                          The day we finally met at the airport.
                        </p>
                        <div className="text-right mt-2">
                          <span className="text-[8px] font-mono font-bold tracking-widest text-[#ea2a33] opacity-60 border-b border-dashed border-[#ea2a33] pb-0.5">
                            FEB 14, 2026
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-800 rounded-full z-30"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-200/50 max-w-7xl mx-auto" />

        {/* HOW IT WORKS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Three simple steps to create a digital memory that lasts forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 text-[#ea2a33]">
                <span className="material-icons text-3xl">favorite_border</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                1. Write Your Heart Out
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Upload your favorite photos, add custom dates, and write a
                beautiful message for your partner.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 text-[#ea2a33]">
                <span className="material-icons text-3xl">
                  enhanced_encryption
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                2. Lock & Encrypt
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Set a secret password. Your vault is encrypted locally—meaning
                not even we can see your photos.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 text-[#ea2a33]">
                <span className="material-icons text-3xl">send</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                3. Send the Link
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Share the unique link and password with your partner. When they
                unlock it, the memories come alive.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-200/50 max-w-7xl mx-auto" />

        {/* THEMES SECTION (Moved out of hero to fill space!) */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-[#ea2a33] font-bold tracking-widest text-xs uppercase mb-2 block">
              Personalize It
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Beautiful Themes Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Classic Theme Card */}
            <Link
              to="/create"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 hover:border-[#ea2a33] shadow-lg hover:shadow-2xl hover:shadow-[#ea2a33]/20 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff758c] to-[#ff7eb3]"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 text-7xl drop-shadow-lg">
                ❤️
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <span className="text-white text-lg font-bold uppercase tracking-widest mb-1">
                  Classic Romance
                </span>
                <span className="text-pink-200 text-xs uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Floating Hearts Animation
                </span>
              </div>
            </Link>

            {/* Midnight Theme Card */}
            <Link
              to="/create"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 hover:border-cyan-500 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[#0f172a]">
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent)]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 text-7xl drop-shadow-lg">
                ✨
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <span className="text-white text-lg font-bold uppercase tracking-widest mb-1">
                  Midnight Sky
                </span>
                <span className="text-cyan-300 text-xs uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Starry Night Animation
                </span>
              </div>
            </Link>

            {/* Vintage Theme Card */}
            <Link
              to="/create"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-600 shadow-lg hover:shadow-2xl hover:shadow-amber-600/20 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[#f4f1ea]">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 text-7xl drop-shadow-lg">
                🌸
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                <span className="text-white text-lg font-bold uppercase tracking-widest mb-1">
                  Vintage Polaroid
                </span>
                <span className="text-amber-200 text-xs uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Cherry Blossom Animation
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Professional Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-[#fdfaf3]/80 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#ea2a33] rounded-md flex items-center justify-center">
              <span className="material-icons text-white text-[12px]">
                favorite
              </span>
            </div>
            <span className="text-sm font-bold tracking-widest text-slate-500">
              VAULT © 2026
            </span>
          </div>
          <div className="flex gap-6 text-sm font-bold text-slate-400 uppercase tracking-wider text-[10px]">
            <Link
              to="/create"
              className="hover:text-[#ea2a33] transition-colors"
            >
              Create
            </Link>
            <a href="#" className="hover:text-[#ea2a33] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#ea2a33] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
