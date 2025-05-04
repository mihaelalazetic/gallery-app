import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ConfigProvider, theme as antdTheme } from "antd";
import { createContext, useContext, useState } from "react";

// Theme Context
const ThemeToggleContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
  colorPrimary: "#9254de", // 💜 default purple
});


export const useThemeToggle = () => useContext(ThemeToggleContext);

import { ReactNode } from "react";

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Material-UI Theme
  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#1e1e2f" : "#f3f4f6",
        paper: darkMode ? "#2a2a3b" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f3f3f3" : "#1a1a1a",
        secondary: darkMode ? "#cfcfcf" : "#4b4b4b",
      },
    },
    typography: {
      fontFamily: `"Poppins", "Segoe UI", sans-serif`,
    },
  });

  // Ant Design Theme
  const antdAlgorithm = darkMode
    ? antdTheme.darkAlgorithm
    : antdTheme.defaultAlgorithm;

  return (
    <ThemeToggleContext.Provider value={{ darkMode, toggleTheme, colorPrimary: "#9254de" }}>
      <ConfigProvider
        theme={{
          algorithm: antdAlgorithm,
          token: {
            colorBgBase: darkMode ? "#1e1e2f" : "#f3f4f6",
            colorBgContainer: darkMode ? "#2a2a3b" : "#ffffff",
            colorTextBase: darkMode ? "#f3f3f3" : "#1a1a1a",
            colorPrimary: "#9254de",
            fontFamily: "Poppins, Segoe UI, sans-serif",
          },
        }}
      >
        <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
      </ConfigProvider>
    </ThemeToggleContext.Provider>
  );
};

export default AppThemeProvider;
