import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppThemeProvider from "./providers/AppThemeProvider";
import { router } from "./routes";
import "./index.css";
import "./i18n/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";
import { FilterProvider } from "./context/FilterContext";
import { GlobalNotificationProvider } from "./providers/GlobalNotificationProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <AppThemeProvider>
          <GlobalNotificationProvider>
            <AntdApp>
              {/* Wrap your application with AntdApp */}
              <RouterProvider router={router} />
            </AntdApp>
          </GlobalNotificationProvider>
        </AppThemeProvider>
      </FilterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
