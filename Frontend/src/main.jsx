import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppContextProvide } from "./Context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContextProvide>
        <App />
      </AppContextProvide>
    </ClerkProvider>
  </BrowserRouter>
);
