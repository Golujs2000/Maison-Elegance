import React, { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Trash2, Star, Play, Image as ImageIcon, Plus, Check } from "lucide-react";
import { uploadMediaFile, detectMediaType } from "../../services/storageService";
import toast from "react-hot-toast";

export default function MediaUploader({ media = [], onChange }) {
  const [activeTab, setActiveTab] = useState("upload"); // upload | url
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Handle local file uploads (images & videos)
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setUploadProgress(10);

    try {
      const newItems = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith("video/");
        const folder = isVideo ? "products/videos" : "products/images";

        const url = await uploadMediaFile(file, folder, (progress) => {
          setUploadProgress(Math.round(((i + progress / 100) / files.length) * 100));
        });

        newItems.push({
          type: isVideo ? "video" : "image",
          url,
          source: "upload",
          isPrimary: media.length === 0 && newItems.length === 0 && !isVideo,
        });
      }

      const updated = [...media, ...newItems];
      onChange(updated);
      toast.success(`Uploaded ${newItems.length} media item(s)`);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Check file size or format.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle URL addition
  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const trimmed = urlInput.trim();
    const mediaType = detectMediaType(trimmed);

    const newItem = {
      type: mediaType,
      url: trimmed,
      source: "url",
      isPrimary: media.length === 0 && mediaType === "image",
    };

    const updated = [...media, newItem];
    onChange(updated);
    setUrlInput("");
    toast.success(`Added ${mediaType} from URL`);
  };

  // Remove item
  const handleRemove = (index) => {
    const updated = media.filter((_, idx) => idx !== index);
    // If we removed primary, designate first image as primary
    if (media[index]?.isPrimary && updated.length > 0) {
      const firstImgIdx = updated.findIndex((m) => m.type === "image");
      if (firstImgIdx !== -1) updated[firstImgIdx].isPrimary = true;
    }
    onChange(updated);
  };

  // Set primary image
  const handleSetPrimary = (index) => {
    const updated = media.map((item, idx) => ({
      ...item,
      isPrimary: idx === index && item.type === "image",
    }));
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher: Upload File vs External URL */}
      <div className="flex border-b border-sand text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`pb-2 mr-4 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === "upload"
              ? "border-primary text-primary"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <Upload size={14} />
          <span>Upload Image / Video</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`pb-2 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === "url"
              ? "border-primary text-primary"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <LinkIcon size={14} />
          <span>Add Media from URL</span>
        </button>
      </div>

      {/* Upload Zone */}
      {activeTab === "upload" ? (
        <div className="p-6 border-2 border-dashed border-sand rounded-xl bg-cream-50 text-center hover:bg-cream-100 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/mp4,video/webm"
            onChange={handleFileUpload}
            className="hidden"
            id="media-file-input"
          />
          <label htmlFor="media-file-input" className="cursor-pointer block space-y-2">
            <div className="w-12 h-12 rounded-full bg-sand/80 flex items-center justify-center mx-auto text-charcoal">
              <Upload size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">
                Click to browse images or video tour
              </p>
              <p className="text-[11px] text-charcoal-muted mt-0.5">
                PNG, JPG, WebP, MP4, WebM (Stored on Firebase Storage)
              </p>
            </div>
          </label>

          {uploading && (
            <div className="mt-4 max-w-xs mx-auto space-y-1">
              <div className="h-1.5 w-full bg-sand rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-charcoal-muted">Uploading media... {uploadProgress}%</p>
            </div>
          )}
        </div>
      ) : (
        /* External URL Input */
        <div className="p-4 bg-cream-50 border border-sand rounded-xl space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste image or video link (e.g. Unsplash URL or MP4/YouTube link)..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-white border border-sand rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2 bg-primary text-cream-50 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-gold-dark transition-colors shrink-0"
            >
              Add URL
            </button>
          </div>
          <p className="text-[11px] text-charcoal-muted">
            Tip: You can paste direct image links or YouTube video links to embed full showroom video tours.
          </p>
        </div>
      )}

      {/* Media Grid Showcase */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {media.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-sand bg-cream-100 shadow-sm flex items-center justify-center"
            >
              {item.type === "video" ? (
                <div className="w-full h-full bg-charcoal flex flex-col items-center justify-center text-cream-100 p-2 text-center">
                  <Play size={24} className="text-gold mb-1" />
                  <span className="text-[10px] font-mono truncate max-w-full px-1">Video</span>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1 z-10">
                <span className="px-1.5 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase font-bold rounded">
                  {item.type}
                </span>
                {item.isPrimary && (
                  <span className="px-1.5 py-0.5 bg-gold text-primary text-[9px] uppercase font-bold rounded flex items-center gap-0.5">
                    <Star size={9} fill="currentColor" /> Primary
                  </span>
                )}
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                {item.type === "image" && !item.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(idx)}
                    className="p-1.5 bg-white text-primary hover:bg-gold rounded-md text-[10px] font-semibold flex items-center gap-1 shadow-sm"
                    title="Set as primary cover image"
                  >
                    <Star size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow-sm"
                  title="Remove this media"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
