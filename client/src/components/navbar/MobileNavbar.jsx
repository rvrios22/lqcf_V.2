import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/MobileNavbar.css";

function MobileNavbar() {
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  return (
    <>
      <label className="hamburger">
        <input
          type="checkbox"
          onClick={() => setIsMenuShowing(!isMenuShowing)}
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>

      <menu className={isMenuShowing ? "mobile-menu showing" : "mobile-menu"}>
        <li className="general-text">
          <Link to="/">Home</Link>
        </li>
        <li className="general-text">
          <Link to="/">Ministry</Link>
        </li>
        <li className="general-text">
          <Link to="/">Who We Are</Link>
        </li>
        <li className="general-text">
          <Link to="/">School</Link>
        </li>
        <li className="general-text">
          <Link to="/">Giving</Link>
        </li>
        <li className="general-text">
          <Link to="/">Events</Link>
        </li>
        <li className="general-text">
          <Link to="/">Prayer</Link>
        </li>
      </menu>
    </>
  );
}

export default MobileNavbar;
