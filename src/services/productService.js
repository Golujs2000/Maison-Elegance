import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const PRODUCTS_COLLECTION = "products";

/**
 * Fetch all products directly from Firestore with optional filtering
 */
export async function getProducts(filters = {}) {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  let q = query(colRef);

  if (filters.category && filters.category !== "all") {
    q = query(colRef, where("category", "==", filters.category));
  }

  const snapshot = await getDocs(q);
  let list = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));

  // Client-side filtering for tags, status, isFeatured, and search
  if (filters.isFeatured !== undefined) {
    list = list.filter((p) => p.isFeatured === filters.isFeatured);
  }
  if (filters.status) {
    list = list.filter((p) => p.status === filters.status);
  }
  if (filters.tag) {
    list = list.filter((p) => p.tags && p.tags.includes(filters.tag));
  }
  if (filters.search) {
    const queryTerm = filters.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(queryTerm) ||
        p.sku?.toLowerCase().includes(queryTerm) ||
        p.categoryName?.toLowerCase().includes(queryTerm)
    );
  }

  list.sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  return list;
}

/**
 * Get single product by id or slug directly from Firestore
 */
export async function getProductById(idOrSlug) {
  if (!idOrSlug) return null;

  // 1. Try fetching by document ID
  const docRef = doc(db, PRODUCTS_COLLECTION, idOrSlug);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }

  // 2. Query by slug
  const q = query(collection(db, PRODUCTS_COLLECTION), where("slug", "==", idOrSlug));
  const querySnap = await getDocs(q);
  if (!querySnap.empty) {
    const item = querySnap.docs[0];
    return { id: item.id, ...item.data() };
  }

  return null;
}

/**
 * Create a new product in Firestore
 */
export async function createProduct(productData) {
  const newId = `prod-${Date.now()}`;
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const fullData = {
    ...productData,
    id: newId,
    slug,
    stock: Number(productData.stock) || 0,
    price: Number(productData.price) || 0,
    discountPrice: productData.discountPrice ? Number(productData.discountPrice) : null,
    lowStockThreshold: Number(productData.lowStockThreshold) || 3,
    sortOrder: Number(productData.sortOrder) || 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = doc(db, PRODUCTS_COLLECTION, newId);
  await setDoc(docRef, fullData);
  return fullData;
}

/**
 * Update an existing product in Firestore
 */
export async function updateProduct(id, updates) {
  const payload = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (updates.stock !== undefined) payload.stock = Number(updates.stock);
  if (updates.price !== undefined) payload.price = Number(updates.price);
  if (updates.discountPrice !== undefined) {
    payload.discountPrice = updates.discountPrice ? Number(updates.discountPrice) : null;
  }
  if (updates.sortOrder !== undefined) payload.sortOrder = Number(updates.sortOrder);
  if (updates.lowStockThreshold !== undefined) payload.lowStockThreshold = Number(updates.lowStockThreshold);

  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, payload);
  return { id, ...payload };
}

/**
 * Delete a product from Firestore
 */
export async function deleteProduct(id) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  return true;
}

/**
 * Duplicate a product in Firestore
 */
export async function duplicateProduct(id) {
  const original = await getProductById(id);
  if (!original) throw new Error("Product not found");

  const duplicatedData = {
    ...original,
    name: `${original.name} (Copy)`,
    slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
    sku: original.sku ? `${original.sku}-COPY` : "",
  };
  delete duplicatedData.id;

  return await createProduct(duplicatedData);
}

/**
 * Bulk delete products from Firestore
 */
export async function bulkDeleteProducts(ids) {
  if (!ids || ids.length === 0) return true;

  const batch = writeBatch(db);
  ids.forEach((id) => {
    batch.delete(doc(db, PRODUCTS_COLLECTION, id));
  });
  await batch.commit();
  return true;
}

/**
 * Bulk update product status in Firestore
 */
export async function bulkUpdateStatus(ids, status) {
  if (!ids || ids.length === 0) return true;

  const batch = writeBatch(db);
  ids.forEach((id) => {
    batch.update(doc(db, PRODUCTS_COLLECTION, id), {
      status,
      updatedAt: new Date().toISOString(),
    });
  });
  await batch.commit();
  return true;
}

/**
 * Bulk assign category in Firestore
 */
export async function bulkUpdateCategory(ids, categorySlug, categoryName) {
  if (!ids || ids.length === 0) return true;

  const batch = writeBatch(db);
  ids.forEach((id) => {
    batch.update(doc(db, PRODUCTS_COLLECTION, id), {
      category: categorySlug,
      categoryName,
      updatedAt: new Date().toISOString(),
    });
  });
  await batch.commit();
  return true;
}
