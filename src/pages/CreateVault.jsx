import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { encryptData } from "../lib/cryptoUtils";
import Watermarks from "../components/Watermarks"; // 🌸 IMPORTING OUR WATERMARKS

export default function CreateVault() {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;

  const [formData, setFormData] = useState({
    partnerName: editData?.partnerName || "",
    message: editData?.message || "",
    password: "",
    theme: editData?.theme || "classic",
    customUrl: editData?.customUrl || "", // 🆕 NEW STATE FOR CUSTOM LINK
  });

  const [images, setImages] = useState(editData?.memories || []);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImages((prev) => [
          ...prev,
          { photoUrl: reader.result, text: "", date: "" },
        ]);
      reader.readAsDataURL(file);
    });
  };

  const updateMemoryField = (index, field, value) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // 🆕 Format the URL nicely (e.g., "Sarah & James!" -> "sarah-james")
    const formattedSlug = formData.customUrl
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    try {
      const vaultData = {
        partnerName: formData.partnerName,
        message: formData.message,
        memories: images,
      };

      const encryptedBundle = await encryptData(vaultData, formData.password);

      const { error } = await supabase
        .from("vaults")
        .insert([
          {
            ciphertext: encryptedBundle.ciphertext,
            iv: encryptedBundle.iv,
            salt: encryptedBundle.salt,
            recipient_name: formData.partnerName,
            theme_id: formData.theme,
            custom_url: formattedSlug, // 🆕 SAVE THE CUSTOM URL
          },
        ])
        .select();

      // 🆕 Check if the URL is already taken!
      if (error) {
        if (error.code === "23505") {
          alert("That custom link is already taken! Please try another one.");
          setIsProcessing(false);
          return;
        }
        throw error;
      }

      // Navigate to their new custom vanity URL!
      navigate(`/v/${formattedSlug}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong saving your vault!");
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fdfaf3] flex flex-col items-center py-12 px-4 font-display relative overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(#ea2a3330 2px, transparent 2px)",
        backgroundSize: "30px 30px",
      }}
    >
      {/* 🌸 THE WATERMARKS IN THE BACKGROUND (Darker so you can see them!) 🌸 */}
      <Watermarks opacity="opacity-[0.12]" />

      {/* Added z-10, bg-white/95 and backdrop-blur to make it look premium over the watermarks */}
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-2xl p-8 md:p-10 border border-pink-100 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#ea2a33] to-[#ff758c] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ea2a33]/30">
            <span className="material-icons">add_photo_alternate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Build Your Vault
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Everything is encrypted locally. Only you hold the key.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              1. Choose A Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["classic", "midnight", "vintage"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: t })}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 capitalize font-bold text-[10px] uppercase tracking-widest ${
                    formData.theme === t
                      ? t === "classic"
                        ? "border-[#ea2a33] bg-pink-50 text-slate-700 shadow-md"
                        : t === "midnight"
                          ? "border-cyan-500 bg-cyan-50 text-slate-700 shadow-md"
                          : "border-amber-600 bg-amber-50 text-slate-700 shadow-md"
                      : "border-slate-100 hover:border-slate-300 text-slate-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full shadow-sm bg-gradient-to-br ${
                      t === "classic"
                        ? "from-[#ff758c] to-[#ff7eb3]"
                        : t === "midnight"
                          ? "from-[#0f172a] to-[#3b82f6]"
                          : "from-[#d4c4a8] to-[#e8dcc4]"
                    }`}
                  ></div>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Partner's Name
              </label>
              <input
                type="text"
                name="partnerName"
                required
                value={formData.partnerName}
                onChange={handleChange}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50 transition-all"
                placeholder="e.g., Sarah"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#ea2a33] uppercase tracking-wider mb-2 flex items-center gap-1">
                <span className="material-icons text-sm">lock</span> Set Vault
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-pink-50/50 border border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50 transition-all"
                placeholder="A secret password"
              />
            </div>
          </div>

          {/* 🆕 NEW: CUSTOM LINK INPUT SECTION */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-icons text-sm">link</span> Claim Your
              Custom Link
            </label>
            <div className="flex bg-slate-50/80 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#ea2a33]/50 transition-all overflow-hidden">
              <span className="bg-slate-200 text-slate-500 px-4 py-3 text-sm font-bold border-r border-slate-200 flex items-center">
                vault.com/v/
              </span>
              <input
                type="text"
                name="customUrl"
                required
                value={formData.customUrl}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-3 focus:outline-none text-slate-800 font-bold"
                placeholder="sarah-and-james"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Main Message
            </label>
            <textarea
              name="message"
              required
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50 resize-none transition-all"
              placeholder="Happy Valentine's Day! I love you..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Add Your Memories
            </label>
            <div className="w-full border-2 border-dashed border-pink-200 rounded-xl p-6 text-center hover:bg-pink-50/50 transition-colors relative mb-4 group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="material-icons text-pink-300 text-3xl mb-2 group-hover:scale-110 transition-transform">
                cloud_upload
              </span>
              <p className="text-sm font-bold text-slate-600">
                Click or drag photos here
              </p>
            </div>

            {images.length > 0 && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-4 items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative group/img">
                      <img
                        src={img.photoUrl}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-lg border border-slate-200 shadow-sm"
                      />
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <input
                        type="text"
                        required
                        value={img.text}
                        onChange={(e) =>
                          updateMemoryField(idx, "text", e.target.value)
                        }
                        placeholder="Write a memory..."
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50 transition-all"
                      />
                      <div className="flex items-center gap-2">
                        <span className="material-icons text-slate-400 text-sm">
                          calendar_month
                        </span>
                        <input
                          type="date"
                          value={img.date || ""}
                          onChange={(e) =>
                            updateMemoryField(idx, "date", e.target.value)
                          }
                          className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors mt-1 sm:mt-0"
                    >
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing || images.length === 0}
            className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-[#ea2a33] hover:shadow-[#ea2a33]/40 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-slate-900 flex items-center justify-center gap-2 mt-6"
          >
            {isProcessing ? "Encrypting & Saving..." : "Lock & Encrypt Vault"}
            {!isProcessing && (
              <span className="material-icons text-sm">lock_outline</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
