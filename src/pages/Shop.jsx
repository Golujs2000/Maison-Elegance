import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "../components/common/ProductCard";
import Loader from "../components/common/Loader";
import { PRODUCT_TAGS } from "../utils/constants";
import { formatPrice } from "../utils/formatPrice";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters state initialized from URL params if present
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";
  const tagParam = searchParams.get("tag") || "all";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedTag, setSelectedTag] = useState(tagParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("sortOrder"); // sortOrder, price-asc, price-desc, newest

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("search") || "");
    setSelectedTag(searchParams.get("tag") || "all");
  }, [searchParams]);

  useEffect(() => {
    async function initData() {
      setLoading(true);
      try {
        const [prodList, catList] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(prodList.filter((p) => p.status !== "draft"));
        setCategories(catList);
      } catch (err) {
        console.error("Shop load error:", err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // Filtered & sorted products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }
        // Tag filter
        if (selectedTag !== "all" && (!item.tags || !item.tags.includes(selectedTag))) {
          return false;
        }
        // Price filter
        const price = item.discountPrice || item.price;
        if (price > maxPrice) {
          return false;
        }
        // Stock filter
        if (inStockOnly && item.stock <= 0) {
          return false;
        }
        // Search term
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name?.toLowerCase().includes(q);
          const matchSku = item.sku?.toLowerCase().includes(q);
          const matchCat = item.categoryName?.toLowerCase().includes(q);
          const matchMat = item.material?.toLowerCase().includes(q);
          if (!matchName && !matchSku && !matchCat && !matchMat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;

        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "newest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        return (a.sortOrder || 99) - (b.sortOrder || 99);
      });
  }, [products, selectedCategory, selectedTag, maxPrice, inStockOnly, searchQuery, sortBy]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", slug);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedTag("all");
    setSearchQuery("");
    setMaxPrice(250000);
    setInStockOnly(false);
    setSortBy("sortOrder");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTag !== "all" ||
    searchQuery !== "" ||
    maxPrice < 250000 ||
    inStockOnly;

  return (
    <div className="bg-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-sand pb-8 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
            The Atelier Catalog
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
                Curated Living Collections
              </h1>
              <p className="text-sm text-charcoal-muted mt-1">
                Explore hand-finished furniture, architectural tables, and upholstered suites.
              </p>
            </div>

            {/* Quick Summary */}
            <div className="text-xs text-charcoal-muted flex items-center gap-3">
              <span>Showing <strong className="text-primary">{filteredProducts.length}</strong> pieces</span>
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 bg-white border border-sand rounded-lg text-charcoal flex items-center gap-1.5 text-xs"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white border border-sand p-6 rounded-2xl shadow-soft space-y-6">
              
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-gold-dark" />
                  <h3 className="font-serif text-base font-semibold text-primary">Filters</h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw size={11} />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Search Within Catalog */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Piece name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-cream-50 border border-sand rounded-lg pl-8 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-charcoal-muted" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                  Room & Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategorySelect("all")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === "all"
                        ? "bg-primary text-cream-50 font-medium"
                        : "text-charcoal-muted hover:bg-cream-100 hover:text-charcoal"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] opacity-75">{products.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id || cat.slug}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? "bg-primary text-cream-50 font-medium"
                          : "text-charcoal-muted hover:bg-cream-100 hover:text-charcoal"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-75">
                        {products.filter((p) => p.category === cat.slug).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag / Collection Badges */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                  Edition / Tag
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedTag("all")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                      selectedTag === "all"
                        ? "bg-primary text-white border-primary"
                        : "bg-cream-50 text-charcoal border-sand hover:border-gold-300"
                    }`}
                  >
                    All
                  </button>
                  {PRODUCT_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setSelectedTag(selectedTag === tag.id ? "all" : tag.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                        selectedTag === tag.id
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-charcoal border-sand hover:border-gold-300"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-primary">
                    Max Investment
                  </label>
                  <span className="text-xs font-serif font-bold text-primary">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold-dark cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-charcoal-muted mt-1">
                  <span>₹20,000</span>
                  <span>₹2,50,000+</span>
                </div>
              </div>

              {/* Stock availability */}
              <div className="pt-2 border-t border-sand">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-primary rounded"
                  />
                  <span>Ready for Dispatch (In Stock)</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sorting Toolbar */}
            <div className="bg-white border border-sand px-4 py-3 rounded-xl flex items-center justify-between flex-wrap gap-3">
              {/* Active filter badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sand/60 text-primary text-[11px] rounded-md">
                    <span>{categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
                    <button onClick={() => handleCategorySelect("all")}><X size={12} /></button>
                  </span>
                )}
                {selectedTag !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold-100 text-gold-dark text-[11px] rounded-md">
                    <span>{PRODUCT_TAGS.find((t) => t.id === selectedTag)?.label || selectedTag}</span>
                    <button onClick={() => setSelectedTag("all")}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-cream-50 text-[11px] rounded-md">
                    <span>Query: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery("")}><X size={12} /></button>
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs text-charcoal ml-auto">
                <span className="text-charcoal-muted uppercase tracking-wider text-[11px]">Arrange by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-cream-50 border border-sand rounded-lg px-2.5 py-1.5 text-xs text-primary focus:outline-none focus:border-gold"
                >
                  <option value="sortOrder">Curator Priority</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Display */}
            {loading ? (
              <Loader message="Fetching curated catalog..." />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-sand rounded-2xl p-8 space-y-4">
                <h3 className="font-serif text-2xl text-primary font-normal">
                  No pieces match your specified criteria.
                </h3>
                <p className="text-xs text-charcoal-muted max-w-md mx-auto">
                  Try broadening your price range, clearing active tags, or resetting filters to see our full atelier inventory.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-primary text-cream-50 text-xs uppercase tracking-widest rounded-lg hover:bg-gold-dark transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <h3 className="font-serif text-lg font-semibold text-primary">Catalog Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-charcoal-muted hover:text-charcoal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                  Room & Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleCategorySelect("all");
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                      selectedCategory === "all" ? "bg-primary text-white" : "text-charcoal"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id || cat.slug}
                      onClick={() => {
                        handleCategorySelect(cat.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                        selectedCategory === cat.slug ? "bg-primary text-white" : "text-charcoal"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Max Price:</span>
                  <span className="font-bold">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-sand flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 border border-sand text-xs uppercase tracking-wider font-medium rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-primary text-white text-xs uppercase tracking-wider font-medium rounded-lg"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
