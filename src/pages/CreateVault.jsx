import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { encryptData } from "../lib/cryptoUtils";

export default function CreateVault() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partnerName: "",
    message: "",
    password: "",
  });
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle standard text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert Images to Base64 in the browser
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Add the image with an empty text field for the user to fill out
        setImages((prev) => [...prev, { photoUrl: reader.result, text: "" }]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Update the caption for a specific photo
  const updateCaption = (index, newText) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index].text = newText;
      return updated;
    });
  };

  // Remove a photo if they made a mistake
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const vaultData = {
        partnerName: formData.partnerName,
        message: formData.message,
        memories: images, // Now contains multiple photos with custom captions!
      };

      const encryptedBundle = await encryptData(vaultData, formData.password);

      const { data, error } = await supabase
        .from("vaults")
        .insert([
          {
            ciphertext: encryptedBundle.ciphertext,
            iv: encryptedBundle.iv,
            salt: encryptedBundle.salt,
            recipient_name: formData.partnerName,
            theme_id: "classic",
          },
        ])
        .select();

      if (error) throw error;

      const newVaultId = data[0].id;
      navigate(`/v/${newVaultId}`);
    } catch (error) {
      console.error("Error creating vault:", error);
      alert("Something went wrong saving your vault!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f6] flex flex-col items-center py-12 px-4 font-display">
      <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#ea2a33]/10 text-[#ea2a33] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons">add_photo_alternate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Build Your Vault
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Everything is encrypted locally. We never see your photos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Partner Name */}
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50"
                placeholder="e.g., Sarah"
              />
            </div>

            {/* Encryption Password */}
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50"
                placeholder="A secret password"
              />
            </div>
          </div>

          {/* Main Message */}
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50 resize-none"
              placeholder="Happy Valentine's Day! I love you..."
            />
          </div>

          {/* Photo Upload Area */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Add Your Memories (Photos & Captions)
            </label>
            <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="material-icons text-slate-400 text-3xl mb-2">
                cloud_upload
              </span>
              <p className="text-sm font-medium text-slate-600">
                Click or drag photos here
              </p>
            </div>

            {/* Memory Editor List */}
            {images.length > 0 && (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <img
                      src={img.photoUrl}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg border border-slate-300 shadow-sm"
                    />

                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        required
                        value={img.text}
                        onChange={(e) => updateCaption(idx, e.target.value)}
                        placeholder="Write a short memory for this photo..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea2a33]/50"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-slate-400 hover:text-[#ea2a33] p-2 bg-white rounded-lg border border-slate-200 shadow-sm transition-colors"
                      title="Remove Photo"
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
            className="w-full bg-[#ea2a33] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-[#ea2a33]/30 hover:bg-[#d41f27] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 mt-6"
          >
            {isProcessing ? "Encrypting & Saving..." : "Lock & Encrypt Vault"}
            {!isProcessing && (
              <span className="material-icons text-sm">
                enhanced_encryption
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
