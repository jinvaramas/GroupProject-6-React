import { useCart } from "../context/CartContext";
import { TYPE_ICONS } from "../data/constants";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clearCart, totalPrice } =
    useCart();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-105 bg-[#1c1c1e] border-l border-white/8 z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2 className="text-white/90 font-semibold text-[16px]">
              Shopping Cart
            </h2>
            {items.length > 0 && (
              <span className="bg-[#fc3c44] text-white text-[11px] font-bold rounded-full px-2 py-0.5 min-w-5.5 text-center">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/35 hover:text-white/70 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="text-white/25 text-[14px]">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 p-4 rounded-xl bg-white/4 border border-white/6"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#2c2c2e] shrink-0">
                  {item.product.cover_url ? (
                    <img
                      src={item.product.cover_url}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl">
                      {TYPE_ICONS[item.product.type] ?? "◈"}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white/88 font-semibold text-[13px] truncate">
                    {item.product.title}
                  </p>
                  <p className="text-white/40 text-[11px] truncate">
                    by {item.product.artist}
                  </p>
                  <p className="text-white/28 text-[11px] mt-0.5">
                    {item.product.type}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-white/88 font-semibold text-[12px]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-white/85 font-semibold text-[14px]">
                      ${(item.unitPrice * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.key)}
                  className="text-white/20 hover:text-[rgba(255,80,110,0.7)] transition-colors text-sm shrink-0 self-start mt-0.5"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/45 text-[13px]">Total</span>
              <span className="text-white font-bold text-[22px]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-[#fc3c44] hover:bg-[#e8333b] text-white font-semibold text-[15px] py-3.5 rounded-lg transition-colors active:scale-[0.99]">
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full text-white/35 hover:text-[rgba(255,80,110,0.65)] text-[12px] transition-colors underline-offset-2 hover:underline"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
