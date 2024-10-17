import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function HoverDropDown({ data, end, isMounted, setShow }) {
  //this animation relies on two states for each component, isMounted and showDiv. Both are triggered to true onHover and onExit isMounted is set to false triggering outAnim. onAnimEnd showDiv is set to false and remove from DOM
  const mountedStyle = {
    animation: "inAnim 300ms",
  };

  const unmountStyle = {
    animation: "outAnim 200ms",
    animationFillMode: "forwards",
  };
  return (
    <menu
      className="drop-down-container"
      style={isMounted ? mountedStyle : unmountStyle}
      onAnimationEnd={() => {
        end(isMounted, setShow);
      }}
    >
      {data.map((item, idx) => (
        <li key={idx}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </menu>
  );
}

export default HoverDropDown;
