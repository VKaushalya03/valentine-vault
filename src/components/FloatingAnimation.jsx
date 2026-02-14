import React, { useState } from "react";

const generateAnimationItems = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + "%",
    animationDuration: Math.random() * 4 + 4 + "s",
    animationDelay: Math.random() * 5 + "s",
    fontSize: Math.random() * 12 + 12 + "px",
    opacity: Math.random() * 0.4 + 0.2,
  }));
};

export default function FloatingAnimation({ themeId }) {
  const icons = {
    classic: { icon: "❤️", color: "#ea2a33" },
    midnight: { icon: "✨", color: "#22d3ee" },
    vintage: { icon: "🌸", color: "#b45309" },
  };
  const active = icons[themeId] || icons.classic;
  const [items] = useState(() => generateAnimationItems());

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      <style>{`@keyframes floatDown { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(110vh) rotate(360deg); } }`}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-[-10vh]"
          style={{
            left: item.left,
            animation: `floatDown ${item.animationDuration} linear infinite`,
            animationDelay: item.animationDelay,
            color: active.color,
            fontSize: item.fontSize,
            opacity: item.opacity,
          }}
        >
          {active.icon}
        </div>
      ))}
    </div>
  );
}
