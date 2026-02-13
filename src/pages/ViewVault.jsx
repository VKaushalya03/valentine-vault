import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { decryptData } from "../lib/cryptoUtils";

// --- CUSTOM HEART RAIN COMPONENT ---

// Generate hearts outside component to avoid impure function calls during render
const generateHearts = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + "%",
    animationDuration: Math.random() * 4 + 4 + "s", // 4s to 8s fall speed
    animationDelay: Math.random() * 5 + "s", // stagger start times
    fontSize: Math.random() * 12 + 12 + "px", // 12px to 24px size
    opacity: Math.random() * 0.4 + 0.2, // subtle transparency (0.2 to 0.6)
  }));
};

const HeartRain = () => {
  // useState with lazy initialization ensures hearts are generated only once
  const [hearts] = useState(() => generateHearts());

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      <style>
        {`
          @keyframes floatDown {
            0% { transform: translateY(-10vh) rotate(0deg) translateX(0); }
            50% { transform: translateY(50vh) rotate(180deg) translateX(20px); }
            100% { transform: translateY(110vh) rotate(360deg) translateX(-20px); }
          }
          .falling-heart {
            position: absolute;
            top: -10vh;
            animation-name: floatDown;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            color: #ea2a33;
            text-shadow: 0 0 5px rgba(234, 42, 51, 0.3);
          }
        `}
      </style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="falling-heart"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            fontSize: heart.fontSize,
            opacity: heart.opacity,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};
// --- CUSTOM WATERMARK COMPONENT ---
const Watermarks = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
    <svg
      className="absolute top-10 -left-10 w-64 h-64 text-[#ea2a33] opacity-[0.04] transform rotate-12"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21.984 8.21c-.482-1.22-1.327-2.185-2.54-2.686-2.4-.99-5.3.615-6.85 2.66-1.5-1.96-4.04-3.46-6.44-2.55-1.28.485-2.2 1.55-2.62 2.87-.52 1.63-.12 3.65 1.05 5.51 1.84 2.92 5.2 6.13 7.6 8.04.24.19.58.19.82 0 2.4-1.91 5.76-5.12 7.6-8.04 1.17-1.86 1.89-4.14 1.38-5.804z" />
    </svg>
    <svg
      className="absolute -top-10 -right-10 w-80 h-80 text-[#ea2a33] opacity-[0.03] transform -rotate-45"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L6 21c1.5-2.5 4-5 8-5h1c4 0 6-3 6-5 0-2-2-3-4-3zm-2 11c-2.32 0-4.57.85-6.38 2.38l1.32 1.2A8.995 8.995 0 0 1 15 20h1c.5 0 .96.1 1.4.27l1.1-1.68c-.76-.38-1.6-.59-2.5-.59h-1z" />
    </svg>
    <svg
      className="absolute top-1/2 -left-24 w-96 h-96 text-[#ea2a33] opacity-[0.04] transform rotate-45 -translate-y-1/2"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-4c.83 0 1.5-.67 1.5-1.5S10.33 13 9.5 13 8 13.67 8 14.5 8.67 16 9.5 16zm5 0c.83 0 1.5-.67 1.5-1.5S15.33 13 14.5 13 13 13.67 13 14.5 13.67 16 14.5 16zm-2.5-6c.83 0 1.5-.67 1.5-1.5S12.33 7 11.5 7 10 7.67 10 8.5 10.67 10 11.5 10z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  </div>
);

export default function ViewVault() {
  const { id } = useParams();
  const [vaultData, setVaultData] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedContent, setDecryptedContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Audio Controls
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    async function fetchVault() {
      const { data, error } = await supabase
        .from("vaults")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) setError("Vault not found. Please check the link.");
      else setVaultData(data);
      setLoading(false);
    }
    fetchVault();
  }, [id]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const jsonString = await decryptData(
        vaultData.ciphertext,
        password,
        vaultData.salt,
        vaultData.iv,
      );
      setDecryptedContent(JSON.parse(jsonString));

      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setError("Incorrect password. Please try again.");
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-xl">
        Locating Vault...
      </div>
    );
  if (!vaultData && error)
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-[#ea2a33]">
        {error}
      </div>
    );

  // --- LOCKED SCREEN ---
  if (!decryptedContent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[#ffb6c1] via-[#ffe4e4] to-[#fce4ec] font-display relative overflow-hidden">
        <div className="w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(234,42,51,0.1)] border border-white/50 p-8 sm:p-12 text-center relative z-10">
          <div className="mb-10 relative">
            <div className="w-24 h-24 bg-gradient-to-tr from-[#ea2a33] to-[#ff758c] rounded-[2rem] flex items-center justify-center shadow-xl shadow-[#ea2a33]/30 mb-6 mx-auto transform rotate-3 hover:rotate-0 transition-transform">
              <span className="material-icons text-white text-5xl">
                favorite
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              Memory Vault
            </h2>
            <p className="text-[#ea2a33] font-bold uppercase tracking-widest text-xs">
              For {vaultData.recipient_name || "My Valentine"}
            </p>
          </div>
          <form onSubmit={handleUnlock} className="w-full space-y-6">
            <div className="space-y-2 text-left relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-6 bg-white/80 border border-white rounded-2xl shadow-inner text-gray-800 focus:ring-2 focus:ring-[#ea2a33]/50 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium"
                placeholder="Enter secret password..."
                type="password"
                required
              />
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
              className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-[#ea2a33] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Unlock Memories{" "}
              <span className="material-icons text-sm">lock_open</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- UNLOCKED SCREEN ---
  return (
    <div
      className="min-h-screen bg-[#fdfaf3] text-slate-800 relative pb-32 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(#ea2a3315 2px, transparent 2px)",
        backgroundSize: "30px 30px",
      }}
    >
      <Watermarks />

      {/* 🌧️ THE RAINING HEARTS EFFECT 🌧️ */}
      <HeartRain />

      {/* HIDDEN AUDIO PLAYER */}
      <audio ref={audioRef} loop src="/always-love-you.mp3" />

      {/* FLOATING MUSIC CONTROLLER */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 bg-[#fffcf8]/95 backdrop-blur border border-[#e8dcc4] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <span className="material-icons text-[#ea2a33]">
          {isPlaying ? "volume_up" : "volume_off"}
        </span>
      </button>

      <div className="relative mx-auto max-w-6xl flex flex-col px-4 sm:px-8 pt-16 z-10">
        <header className="pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#fffcf8]/90 backdrop-blur px-4 py-2 rounded-full border border-[#e8dcc4] shadow-sm mb-6">
            <span className="material-icons text-[#ea2a33] text-sm animate-pulse">
              lock_open
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#ea2a33] font-bold">
              Vault Unlocked
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl font-handwritten font-bold text-slate-900 mb-12"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            For {decryptedContent.partnerName}
          </h1>

          {/* THE NEW CLASSIC ROYAL LETTER BOX */}
          <div className="relative max-w-4xl mx-auto my-8">
            <div
              className="bg-[#fffcf8] p-10 md:p-16 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#e8dcc4] relative"
              style={{
                backgroundImage:
                  'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#ea2a33]/30"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#ea2a33]/30"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#ea2a33]/30"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#ea2a33]/30"></div>

              <h3 className="text-center font-serif text-2xl md:text-3xl text-[#ea2a33] mb-8 uppercase tracking-widest border-b border-[#ea2a33]/20 pb-6">
                A Message From The Heart
              </h3>

              <p className="font-serif text-xl md:text-2xl leading-loose text-slate-700 italic text-center px-4 md:px-12">
                {decryptedContent.message}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mt-12 relative">
          {decryptedContent.memories.map((memory, index) => {
            const rotations = [
              "-rotate-3",
              "rotate-2",
              "-rotate-1",
              "rotate-4",
              "-rotate-2",
            ];
            const rotation = rotations[index % rotations.length];
            return (
              <div
                key={index}
                className={`relative transform ${rotation} hover:rotate-0 hover:scale-105 hover:z-50 transition-all duration-500 group`}
              >
                {/* Hanging String/Rope Effect */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 w-1">
                  {/* The string/rope */}
                  <div className="w-0.5 h-8 bg-gradient-to-b from-[#8b7355] to-[#6b5845] mx-auto shadow-sm"></div>
                  {/* Knot at top */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8b7355] shadow-sm"></div>
                  {/* Small loop effect */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-[#8b7355] rounded-full bg-transparent"></div>
                </div>

                {/* Clothespin/Clip at the top of card */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 group-hover:scale-110 transition-transform">
                  {/* Wooden clothespin */}
                  <div className="relative w-8 h-6 flex gap-0.5">
                    {/* Left part */}
                    <div className="w-3.5 h-6 bg-gradient-to-r from-[#d4a574] to-[#c19a6b] rounded-sm shadow-md border border-[#a67c52]/30"></div>
                    {/* Right part */}
                    <div className="w-3.5 h-6 bg-gradient-to-r from-[#c19a6b] to-[#d4a574] rounded-sm shadow-md border border-[#a67c52]/30"></div>
                    {/* Metal spring in middle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-gradient-to-b from-[#b0b0b0] to-[#808080] rounded-full"></div>
                    {/* Spring coils */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-[#909090] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 w-1.5 h-0.5 bg-[#909090] rounded-full"></div>
                  </div>
                </div>

                {/* Memory card with vintage cream/beige tones */}
                <div
                  className="bg-[#fffcf8] p-4 md:p-5 pt-5 md:pt-6 pb-12 md:pb-16 shadow-2xl shadow-slate-900/10 rounded-sm border border-[#e8dcc4] relative"
                  style={{
                    backgroundImage:
                      'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                  }}
                >
                  {/* Photo container */}
                  <div className="aspect-square bg-[#f5ede0] overflow-hidden rounded-sm mb-6 border border-[#d4c4a8]/50 shadow-inner group-hover:shadow-none transition-shadow">
                    <img
                      src={memory.photoUrl}
                      alt="Memory"
                      className="w-full h-full object-cover filter brightness-105 contrast-105 sepia-[0.08] group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Memory text */}
                  <p
                    className="font-handwritten text-3xl md:text-4xl text-center text-slate-800 mt-2"
                    style={{ fontFamily: '"Caveat", cursive' }}
                  >
                    {memory.text || "A beautiful moment"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
