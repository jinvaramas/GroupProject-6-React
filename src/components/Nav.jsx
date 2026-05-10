import React from "react";

const NAV_ITEMS = [
  "Digital music",
  "Vinyl",
  "Compact discs",
  "Cassettes",
  "T-shirts",
  "Gift cards",
  "Editorial",
  "Club",
  "Store",
];

export default function Nav() {
  return (
    <nav className="flex items-center justify-center px-[10%] bg-black/25 backdrop-blur border-t border-white/8 h-14">
      <svg
        className="mr-3 shrink-0 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="#e3e3e3"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
      <ul className="flex items-center list-none">
        {NAV_ITEMS.map((item) => (
          <li key={item} className="text-base font-medium tracking-[0.04em]">
            <a
              href="#"
              className="text-white/80 no-underline px-3 py-2 block rounded-lg transition-all hover:text-white hover:bg-white/8"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
