import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";

const CATEGORIES_COLLECTION = "categories";

/**
 * Fetch all categories directly from Firestore
 */
export async function getCategories() {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Create a new category in Firestore
 */
export async function createCategory(catData) {
  const slug = catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = `cat-${Date.now()}`;
  const payload = {
    ...catData,
    id,
    slug,
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(db, CATEGORIES_COLLECTION, id), payload);
  return payload;
}

/**
 * Update an existing category in Firestore
 */
export async function updateCategory(id, updates) {
  const payload = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await updateDoc(doc(db, CATEGORIES_COLLECTION, id), payload);
  return { id, ...payload };
}

/**
 * Delete a category from Firestore
 */
export async function deleteCategory(id) {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
  return true;
}
