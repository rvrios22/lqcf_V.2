import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../../css/MobileNavbar.css";

function MobileNavbar() {
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  const [isMinistryOpen, setIsMinistryOpen] = useState(false);
  const [isWhoOpen, setIsWhoOpen] = useState(false);
  const ministryRef = useRef(null);
  const whoRef = useRef(null);

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
        <li
          className="general-text sub-menu"
          onClick={() => setIsMinistryOpen(!isMinistryOpen)}
        >
          Ministry{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
            className={isMinistryOpen ? "open" : ""}
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
          <menu
            className={isMinistryOpen ? "sub-drop-menu show" : "sub-drop-menu"}
          >
            <div>
              <li>
                <Link to="/identity-youth">Identity Youth</Link>
              </li>
              <li className="general-text">
                <Link to="/mens-study">Men's Study</Link>
              </li>
              <li className="general-text">
                <Link to="/womens-study">Women's Study</Link>
              </li>
              <li className="general-text">
                <Link to="/prayer-chain">Prayer Chain</Link>
              </li>
            </div>
          </menu>
        </li>
        <li
          className="general-text sub-menu"
          onClick={() => setIsWhoOpen(!isWhoOpen)}
        >
          Who We Are{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
            className={isWhoOpen ? "open" : ""}
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
          <menu className={isWhoOpen ? "sub-drop-menu show" : "sub-drop-menu"}>
            <div>
              <li className="general-text">
                <Link to="/elders">Our Elders</Link>
              </li>
              <li className="general-text">
                <Link to="/beliefs">What We Believe</Link>
              </li>
            </div>
          </menu>
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
