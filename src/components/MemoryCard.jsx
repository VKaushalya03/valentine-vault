import React from "react";

export default function MemoryCard({ memory, index, theme, isVintage }) {
  const rotation = [
    "-rotate-3",
    "rotate-2",
    "-rotate-1",
    "rotate-4",
    "-rotate-2",
  ][index % 5];

  // Format the date beautifully if it exists
  const formattedDate = memory.date
    ? new Date(memory.date)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : "";

  return (
    <div
      className={`relative transform ${rotation} hover:rotate-0 hover:scale-105 transition-all duration-500 group`}
    >
      {isVintage ? (
        <>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 w-1">
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#8b7355] to-[#6b5845] mx-auto shadow-sm"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8b7355] shadow-sm"></div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-[#8b7355] rounded-full bg-transparent"></div>
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 group-hover:scale-110 transition-transform">
            <div className="relative w-8 h-6 flex gap-0.5">
              <div className="w-3.5 h-6 bg-gradient-to-r from-[#d4a574] to-[#c19a6b] rounded-sm shadow-md border border-[#a67c52]/30"></div>
              <div className="w-3.5 h-6 bg-gradient-to-r from-[#c19a6b] to-[#d4a574] rounded-sm shadow-md border border-[#a67c52]/30"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-gradient-to-b from-[#b0b0b0] to-[#808080] rounded-full"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-md border border-white/20 z-20"></div>
      )}

      {/* Adjusted padding at the bottom (pb-8) to make room for the date stamp */}
      <div
        className={`${theme.card} ${theme.letterBg} p-4 pb-8 md:pb-10 shadow-2xl rounded-sm border flex flex-col`}
        style={
          isVintage
            ? {
                backgroundImage:
                  'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              }
            : {}
        }
      >
        <div className="aspect-square bg-slate-100 overflow-hidden mb-4 relative">
          <img
            src={memory.photoUrl}
            className="w-full h-full object-cover filter brightness-105 contrast-105 sepia-[0.08] group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Caption and Date Container */}
        <div className="flex flex-col justify-between flex-grow min-h-[3rem]">
          <p
            className="font-handwritten text-3xl text-center leading-tight"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            {memory.text}
          </p>

          {/* THE NEW DATE STAMP */}
          {formattedDate && (
            <div className="text-right mt-4">
              <span
                className={`text-[10px] font-mono font-bold tracking-widest ${theme.accent} opacity-60 border-b border-dashed border-current pb-0.5`}
              >
                {formattedDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
