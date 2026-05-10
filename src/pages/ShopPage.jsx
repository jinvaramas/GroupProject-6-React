import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { TYPE_ICONS, GENRES, TYPES } from "../data/constants";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const productPath = (product) =>
  `/product/${product.id}/${slugify(product.title)}`;

export default function ShopPage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState("all categories");
  const [search, setSearch] = useState("");
  const [previewProduct, setPreviewProduct] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());

  const toggleWishlist = (id) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleGenre = (g) => {
    if (g === "all genres") {
      setSelectedGenres([]);
      return;
    }
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedType("all categories");
    setSearch("");
  };

  const hasActiveFilters =
    selectedGenres.length > 0 ||
    selectedType !== "all categories" ||
    search !== "";

  const filtered = products.filter((p) => {
    const matchGenre =
      selectedGenres.length === 0 || selectedGenres.includes(p.genre);

    let matchType;
    if (selectedType === "all categories") {
      matchType = p.type === "digital";
    } else {
      matchType = p.type === selectedType;
    }

    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.artist.toLowerCase().includes(search.toLowerCase()) ||
      p.genre.toLowerCase().includes(search.toLowerCase());

    return matchGenre && matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#1c1c1e] flex">
      {/* ─── Main content ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Filter bar */}
        <div className="px-6 pt-6 pb-4 border-b border-white/8 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-md px-3 py-2 max-w-72 focus-within:border-white/30 transition-colors">
            <svg
              className="text-white/40 shrink-0"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search genre, artist, title…"
              className="bg-transparent outline-none text-[14px] text-white/80 placeholder:text-white/30 w-full"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-white/30 hover:text-white/60 transition-colors text-[8px]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Genre pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => toggleGenre("all genres")}
              className={`px-4.5 py-2 rounded-full text-[15px] font-medium transition-all ${
                selectedGenres.length === 0
                  ? "bg-[#fc3c44] text-white"
                  : "bg-white/[0.07] text-white/55 hover:bg-white/10 hover:text-white/85"
              }`}
            >
              all genres
            </button>
            {GENRES.filter((g) => g !== "all genres").map((g) => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`px-4.5 py-2 rounded-full text-[15px] font-medium transition-all ${
                  selectedGenres.includes(g)
                    ? "bg-[#fc3c44] text-white"
                    : "bg-white/[0.07] text-white/55 hover:bg-white/10 hover:text-white/85"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Type pills */}
          <div className="flex flex-wrap items-center gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`flex items-center gap-1.5 px-3.5 py-1.25 rounded-full text-[14px] font-medium border transition-all ${
                  selectedType === t
                    ? "bg-[rgba(252,60,68,0.15)] text-white border-[rgba(252,60,68,0.45)]"
                    : "bg-transparent text-white/45 border-white/10 hover:border-white/25 hover:text-white/75"
                }`}
              >
                <span className="text-[8px]">{TYPE_ICONS[t]}</span>
                {t}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-2 text-[11px] text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
              >
                clear all
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="px-6 py-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-white/20 text-[14px]">
              No products found.
            </div>
          ) : (
            <div
              className={`grid gap-x-4 gap-y-6 ${
                previewProduct
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
              }`}
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={previewProduct?.id === product.id}
                  onPreview={setPreviewProduct}
                  wishlisted={wishlist.has(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Preview panel ─── */}
      {previewProduct && (
        <PreviewPanel
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          wishlisted={wishlist.has(previewProduct.id)}
          onWishlist={toggleWishlist}
        />
      )}
    </div>
  );
}

/* ─── ProductCard ─── */
function ProductCard({ product, isSelected, onPreview, wishlisted }) {
  const { addToCart } = useCart();
  const [flashed, setFlashed] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.price);
    setFlashed(true);
    setTimeout(() => setFlashed(false), 1400);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview(product);
  };

  return (
    <Link
      to={productPath(product)}
      className={`group flex flex-col gap-2 no-underline rounded-xl transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-[#fc3c44] ring-offset-2 ring-offset-[#1c1c1e]"
          : "hover:ring-1 hover:ring-white/15 hover:ring-offset-1 hover:ring-offset-[#1c1c1e]"
      }`}
    >
      {/* Cover */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#2c2c2e]">
        {product.cover_url ? (
          <img
            src={product.cover_url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/15 text-4xl">
            {TYPE_ICONS[product.type] ?? "◈"}
          </div>
        )}

        {/* Hover action bar — Preview + Add to cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex">
          <button
            onClick={handlePreview}
            className="flex-1 py-2 text-[11px] font-semibold flex items-center justify-center gap-1 bg-[rgba(28,28,30,0.92)] backdrop-blur-sm text-white/70 hover:bg-[#6c63ff] hover:text-white transition-colors border-r border-white/10"
          >
            {/* eye icon */}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview
          </button>
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-2 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors ${
              flashed
                ? "bg-[#fc3c44] text-white"
                : "bg-[rgba(28,28,30,0.92)] backdrop-blur-sm text-white/70 hover:bg-[#fc3c44] hover:text-white"
            }`}
          >
            {flashed ? (
              <>✓ Added</>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to cart
              </>
            )}
          </button>
        </div>

        {product.badge && (
          <span
            className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
              product.badge === "limited"
                ? "bg-[rgba(255,60,95,0.9)]"
                : "bg-[#fc3c44]"
            } text-white`}
          >
            {product.badge}
          </span>
        )}

        <span className="absolute top-1.5 right-1.5 bg-[rgba(28,28,30,0.75)] backdrop-blur-sm border border-white/10 px-2 py-0.75 rounded text-[12px] text-white/55 font-medium flex items-center gap-1">
          <span>{TYPE_ICONS[product.type] ?? "◈"}</span>
          {product.type}
        </span>
      </div>

      {/* Text */}
      <div className="px-0.5 pb-1 relative">
        {wishlisted && (
          <span className="absolute top-1 right-1 z-10 text-[#ff3c5f] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </span>
        )}
        <h3 className="font-semibold text-white/88 text-[15px] leading-snug truncate group-hover:text-white transition-colors">
          {product.title}
        </h3>
        <p className="text-white/45 text-[13px] truncate">
          by {product.artist}
        </p>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-[12px] text-white/30 uppercase tracking-wide">
            {product.genre}
          </span>
          <span className="text-white/80 text-[14px] font-semibold">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── PreviewPanel ─── */
function PreviewPanel({ product, onClose, wishlisted, onWishlist }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1, product.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="w-72 shrink-0 sticky top-0 self-start h-[80vh] overflow-y-auto bg-[#111] border-l border-white/8 flex flex-col">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/90 text-white/60 hover:text-white transition-all p-2 rounded-md"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Main cover image */}
      <div className="aspect-square w-full bg-[#1a1a1a] shrink-0 relative overflow-hidden">
        {product.cover_url ? (
          <img
            src={product.cover_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-7xl">
            {TYPE_ICONS[product.type] ?? "◈"}
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="px-4 py-4 flex flex-col gap-3 flex-1">
        {/* Play button + track info */}
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 shrink-0 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="black"
              stroke="none"
            >
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </button>
          <div className="min-w-0">
            <p className="text-white text-[14px] font-semibold leading-tight truncate">
              {product.title}
            </p>
            <p className="text-white/45 text-[12px] truncate">
              from {product.title}
            </p>
            <p className="text-white/45 text-[12px] truncate">
              by {product.artist}
            </p>
          </div>
        </div>

        {/* Divider + meta */}
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-white/35 text-[10px] uppercase tracking-widest">
              {product.type}
            </span>
            <span className="text-white/35 text-[10px] uppercase tracking-widest">
              {product.genre}
            </span>
          </div>
          <span className="text-white font-bold text-[18px]">
            ${product.price}
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-white/35 text-[12px] leading-relaxed line-clamp-4 border-t border-white/8 pt-3">
            {product.description}
          </p>
        )}

        {/* Badge */}
        {product.badge && (
          <span
            className={`self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              product.badge === "limited"
                ? "bg-[rgba(255,60,95,0.2)] text-[#ff3c5f] border border-[rgba(255,60,95,0.3)]"
                : "bg-[rgba(252,60,68,0.2)] text-[#fc3c44] border border-[rgba(252,60,68,0.3)]"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Action buttons — pinned to bottom */}
        <div className="flex gap-2 mt-auto pt-3">
          <button
            onClick={() => navigate(productPath(product))}
            className="flex-1 py-2.5 rounded-full bg-white text-black text-[13px] font-bold hover:bg-white/90 active:scale-95 transition-all"
          >
            Go to album
          </button>
          <button
            onClick={() => onWishlist(product.id)}
            className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold border transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              wishlisted
                ? "bg-[rgba(255,60,95,0.15)] border-[rgba(255,60,95,0.5)] text-[#ff3c5f]"
                : "bg-transparent border-white/20 text-white/60 hover:border-white/40 hover:text-white"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
