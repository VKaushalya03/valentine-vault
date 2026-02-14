import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { decryptData } from "../lib/cryptoUtils";

// Import your newly extracted components
import FloatingAnimation from "../components/FloatingAnimation";
import Watermarks from "../components/Watermarks";
import LockedScreen from "../components/LockedScreen";
import AdminControls from "../components/AdminControls";
import LetterBox from "../components/LetterBox";
import MemoryCard from "../components/MemoryCard";
import LoadingScreen from "../components/LoadingScreen";

const THEME_CONFIG = {
  classic: {
    bg: "bg-[#fff0f0]",
    text: "text-slate-900",
    accent: "text-[#ea2a33]",
    card: "bg-white border-pink-100",
    heartColor: "#ea2a33",
    letterBg: "bg-[#fffcf8]",
    pattern: "radial-gradient(#ea2a3315 2px, transparent 2px)",
  },
  midnight: {
    bg: "bg-[#0a0a14]",
    text: "text-blue-50",
    accent: "text-cyan-400",
    card: "bg-slate-900/80 border-cyan-900/50 backdrop-blur-md",
    heartColor: "#22d3ee",
    letterBg: "bg-slate-900",
    pattern: "radial-gradient(#22d3ee15 2px, transparent 2px)",
  },
  vintage: {
    bg: "bg-[#fdfaf3]",
    text: "text-amber-950",
    accent: "text-amber-700",
    card: "bg-[#fffcf8] border-[#e8dcc4]",
    heartColor: "#b45309",
    letterBg: "bg-[#fffcf8]",
    pattern: "radial-gradient(#b4530915 2px, transparent 2px)",
  },
};

export default function ViewVault() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vaultData, setVaultData] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedContent, setDecryptedContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Active Theme Logic
  const theme = useMemo(() => {
    if (!vaultData) return THEME_CONFIG.classic;
    return THEME_CONFIG[vaultData.theme_id] || THEME_CONFIG.classic;
  }, [vaultData]);

  const isVintage = vaultData?.theme_id === "vintage";

  useEffect(() => {
    async function fetchVault() {
      const { data, error } = await supabase
        .from("vaults")
        .select("*")
        .eq("custom_url", id)
        .single();
      if (error || !data) setError("Vault not found.");
      else setVaultData(data);
      setLoading(false);
    }
    fetchVault();
  }, [id]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    try {
      const jsonString = await decryptData(
        vaultData.ciphertext,
        password,
        vaultData.salt,
        vaultData.iv,
      );
      setDecryptedContent(JSON.parse(jsonString));
      if (audioRef.current) audioRef.current.play();
    } catch {
      setError("Incorrect password.");
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) return <LoadingScreen />;

  if (!decryptedContent) {
    return (
      <LockedScreen
        theme={theme}
        vaultData={vaultData}
        password={password}
        setPassword={setPassword}
        handleUnlock={handleUnlock}
        error={error}
      />
    );
  }

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} relative pb-32 overflow-hidden transition-colors duration-700`}
      style={{ backgroundImage: theme.pattern, backgroundSize: "30px 30px" }}
    >
      <Watermarks opacity="opacity-[0.04]" />
      <FloatingAnimation themeId={vaultData?.theme_id} />
      <audio ref={audioRef} loop src="/always-love-you.mp3" />

      <AdminControls
        navigate={navigate}
        decryptedContent={decryptedContent}
        vaultData={vaultData}
        toggleAudio={toggleAudio}
        isPlaying={isPlaying}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 z-10 relative">
        <header className="pb-16 text-center">
          <h1
            className="text-6xl md:text-7xl font-handwritten font-bold mb-12"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            For {decryptedContent.partnerName}
          </h1>
          <LetterBox
            theme={theme}
            decryptedContent={decryptedContent}
            isVintage={isVintage}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {decryptedContent.memories.map((memory, index) => (
            <MemoryCard
              key={index}
              memory={memory}
              index={index}
              theme={theme}
              isVintage={isVintage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
