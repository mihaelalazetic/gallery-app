import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppThemeProvider from "./providers/AppThemeProvider";
import { router } from "./routes";
import "./index.css"; // ✅ OR './app.css' — depending where your global styles live
import "./i18n/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
