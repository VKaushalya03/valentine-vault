import React from "react";

export default function Watermarks({ opacity }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center ${opacity}`}
    >
      {/* Existing Top-Left Rose/Bird */}
      <svg
        className="absolute top-10 -left-10 w-64 h-64 text-[#ea2a33] transform rotate-12"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M21.984 8.21c-.482-1.22-1.327-2.185-2.54-2.686-2.4-.99-5.3.615-6.85 2.66-1.5-1.96-4.04-3.46-6.44-2.55-1.28.485-2.2 1.55-2.62 2.87-.52 1.63-.12 3.65 1.05 5.51 1.84 2.92 5.2 6.13 7.6 8.04.24.19.58.19.82 0 2.4-1.91 5.76-5.12 7.6-8.04 1.17-1.86 1.89-4.14 1.38-5.804z" />
      </svg>

      {/* Existing Top-Right Heart/Wing */}
      <svg
        className="absolute -top-10 -right-10 w-80 h-80 text-[#ea2a33] opacity-[0.03] transform -rotate-45"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L6 21c1.5-2.5 4-5 8-5h1c4 0 6-3 6-5 0-2-2-3-4-3zm-2 11c-2.32 0-4.57.85-6.38 2.38l1.32 1.2A8.995 8.995 0 0 1 15 20h1c.5 0 .96.1 1.4.27l1.1-1.68c-.76-.38-1.6-.59-2.5-.59h-1z" />
      </svg>

      {/* Existing Center-Left Round Design */}
      <svg
        className="absolute top-1/2 -left-24 w-96 h-96 text-[#ea2a33] opacity-[0.04] transform rotate-45 -translate-y-1/2"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-4c.83 0 1.5-.67 1.5-1.5S10.33 13 9.5 13 8 13.67 8 14.5 8.67 16 9.5 16zm5 0c.83 0 1.5-.67 1.5-1.5S15.33 13 14.5 13 13 13.67 13 14.5 13.67 16 14.5 16zm-2.5-6c.83 0 1.5-.67 1.5-1.5S12.33 7 11.5 7 10 7.67 10 8.5 10.67 10 11.5 10z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>

      {/* 🆕 NEW INTERSECTING HEART AT BOTTOM RIGHT */}
      <svg
        className="absolute -bottom-32 -right-20 w-[40rem] h-[40rem] text-[#ea2a33] transform -rotate-12 opacity-80 pointer-events-none"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}
