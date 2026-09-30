import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { INITIAL_SETTINGS } from "../data/initialData";
import { STORAGE_KEYS } from "../utils/constants";

const SETTINGS_DOC = "site";
const SETTINGS_COLLECTION = "settings";

function getLocalSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate old default address to Patna Nala Road if still on initial default
      if (!parsed.storeAddress || parsed.storeAddress.includes("Mumbai") || parsed.storeAddress.includes("Gallery 14")) {
        parsed.storeAddress = INITIAL_SETTINGS.storeAddress;
        parsed.storePhone = INITIAL_SETTINGS.storePhone;
        saveLocalSettings(parsed);
      }
      return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  return INITIAL_SETTINGS;
}

function saveLocalSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
}

export async function getSettings() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC));
      if (snap.exists()) {
        return snap.data();
      }
    } catch (e) {
      console.warn("Firestore settings error, using cached:", e);
    }
  }
  return getLocalSettings();
}

export async function updateSettings(newSettings) {
  const merged = {
    ...getLocalSettings(),
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC), merged, { merge: true });
    } catch (e) {
      console.warn("Firestore settings update error:", e);
    }
  }

  saveLocalSettings(merged);
  return merged;
}
