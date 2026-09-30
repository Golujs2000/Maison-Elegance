import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { INITIAL_CATEGORIES } from "../data/initialData";
import { STORAGE_KEYS } from "../utils/constants";

const CATEGORIES_COLLECTION = "categories";

function getLocalCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  return INITIAL_CATEGORIES;
}

function saveLocalCategories(cats) {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
  } catch (e) {
    console.error(e);
  }
}

export async function getCategories() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, CATEGORIES_COLLECTION));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn("Firestore categories error, fallback to local:", e);
    }
  }
  return getLocalCategories();
}

export async function createCategory(catData) {
  const slug = catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = `cat-${Date.now()}`;
  const payload = {
    ...catData,
    id,
    slug,
    productCount: 0,
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, CATEGORIES_COLLECTION, id), payload);
    } catch (e) {
      console.warn("Firestore error:", e);
    }
  }

  const list = getLocalCategories();
  list.push(payload);
  saveLocalCategories(list);
  return payload;
}

export async function updateCategory(id, updates) {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, CATEGORIES_COLLECTION, id), updates);
    } catch (e) {
      console.warn("Firestore error:", e);
    }
  }

  const list = getLocalCategories();
  const idx = list.findIndex((c) => c.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    saveLocalCategories(list);
    return list[idx];
  }
  return null;
}

export async function deleteCategory(id) {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    } catch (e) {
      console.warn("Firestore error:", e);
    }
  }

  const list = getLocalCategories().filter((c) => c.id !== id);
  saveLocalCategories(list);
  return true;
}
