import React, { useEffect, useRef, useState } from "react";
import "../../css/navbar.css";
import { Link } from "react-router-dom";
import { whoData, ministryData } from "./navbarData.js";
import HoverDropDown from "../navbar/HoverDropDown";

function Navbar() {
  const [isWhoMounted, setIsWhoMounted] = useState(false);
  const [showWho, setShowWho] = useState(false);
  const [isMinistryMounted, setIsMinistryMounted] = useState(false);
  const [showMinistry, setShowMinistry] = useState(false);
  const whoTimeoutRef = useRef(null);
  const ministryTimeoutRef = useRef(null);

  const end = (isMounted, setShow) => {
    if (!isMounted) setShow(false);
  };

  const handleMouseEnter = (setShow, setMounted, hideTimeoutRef) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShow(true);
    setMounted(true);
  };

  const handleMouseLeave = (setMounted, hideTimeoutRef) => {
    hideTimeoutRef.current = setTimeout(() => {
      setMounted(false);
    }, 100);
  };

  return (
    <div className="nav-flex">
      <div className="general-text">
        <Link to="/">LQCF Church</Link>
      </div>
      <div>
        <span
          className="general-text"
          onMouseEnter={() => {
            handleMouseEnter(setShowWho, setIsWhoMounted, whoTimeoutRef);
          }}
          onMouseLeave={() => {
            handleMouseLeave(setIsWhoMounted, whoTimeoutRef);
          }}
        >
          Who We Are
          {showWho && (
            <HoverDropDown
              data={whoData}
              isMounted={isWhoMounted}
              setShow={setShowWho}
              end={end}
            />
          )}
        </span>
        <span
          className="general-text"
          onMouseEnter={() => {
            handleMouseEnter(
              setShowMinistry,
              setIsMinistryMounted,
              ministryTimeoutRef
            );
          }}
          onMouseLeave={() => {
            handleMouseLeave(setIsMinistryMounted, ministryTimeoutRef);
          }}
        >
          Ministries
          {showMinistry && (
            <HoverDropDown
              data={ministryData}
              isMounted={isMinistryMounted}
              setShow={setShowMinistry}
              end={end}
            />
          )}
        </span>

        <Link to="/school">
          <span className="general-text">School</span>
        </Link>
        <Link to="/giving">
          <span className="general-text">Giving</span>
        </Link>
        <Link to="/events">
          <span className="general-text">Events</span>
        </Link>
        <Link to="/prayer">
          <span className="general-text">Prayer</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
