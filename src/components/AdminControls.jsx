import React from "react";

export default function AdminControls({
  navigate,
  decryptedContent,
  vaultData,
  toggleAudio,
  isPlaying,
}) {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2">
      <button
        onClick={() =>
          navigate("/create", {
            state: {
              editMode: true,
              partnerName: decryptedContent.partnerName,
              message: decryptedContent.message,
              memories: decryptedContent.memories,
              theme: vaultData.theme_id,
            },
          })
        }
        className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30"
      >
        Edit Details
      </button>
      <button
        onClick={toggleAudio}
        className="bg-white/20 backdrop-blur p-2 rounded-full border border-white/30"
      >
        <span className="material-icons text-sm">
          {isPlaying ? "volume_up" : "volume_off"}
        </span>
      </button>
    </div>
  );
}
