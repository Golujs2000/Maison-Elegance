import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const SETTINGS_DOC = "site";
const SETTINGS_COLLECTION = "settings";

/**
 * Fetch store settings directly from Firestore
 */
export async function getSettings() {
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
}

/**
 * Update store settings directly in Firestore
 */
export async function updateSettings(newSettings) {
  const payload = {
    ...newSettings,
    updatedAt: new Date().toISOString(),
  };

  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
  await setDoc(docRef, payload, { merge: true });
  return payload;
}
