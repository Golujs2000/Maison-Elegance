export const PRODUCT_TAGS = [
  { id: "new-arrival", label: "New Arrival", badgeClass: "bg-amber-100 text-amber-900 border-amber-200" },
  { id: "best-seller", label: "Best Seller", badgeClass: "bg-yellow-100 text-yellow-900 border-yellow-200" },
  { id: "sale", label: "Sale", badgeClass: "bg-rose-100 text-rose-800 border-rose-200" },
  { id: "limited-edition", label: "Limited Edition", badgeClass: "bg-stone-800 text-stone-50 border-stone-800" },
  { id: "trending", label: "Trending", badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200" },
];

export const STATUS_OPTIONS = [
  { value: "active", label: "Active (Published)" },
  { value: "draft", label: "Draft (Hidden)" },
];

export const STORAGE_KEYS = {
  CART: "maison_cart_items",
  PRODUCTS: "maison_cached_products",
  CATEGORIES: "maison_cached_categories",
  SETTINGS: "maison_site_settings",
  AUTH_ADMIN: "maison_admin_session",
};
