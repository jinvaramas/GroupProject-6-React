import { useState } from "react";

export default function ProductCard({ product }) {
  const [customPrice, setCustomPrice] = useState(product.price);
  const [error, setError] = useState("");

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setCustomPrice(val);
    if (val < product.min_price) {
      setError(`Minimum ฿${product.min_price}`);
    } else {
      setError("");
    }
  };

  return (
    <div className="group flex flex-col gap-3 bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800">
        <img
          src={product.cover_url}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white uppercase tracking-tighter">
          {product.type}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-white text-lg leading-tight truncate">
          {product.title}
        </h3>
        <p className="text-white/50 text-sm">by {product.artist}</p>

        <div className="mt-3">
          {product.name_your_price ? (
            <div className="space-y-1.5">
              <p className="text-[11px] text-white/40 uppercase tracking-wider">
                Name your price (min ฿{product.min_price})
              </p>
              <input
                type="number"
                value={customPrice}
                onChange={handlePriceChange}
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm w-full text-white focus:outline-none focus:border-[#6c63ff]"
              />
              {error && (
                <p className="text-[10px] text-red-400 font-medium">{error}</p>
              )}
            </div>
          ) : (
            <p className="text-[#6c63ff] font-bold text-xl">฿{product.price}</p>
          )}
        </div>

        <button className="mt-4 w-full bg-gradient-to-r from-[#6c63ff] to-[#4b45cc] text-white py-2.5 rounded-full text-sm font-bold hover:shadow-[0_0_15px_rgba(108,99,255,0.4)] transition-all active:scale-95">
          Buy Now ฿
          {product.name_your_price
            ? customPrice >= product.min_price
              ? customPrice
              : product.min_price
            : product.price}
        </button>
      </div>
    </div>
  );
}
