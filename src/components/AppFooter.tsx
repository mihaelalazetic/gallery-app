import React from "react";
import { Layout } from "antd";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  const { darkMode } = useThemeToggle();

  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "16px 24px",
        backgroundColor: darkMode ? "#1e1e2f" : "#f4f5f7",
        color: darkMode ? "#aaa" : "#555",
      }}
    >
      e-Gallery ©{new Date().getFullYear()} Created by Mihaela Lazetic
    </Footer>
  );
};

export default AppFooter;
