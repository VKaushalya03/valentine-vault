import React from "react";

export default function LetterBox({ theme, decryptedContent, isVintage }) {
  return (
    <div
      className={`max-w-4xl mx-auto p-10 md:p-16 rounded-sm shadow-2xl border ${theme.card} relative ${theme.letterBg}`}
      style={
        isVintage
          ? {
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
            }
          : {}
      }
    >
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#ea2a33]/30"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#ea2a33]/30"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#ea2a33]/30"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#ea2a33]/30"></div>
      <h3
        className={`text-center font-serif text-2xl ${theme.accent} mb-8 uppercase tracking-widest border-b pb-6 border-current opacity-30`}
      >
        A Note From The Heart
      </h3>
      <p className="font-serif text-xl md:text-3xl leading-relaxed italic text-center">
        {decryptedContent.message}
      </p>
    </div>
  );
}
