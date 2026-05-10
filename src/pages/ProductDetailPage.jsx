import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { TYPE_ICONS } from "../data/constants";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center">
        <p className="text-white/25 text-lg">404 — Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty, product.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] px-10 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2.5 no-underline group w-fit mb-10
          bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/20
          px-4 py-2.5 rounded-full transition-all"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60 group-hover:text-white transition-all group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span className="text-white/60 group-hover:text-white text-[14px] font-medium transition-colors">
          Back to shop
        </span>
      </Link>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-14">
        <div className="shrink-0 w-full md:w-95">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#2c2c2e] shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            {product.cover_url ? (
              <img
                src={product.cover_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/15 text-6xl">
                {TYPE_ICONS[product.type] ?? "◈"}
              </div>
            )}

            {product.badge && (
              <span
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest text-white ${
                  product.badge === "limited"
                    ? "bg-[rgba(255,60,95,0.9)]"
                    : "bg-[#fc3c44]"
                }`}
              >
                {product.badge}
              </span>
            )}

            <span className="absolute top-3 right-3 bg-[rgba(28,28,30,0.75)] backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[11px] text-white/60 font-medium flex items-center gap-1.5">
              {TYPE_ICONS[product.type] ?? "◈"} {product.type}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#fc3c44] font-semibold">
              {product.genre}
            </span>
            <h1 className="mt-1 text-[2.2rem] font-bold text-white leading-tight">
              {product.title}
            </h1>
            <p className="mt-1 text-white/50 text-[15px]">
              by {product.artist}
            </p>
          </div>

          <div className="border-t border-white/8" />

          <p className="text-white/55 text-[14px] leading-[1.8]">
            {product.description}
          </p>

          <div className="border-t border-white/8" />

          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/35 mb-1">
              Price
            </p>
            <p className="text-[2rem] font-bold text-white">${product.price}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/35 mb-2">
              Quantity
            </p>
            <div className="flex items-center w-fit rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold"
              >
                −
              </button>
              <span className="w-10 text-center text-white/88 font-semibold text-[15px]">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-1 flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg font-semibold text-[15px] transition-all active:scale-95 w-full md:w-fit ${
              added
                ? "bg-white/[0.07] border border-white/15 text-white/60 cursor-default"
                : "bg-[#fc3c44] hover:bg-[#e8333b] text-white"
            }`}
          >
            {added ? (
              <>✓ Added to cart</>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
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
                Add to cart — ${(product.price * qty).toFixed(2)}
              </>
            )}
          </button>

          <p className="text-white/25 text-[11px]">
            Includes unlimited streaming + download in MP3, FLAC and more
          </p>
        </div>
      </div>
    </div>
  );
}
