import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppThemeProvider from "./providers/AppThemeProvider";
import { router } from "./routes";
import "./index.css"; // ✅ OR './app.css' — depending where your global styles live
import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </React.StrictMode>
);
