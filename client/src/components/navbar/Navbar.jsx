import React, { useEffect, useRef, useState } from "react";
import "../../css/navbar.css";
import { Link } from "react-router-dom";
import { whoData, ministryData } from "./navbarData.js";
import HoverDropDown from "../navbar/HoverDropDown";

function Navbar({ user }) {
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
      <div>
        <span className="general-text">
          <Link to="/">LQCF Church</Link>
        </span>
        <span style={{ marginLeft: "10px" }}>{user && user.username}</span>
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
        <span className="general-text">
          <Link to="/school">School</Link>
        </span>
        <span className="general-text">
          <Link to="/giving">Giving</Link>
        </span>
        <span className="general-text">
          <Link to="/events">Events</Link>
        </span>
        <span className="general-text">
          <Link to="/prayer">Prayer</Link>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
