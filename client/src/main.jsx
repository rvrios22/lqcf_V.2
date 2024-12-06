import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/global.css";
import "./css/reset.css";

const Home = lazy(() => import("./routes/Home"));
const Root = lazy(() => import("./routes/Root"));
const ErrorPage = lazy(() => import("./routes/ErrorPage"));
const MensStudy = lazy(() => import("./routes/MensStudy"));
const Elders = lazy(() => import("./routes/Elders"));
const WhatWeBeleive = lazy(() => import("./routes/WhatWeBelieve"));
const CurrentStudies = lazy(() => import("./routes/CurrentStudies"));
const IdentityYouth = lazy(() => import("./routes/IdentityYouth"));
const PrayerChain = lazy(() => import("./routes/PrayerChain"));
const School = lazy(() => import("./routes/School"));
const Giving = lazy(() => import("./routes/Giving"));
const Prayer = lazy(() => import("./routes/Prayer"));
const Events = lazy(() => import("./routes/Events"));
const WomensStudy = lazy(() => import("./routes/WomensStudy"));
const Login = lazy(() => import("./routes/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/mens-study",
        element: <MensStudy />,
      },
      {
        path: "/elders",
        element: <Elders />,
      },
      {
        path: "/beliefs",
        element: <WhatWeBeleive />,
      },
      {
        path: "/studies",
        element: <CurrentStudies />,
      },
      {
        path: "/identity-youth",
        element: <IdentityYouth />,
      },
      {
        path: "/prayer-chain",
        element: <PrayerChain />,
      },
      {
        path: "/school",
        element: <School />,
      },
      {
        path: "/giving",
        element: <Giving />,
      },
      {
        path: "/prayer",
        element: <Prayer />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/womens-study",
        element: <WomensStudy />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
