# 🏠 Maison Élégance — Curated Luxury Furniture & Atelier

A high-end, responsive furniture shop website built with **React 18 + Vite**, styled with **Tailwind CSS v3** (light, elegant luxury theme), integrated with **Firebase Firestore, Auth & Storage**, with an **Admin Management Panel**, **localStorage Cart**, and direct **WhatsApp Inquiry & Checkout Flow**.

---

## 🌟 Key Features

### 🛍️ Public Showroom (Storefront)
- **Light, Warm Luxury Theme**: Ivory/cream backgrounds, soft gold accents (`#C5A880`), serif typography (*Playfair Display*), and clean sans-serif (*Plus Jakarta Sans*).
- **Architectural Living Collections**: Curated showcases for Living Room, Dining, Bedroom Suites, Executive Atelier, and Sculptural Lighting.
- **Product Details & Multi-Media Viewer**:
  - Multi-image gallery with zoom
  - **Video tour player** (uploaded MP4/WebM or embedded video links)
  - **Direct media URL** support
  - **Color & Size Variant selector** with live price adjustment updates
  - Detailed specifications, FSC hardwoods, Italian bouclé, and 10-year craft warranties
- **Interactive Cart (Saved in localStorage)**:
  - Persists across sessions
  - Quantity controls & item removal
  - Selection summary
- **💬 WhatsApp Inquiry & Checkout**:
  - **Single Product WhatsApp Inquiry**: Pre-fills product name, SKU, selected color/size variant, unit price, and direct link.
  - **Full Cart WhatsApp Checkout**: Builds a numbered itemized manifest with quantities, variants, and total investment amount.
  - **Configurable WhatsApp number** directly from the Admin Panel.
- **Floating Concierge Button**: Persistent bottom-right WhatsApp button with online status indicator.

---

### 🛡️ Atelier Admin Panel (`/admin`)
- **Curator Dashboard**:
  - Real-time catalog metrics (Total Pieces, Active Salons, Featured Masterpieces)
  - **⚠️ Low Stock Warning Banner**: Proactively highlights items at or below threshold with 1-click edit
  - Recent additions list
- **Comprehensive Product Management (`/admin/products`)**:
  - Search by Name, SKU, or Category
  - Filters by Salon, Publish Status (Active/Draft), and Stock Level (Low Stock / Out of Stock)
  - **Inline Sort Order**: Directly set priority numbers (lower numbers display first)
  - **Bulk Operations**: Bulk delete, bulk status update (Publish/Draft), and bulk category reassignment
  - **CSV Import & Export**: One-click inventory backup and spreadsheet batch import
  - One-click duplicate piece & star toggle for homepage features
- **Add / Edit Masterpiece (`/admin/products/add`)**:
  - Title, SKU, Description, Pricing & Discount Price
  - Stock count & individual low stock threshold
  - **Media Manager**: Multi-image upload, video upload, and external URL paste
  - **Variant Manager**: Color name, hex color swatch picker, size/configuration, and price adjustment (+/-)
  - Material, Dimensions, Weight, Warranty, and Care instructions
  - Editorial tags (New Arrival, Best Seller, Sale, Limited Edition, Trending)
  - Status (Active / Draft) and Display Priority
- **Salons & Categories (`/admin/categories`)**:
  - Create, edit, and delete salon spaces with cover photos and descriptions
- **Concierge & Atelier Settings (`/admin/settings`)**:
  - **Configurable WhatsApp Business Number**
  - Default inquiry greeting template
  - Atelier flagship address, phone, and email
  - Global low stock alert threshold

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
The application will launch at:
- **Public Storefront**: [http://localhost:5173/](http://localhost:5173/)
- **Atelier Admin Portal**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

### 2. Admin Login Credentials
- **Quick Demo Button**: Click *"Use Quick Demo Credentials"* on the login page, or use:
  - **Email**: `admin@maisonelegance.com`
  - **Passcode**: `admin123`

---

## 🔐 Firebase Firestore Setup

Your project credentials (`maison-elegance-22176`) are configured in `.env`.

To allow public reads and admin cloud writes in Firestore:
1. Open the [Firebase Console](https://console.firebase.google.com/project/maison-elegance-22176/firestore/rules)
2. Go to **Firestore Database** → **Rules**
3. Paste the contents of `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if true;
    }
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if true;
    }
    match /settings/{docId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```
4. Click **Publish**.

*(Note: Even before updating Firebase rules, the app runs smoothly with local persistence fallback!)*

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── common/       # Navbar, Footer, FloatingWhatsApp, ProductCard, Loader
│   ├── home/         # HeroSection, CategoriesShowcase, FeaturedProducts, CraftsmanshipStory, Testimonials
│   └── admin/        # AdminLayout, MediaUploader, VariantManager, ProtectedRoute
├── context/          # CartContext (localStorage), AuthContext, SettingsContext
├── firebase/         # config.js (Firebase Auth, Firestore, Storage)
├── pages/
│   ├── Home.jsx, Shop.jsx, ProductDetail.jsx, Cart.jsx, About.jsx, Contact.jsx, Login.jsx
│   └── admin/        # Dashboard.jsx, ManageProducts.jsx, AddProduct.jsx, EditProduct.jsx, ManageCategories.jsx, Settings.jsx
├── services/         # productService.js, categoryService.js, settingsService.js, storageService.js, csvService.js
└── utils/            # formatPrice.js, whatsapp.js, constants.js
```
