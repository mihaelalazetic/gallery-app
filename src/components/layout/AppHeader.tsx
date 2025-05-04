// src/components/AppHeader.tsx

import { Layout, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import { useThemeToggle } from "../../providers/AppThemeProvider";
import SearchBar from "../utils/SearchBar";
import ThemeToggle from "../utils/ThemeToggle";
import UserProfile from "../utils/UserProfile";

const { Header } = Layout;

interface Props {
  collapsed: boolean;
  // toggleCollapsed: () => void;
}

const AppHeader: React.FC<Props> = () => {
  const { darkMode } = useThemeToggle();
  // const isLoggedIn = Boolean(localStorage.getItem("token"));s

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        // backgroundColor: darkMode ? "#1e1e2f" : "#f5f5f7",
        background: darkMode ? "#1e1e2f" : "#ffffff",

        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Left: sidebar toggle + logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <img
            src={logo}
            alt="e-Gallery Logo"
            style={{ width: "50px", verticalAlign: "middle" }}
          />
        </Link>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 1, margin: "0 24px" }}>
        <SearchBar />
      </div>

      {/* Right: actions */}
      <Space align="center" size="middle" style={{ flex: "0 0 auto" }}>
        <ThemeToggle />
        <UserProfile />
      </Space>
    </Header>
  );
};

export default AppHeader;
