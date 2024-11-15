import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/global.css";
import "./css/reset.css";

import Home from "./routes/Home";
import Root from "./routes/root";
import ErrorPage from "./routes/ErrorPage";
import MensStudy from "./routes/MensStudy";
import Elders from "./routes/Elders";
import WhatWeBeleive from "./routes/WhatWeBelieve";
import CurrentStudies from "./routes/CurrentStudies";
import IdentityYouth from './routes/IdentityYouth'
import PrayerChain from './routes/PrayerChain'
import School from "./routes/School";
import Giving from './routes/Giving'

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
        element: < IdentityYouth/>,
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
