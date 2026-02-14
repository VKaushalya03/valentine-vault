import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#fdfaf3] flex flex-col items-center justify-center font-display relative overflow-hidden">
      {/* Subtle background dots to match the app's aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ea2a3310 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Decryptor Ring & Heart */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Faded background track */}
          <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>

          {/* Spinning red loader ring */}
          <div className="absolute inset-0 border-4 border-[#ea2a33] rounded-full border-t-transparent animate-spin"></div>

          {/* Pulsing inner heart */}
          <div className="w-14 h-14 bg-gradient-to-tr from-[#ea2a33] to-[#ff758c] rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-[#ea2a33]/40">
            <span className="material-icons text-white text-2xl">favorite</span>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2 animate-pulse">
          Locating Vault...
        </h2>

        {/* Security Subtitle */}
        <div className="flex items-center gap-1.5 text-[#ea2a33] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
          <span className="material-icons text-[12px]">
            enhanced_encryption
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest">
            Establishing Secure Connection
          </p>
        </div>
      </div>
    </div>
  );
}
