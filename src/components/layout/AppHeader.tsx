import { Layout, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import { useThemeToggle } from "../../providers/AppThemeProvider";
import SearchBar from "../utils/SearchBar";
import ThemeToggle from "../utils/ThemeToggle";
import UserProfilePopover from "../utils/UserProfilePopover";

const { Header } = Layout;

interface Props {
  collapsed: boolean;
}

const AppHeader: React.FC<Props> = () => {
  const { darkMode } = useThemeToggle();

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        height: 64,
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        // ✨ Modern blur effect
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",

        // ✨ Semi-transparent background
        backgroundColor: darkMode
          ? "rgba(30, 30, 47, 0.7)"
          : "rgba(255, 255, 255, 0.75)",

        // ✨ Smooth shadow
        boxShadow: darkMode
          ? "0 2px 6px rgba(0,0,0,0.4)"
          : "0 2px 6px rgba(0,0,0,0.08)",

        // Optional: smooth transition
        transition: "background-color 300ms ease, backdrop-filter 300ms ease",
      }}
    >
      {/* Left: Logo */}
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

      {/* Right: Actions */}
      <Space align="center" size="middle" style={{ flex: "0 0 auto" }}>
        <ThemeToggle />
        <UserProfilePopover />
      </Space>
    </Header>
  );
};

export default AppHeader;
