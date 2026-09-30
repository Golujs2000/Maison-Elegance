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
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { INITIAL_PRODUCTS } from "../data/initialData";
import { STORAGE_KEYS } from "../utils/constants";

const PRODUCTS_COLLECTION = "products";

// Helper to initialize local storage fallback
function getLocalProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (raw) {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) {
        let needsSave = false;
        const existingIds = new Set(stored.map((p) => p.id));
        const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        if (missing.length > 0) {
          stored.push(...missing);
          needsSave = true;
        }

        // Auto-fix prod-14 media if cached with old photo URL
        const p14 = stored.find((p) => p.id === "prod-14");
        if (p14 && (p14.media?.[1]?.url?.includes("photo-1580481077195") || p14.media?.[0]?.url?.includes("photo-1505797149"))) {
          p14.media = [
            { type: "image", url: "/leather-desk-chair.jpg", source: "url", isPrimary: true },
            { type: "image", url: "/leather-chair-detail.jpg", source: "url" }
          ];
          needsSave = true;
        }

        if (needsSave) {
          saveLocalProducts(stored);
        }
        return stored;
      }
    }
  } catch (e) {
    console.error("Local storage read error", e);
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
}

function saveLocalProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error("Local storage save error", e);
  }
}

/**
 * Fetch all products with optional filters
 */
export async function getProducts(filters = {}) {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, PRODUCTS_COLLECTION);
      let q = query(colRef);

      if (filters.category && filters.category !== "all") {
        q = query(colRef, where("category", "==", filters.category));
      }

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        let list = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // Sort by sortOrder, then createdAt
        list.sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
        return list;
      }
    } catch (err) {
      console.warn("Firestore fetch error, falling back to cached products:", err);
    }
  }

  // Fallback to local products
  let list = getLocalProducts();

  if (filters.category && filters.category !== "all") {
    list = list.filter((p) => p.category === filters.category);
  }
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
 * Get single product by id or slug
 */
export async function getProductById(idOrSlug) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, idOrSlug);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }

      // Query by slug if not found by id
      const q = query(collection(db, PRODUCTS_COLLECTION), where("slug", "==", idOrSlug));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        const item = querySnap.docs[0];
        return { id: item.id, ...item.data() };
      }
    } catch (err) {
      console.warn("Firestore get error:", err);
    }
  }

  const all = getLocalProducts();
  return all.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

/**
 * Create a new product
 */
export async function createProduct(productData) {
  const newId = `prod-${Date.now()}`;
  const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, newId);
      await setDoc(docRef, fullData);
    } catch (err) {
      console.warn("Firestore create error:", err);
    }
  }

  const list = getLocalProducts();
  list.unshift(fullData);
  saveLocalProducts(list);
  return fullData;
}

/**
 * Update an existing product
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

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await updateDoc(docRef, payload);
    } catch (err) {
      console.warn("Firestore update error:", err);
    }
  }

  const list = getLocalProducts();
  const index = list.findIndex((p) => p.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...payload };
    saveLocalProducts(list);
    return list[index];
  }
  return null;
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    } catch (err) {
      console.warn("Firestore delete error:", err);
    }
  }

  const list = getLocalProducts().filter((p) => p.id !== id);
  saveLocalProducts(list);
  return true;
}

/**
 * Duplicate a product
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
 * Bulk delete products
 */
export async function bulkDeleteProducts(ids) {
  if (!ids || ids.length === 0) return true;

  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);
      ids.forEach((id) => {
        batch.delete(doc(db, PRODUCTS_COLLECTION, id));
      });
      await batch.commit();
    } catch (err) {
      console.warn("Firestore bulk delete error:", err);
    }
  }

  const list = getLocalProducts().filter((p) => !ids.includes(p.id));
  saveLocalProducts(list);
  return true;
}

/**
 * Bulk update product status (active / draft)
 */
export async function bulkUpdateStatus(ids, status) {
  if (!ids || ids.length === 0) return true;

  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);
      ids.forEach((id) => {
        batch.update(doc(db, PRODUCTS_COLLECTION, id), {
          status,
          updatedAt: new Date().toISOString(),
        });
      });
      await batch.commit();
    } catch (err) {
      console.warn("Firestore bulk status error:", err);
    }
  }

  const list = getLocalProducts().map((p) =>
    ids.includes(p.id) ? { ...p, status, updatedAt: new Date().toISOString() } : p
  );
  saveLocalProducts(list);
  return true;
}

/**
 * Bulk assign category
 */
export async function bulkUpdateCategory(ids, categorySlug, categoryName) {
  if (!ids || ids.length === 0) return true;

  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);
      ids.forEach((id) => {
        batch.update(doc(db, PRODUCTS_COLLECTION, id), {
          category: categorySlug,
          categoryName,
          updatedAt: new Date().toISOString(),
        });
      });
      await batch.commit();
    } catch (err) {
      console.warn("Firestore bulk category error:", err);
    }
  }

  const list = getLocalProducts().map((p) =>
    ids.includes(p.id)
      ? { ...p, category: categorySlug, categoryName, updatedAt: new Date().toISOString() }
      : p
  );
  saveLocalProducts(list);
  return true;
}
