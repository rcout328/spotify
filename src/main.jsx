import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Approuter from "./Components/Approuter.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { SkeletonTheme } from "react-loading-skeleton";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Approuter />
      </SkeletonTheme>
    </ClerkProvider>
  </React.StrictMode>
);
