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

  // 1. Handle standard text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. The Magic: Convert Images to Base64 in the browser
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result is the Base64 string of the image
        setImages((prev) => [
          ...prev,
          { photoUrl: reader.result, text: "A beautiful moment" },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 3. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Prepare the JSON data
      const vaultData = {
        partnerName: formData.partnerName,
        message: formData.message,
        memories: images, // This contains our Base64 photo strings
      };

      // 2. Encrypt everything using the password!
      const encryptedBundle = await encryptData(vaultData, formData.password);

      // 3. Save the encrypted blob to Supabase
      const { data, error } = await supabase
        .from("vaults")
        .insert([
          {
            ciphertext: encryptedBundle.ciphertext,
            iv: encryptedBundle.iv,
            salt: encryptedBundle.salt,
            recipient_name: formData.partnerName,
            theme_id: "classic", // We can make this dynamic later
          },
        ])
        .select();

      if (error) throw error;

      // 4. Success! Navigate to their new unique Vault URL
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
      <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
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

          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Upload Photos
            </label>
            <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
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
              <p className="text-xs text-slate-400 mt-1">
                {images.length} photos selected
              </p>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.photoUrl}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Encryption Password */}
          <div className="pt-4 border-t border-slate-100">
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
              placeholder="Make it something only you two know"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              ⚠️ Do not forget this. We cannot recover it for you.
            </p>
          </div>

          <button
            type="submit"
            disabled={isProcessing || images.length === 0}
            className="w-full bg-[#ea2a33] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-[#ea2a33]/30 hover:bg-[#d41f27] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? "Processing..." : "Lock & Encrypt Vault"}
          </button>
        </form>
      </div>
    </div>
  );
}
