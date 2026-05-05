import React from "react";

export default function Nav() {
  return (
    <nav className="navbar2">
      <ul className="nav-links">
        <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
        <li><a href="#">Digital music</a></li>
        <li><a href="#">Vinyl</a></li>
        <li><a href="#">Compact discs</a></li>
        <li><a href="#">Cassettes</a></li>
        <li><a href="#">T-shirts</a></li>
        <li><a href="#">Gift cards</a></li>
        <li><a href="#">Editorial</a></li>
        <li><a href="#">Club</a></li>
        <li><a href="#">Store</a></li>
      </ul>
    </nav>
  );
}
