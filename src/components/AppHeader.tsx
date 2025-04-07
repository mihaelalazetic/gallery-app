import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

import { useThemeToggle } from "../providers/AppThemeProvider";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const { Header } = Layout;

const AppHeader: React.FC<{
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({ collapsed, toggleCollapsed }) => {
  const { darkMode } = useThemeToggle();

  return (
    <Header
      style={{
        backgroundColor: darkMode ? "#1f1f1f" : "#f5f5f7",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{ fontSize: 16 }}
        />
        <Link to="/" style={{ marginLeft: 16 }}>
          <img src="/logo.png" alt="e-Gallery Logo" style={{ height: 40 }} />
        </Link>
      </div>
      <SearchBar />
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <LanguageSwitcher />
        <ThemeToggle />
        <UserProfile />
      </div>
    </Header>
  );
};

export default AppHeader;
