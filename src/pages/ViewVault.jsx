import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { decryptData } from "../lib/cryptoUtils";

export default function ViewVault() {
  const { id } = useParams();
  const [vaultData, setVaultData] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedContent, setDecryptedContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch the encrypted vault from Supabase when page loads
  useEffect(() => {
    async function fetchVault() {
      const { data, error } = await supabase
        .from("vaults")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Vault not found. Please check the link.");
      } else {
        setVaultData(data);
      }
      setLoading(false);
    }
    fetchVault();
  }, [id]);

  // 2. Handle Password Decryption
  const handleUnlock = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Feed the encrypted strings into our crypto engine
      const jsonString = await decryptData(
        vaultData.ciphertext,
        password,
        vaultData.salt,
        vaultData.iv,
      );
      // Parse the JSON back into an object
      setDecryptedContent(JSON.parse(jsonString));
    } catch (err) {
      console.error(err);
      setError("Incorrect password. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-xl">
        Loading Vault... 🔒
      </div>
    );
  if (!vaultData && error)
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-red-500">
        {error}
      </div>
    );

  // --- LOCKED SCREEN ---
  if (!decryptedContent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#fff0f0] via-[#ffe4e4] to-[#fce4ec] font-display">
        {/* Changed from narrow mobile frame to a responsive, centered card */}
        <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-pink-100 p-8 sm:p-12 text-center relative">
          <div className="mb-10">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center shadow-inner mb-6 mx-auto">
              <span className="material-icons text-[#ea2a33] text-5xl">
                favorite
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Private Vault
            </h2>
            <p className="text-gray-500">
              For {vaultData.recipient_name || "My Valentine"}
            </p>
          </div>

          <form onSubmit={handleUnlock} className="w-full space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-[#ea2a33]/80 uppercase ml-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-6 bg-slate-50 border border-pink-100 rounded-xl shadow-inner text-gray-800 focus:ring-2 focus:ring-[#ea2a33]/30 outline-none transition-all"
                placeholder="Enter password to unlock"
                type="password"
                required
              />
            </div>
            {error && (
              <p className="text-[#ea2a33] text-sm font-bold animate-bounce">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-14 bg-[#ea2a33] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#ea2a33]/40 hover:-translate-y-1 active:scale-95 transition-all"
            >
              Unlock Vault
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
            <span className="material-icons text-xs">verified_user</span>
            Zero-Knowledge Encryption
          </div>
        </div>
      </div>
    );
  }

  // --- UNLOCKED SCREEN (Scrapbook) ---
  return (
    <div
      className="min-h-screen bg-[#fdfaf3] text-slate-800 relative pb-32"
      style={{
        backgroundImage: "radial-gradient(#ea2a3310 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Changed to max-w-5xl for a wide, beautiful desktop scrapbook view */}
      <div className="relative mx-auto max-w-5xl flex flex-col px-4 sm:px-8">
        {/* Header */}
        <header className="pt-12 pb-10 text-center">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-[#ea2a33] font-bold mb-2">
              Encrypted Vault Unlocked
            </span>
            <h1
              className="text-5xl font-handwritten font-bold text-slate-900"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Memories with {decryptedContent.partnerName}
            </h1>
            {/* The Custom Message! */}
            <div className="mt-8 bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-100 max-w-2xl mx-auto transform -rotate-1">
              <p
                className="font-handwritten text-2xl md:text-3xl leading-relaxed text-slate-700"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                "{decryptedContent.message}"
              </p>
            </div>
          </div>
        </header>

        {/* Responsive Memory Grid - Shows real photos! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mt-8">
          {decryptedContent.memories.map((memory, index) => {
            // Alternate rotations for the polaroids to look like a scrapbook
            const rotation = index % 2 === 0 ? "-rotate-2" : "rotate-3";

            return (
              <div
                key={index}
                className={`relative transform ${rotation} hover:rotate-0 hover:scale-105 transition-all duration-300 group`}
              >
                {/* Polaroid Card */}
                <div className="bg-white p-3 md:p-4 pt-3 md:pt-4 pb-8 md:pb-12 shadow-xl rounded-sm border border-slate-200">
                  <div className="aspect-square bg-slate-100 overflow-hidden rounded-sm mb-4 border border-slate-100">
                    <img
                      src={memory.photoUrl}
                      alt="Memory"
                      className="w-full h-full object-cover filter brightness-105 contrast-105"
                    />
                  </div>
                  <p
                    className="font-handwritten text-2xl md:text-3xl text-center text-slate-700 mt-2"
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
