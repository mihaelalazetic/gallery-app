import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import AppThemeProvider from "./providers/AppThemeProvider";
import { router } from "./routes";
import i18n from "./i18n/i18n";
import "./index.css"; // ✅ OR './app.css' — depending where your global styles live

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
