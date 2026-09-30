import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseConfigured } from "../firebase/config";

/**
 * Uploads an image or video file to Firebase Storage (or returns local base64 preview if not configured)
 * @param {File} file
 * @param {string} folder - 'products/images' or 'products/videos'
 * @param {function} onProgress - optional progress callback (0-100)
 * @returns {Promise<string>} Download URL or base64 DataURL
 */
export async function uploadMediaFile(file, folder = "products", onProgress) {
  if (isFirebaseConfigured && storage) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storagePath = `${folder}/${Date.now()}_${sanitizedName}`;
      const storageRef = ref(storage, storagePath);

      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(Math.round(progress));
          },
          (error) => {
            console.error("Firebase upload error:", error);
            reject(error);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          }
        );
      });
    } catch (err) {
      console.warn("Storage upload failed, falling back to local FileReader:", err);
    }
  }

  // Fallback to client-side Data URL for immediate local testing
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (onProgress) onProgress(100);
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Validates whether a URL is an image or video
 */
export function detectMediaType(url) {
  if (!url) return "image";
  const clean = url.split("?")[0].toLowerCase();
  if (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.endsWith(".ogg") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("vimeo.com")
  ) {
    return "video";
  }
  return "image";
}
