import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import MobileNavbar from "../components/navbar/MobileNavbar";
import Footer from "../components/Footer";

function Root() {
  const [isMobileDisplay, setIsMobileDisplay] = useState(true);

  useEffect(() => {
    const checkMobileDisplay = () => {
      window.innerWidth > 500
        ? setIsMobileDisplay(false)
        : setIsMobileDisplay(true);
    };

    checkMobileDisplay();

    window.addEventListener("resize", checkMobileDisplay);

    return () => window.removeEventListener("resize", checkMobileDisplay);
  }, []);

  return (
    <div className="page-flex">
      <div>
        <nav>{isMobileDisplay ? <MobileNavbar /> : <Navbar />}</nav>
        <Outlet />
        <ScrollRestoration />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Root;
