import React, { useEffect, useState, Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import MobileNavbar from "../components/navbar/MobileNavbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Root() {
  const [isMobileDisplay, setIsMobileDisplay] = useState(true);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  const verifyUser = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!token) {
      setUser({});
    }
    try {
      const response = await fetch(
        "api/user/verify",
        options
      );
      if (!response.ok) {
        setUser({});
        sessionStorage.removeItem("token");
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setUser({});
    }
  };

  useEffect(() => {
    const checkMobileDisplay = () => {
      window.innerWidth > 600
        ? setIsMobileDisplay(false)
        : setIsMobileDisplay(true);
    };

    checkMobileDisplay();

    window.addEventListener("resize", checkMobileDisplay);

    return () => window.removeEventListener("resize", checkMobileDisplay);
  }, []);

  useEffect(() => {
    verifyUser();
  }, [token]);

  return (
    <div className="page-flex">
      <div>
        <nav>{isMobileDisplay ? <MobileNavbar /> : <Navbar user={user} />}</nav>
        <Suspense fallback={<Loader />}>
          <Outlet context={{ user, setToken }} />
          <ScrollRestoration />
        </Suspense>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Root;
