import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageChanger";
import ThemeToggle from "./ThemeToggle";

import logo from "../assets/logo3.png";
import { useThemeToggle } from "../providers/AppThemeProvider";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
const { Header } = Layout;

const AppHeader: React.FC<{
  collapsed: boolean;
}> = () => {
  const { darkMode } = useThemeToggle();

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: darkMode ? "#1e1e2f" : "#f5f5f7",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <img
            src={logo}
            alt="e-Gallery Logo"
            style={{ width: "50px", verticalAlign: "middle" }}
          />
        </Link>
      </div>
      <SearchBar />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ThemeToggle />
        <LanguageSwitcher />
        <UserProfile />
      </div>
    </Header>
  );
};

export default AppHeader;
