import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from "../src/data/initialData.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKVE-_42t4FmqQ5wiz23PoXR_42JTaElY",
  authDomain: "maison-elegance-22176.firebaseapp.com",
  projectId: "maison-elegance-22176",
  storageBucket: "maison-elegance-22176.firebasestorage.app",
  messagingSenderId: "538764497756",
  appId: "1:538764497756:web:8746a822762da70779a799",
  measurementId: "G-EP7T7KP33M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("🚀 Starting Firestore database seeding for maison-elegance-22176...\n");

  // 1. Seed Categories
  console.log("📁 Seeding categories...");
  for (const cat of INITIAL_CATEGORIES) {
    const docRef = doc(db, "categories", cat.id || cat.slug);
    await setDoc(docRef, {
      ...cat,
      updatedAt: new Date().toISOString()
    });
    console.log(`  ✓ Category seeded: ${cat.name} (${cat.slug})`);
  }

  // 2. Seed Products
  console.log("\n🛋️ Seeding products...");
  for (const prod of INITIAL_PRODUCTS) {
    const docRef = doc(db, "products", prod.id);
    await setDoc(docRef, {
      ...prod,
      updatedAt: new Date().toISOString()
    });
    console.log(`  ✓ Product seeded: ${prod.name} (${prod.id})`);
  }

  // 3. Seed Settings
  console.log("\n⚙️ Seeding settings...");
  const settingsRef = doc(db, "settings", "site");
  await setDoc(settingsRef, {
    ...INITIAL_SETTINGS,
    updatedAt: new Date().toISOString()
  });
  console.log("  ✓ Store settings seeded (Patna Nala Road address)");

  console.log("\n🎉 ALL COLLECTIONS & DOCUMENTS SEEDED SUCCESSFULLY TO CLOUD FIRESTORE!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
