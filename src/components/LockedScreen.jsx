import React from "react";

export default function LockedScreen({
  theme,
  vaultData, // Bringing this back to show the partner's name!
  password,
  setPassword,
  handleUnlock,
  error,
}) {
  // Dynamic styles so the premium glass effect matches their chosen theme
  const isDark = theme.bg === "bg-[#0a0a14]";
  const cardBg = isDark
    ? "bg-slate-900/60 border-cyan-900/50"
    : "bg-white/60 border-white/50";
  const inputBg = isDark
    ? "bg-slate-800 border-slate-700 text-white"
    : "bg-white/80 border-white text-gray-800";
  const iconBg = isDark
    ? "from-cyan-600 to-blue-900 shadow-cyan-500/30"
    : "from-[#ea2a33] to-[#ff758c] shadow-[#ea2a33]/30";

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-8 ${theme.bg} font-display relative overflow-hidden transition-colors duration-500`}
    >
      {/* Decorative background blur orbs */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? "bg-cyan-500" : "bg-[#ea2a33]"} rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse pointer-events-none`}
      ></div>
      <div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? "bg-blue-600" : "bg-pink-400"} rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none`}
      ></div>

      {/* Premium Glass Card */}
      <div
        className={`w-full max-w-lg ${cardBg} backdrop-blur-xl rounded-[2.5rem] shadow-2xl border p-8 sm:p-12 text-center relative z-10`}
      >
        <div className="mb-10 relative">
          <div
            className={`w-24 h-24 bg-gradient-to-tr ${iconBg} rounded-[2rem] flex items-center justify-center shadow-xl mb-6 mx-auto transform rotate-3 hover:rotate-0 transition-transform`}
          >
            <span className="material-icons text-white text-5xl">favorite</span>
          </div>
          <h2
            className={`text-3xl font-extrabold ${theme.text} mb-2 tracking-tight`}
          >
            Memory Vault
          </h2>
          <p
            className={`${theme.accent} font-bold uppercase tracking-widest text-xs`}
          >
            For {vaultData?.recipient_name || "My Valentine"}
          </p>
        </div>

        <form onSubmit={handleUnlock} className="w-full space-y-6">
          <div className="space-y-2 text-left relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-14 pl-12 pr-6 ${inputBg} rounded-2xl shadow-inner focus:ring-2 focus:ring-opacity-50 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium`}
              placeholder="Enter secret password..."
              type="password"
              required
            />
            {/* The little key icon inside the input! */}
            <span className="material-icons absolute left-4 top-[14px] text-gray-400">
              key
            </span>
          </div>

          {error && (
            <p className="text-[#ea2a33] text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-[#ea2a33] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Unlock Memories{" "}
            <span className="material-icons text-sm">lock_open</span>
          </button>
        </form>

        <div
          className={`mt-8 pt-6 border-t ${isDark ? "border-slate-800" : "border-slate-200/50"} flex items-center justify-center gap-2 text-[10px] ${theme.text} opacity-60 uppercase tracking-widest font-bold`}
        >
          <span className="material-icons text-xs text-green-500">
            verified_user
          </span>
          AES-256 Encrypted
        </div>
      </div>
    </div>
  );
}
