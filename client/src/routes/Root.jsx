import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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

    window.addEventListener("resize", checkMobileDisplay);

    return () => window.removeEventListener("resize", checkMobileDisplay);
  }, []);

  return (
    <>
      <nav>{isMobileDisplay ? <MobileNavbar /> : <Navbar />}</nav>
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
