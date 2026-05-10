import { Link } from "react-router-dom";
import logoImg from "../assets/logo_realv02.png";
import { useCart } from "../context/CartContext";

export default function Head() {
  const { totalItems, setOpen } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logoImg} alt="AUDTLIST" className="logo-img" />
      </Link>

      <div className="search-container">
        <div className="search-box">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            search
          </span>
          <input type="text" placeholder="search" />
        </div>
      </div>

      <div className="auth-buttons">
        {/* Cart icon */}
        <button onClick={() => setOpen(true)} className="cart-btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>

        <button className="btn-signin">Sign in</button>
        <button className="btn-register">Register</button>
      </div>
    </nav>
  );
}
