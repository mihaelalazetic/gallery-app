// src/components/AppHeader.tsx

import React from "react";
import { Layout, Space, Button, Dropdown, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  PictureOutlined,
  CalendarOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useThemeToggle } from "../providers/AppThemeProvider";
import logo from "../assets/logo3.png";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageChanger";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";

const { Header } = Layout;

interface Props {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const AppHeader: React.FC<Props> = () => {
  const { darkMode } = useThemeToggle();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Menu for “New …” dropdown
  const addMenu = (
    <Menu
      theme={darkMode ? "dark" : "light"}
      items={[
        {
          key: "artwork",
          icon: <PictureOutlined />,
          label: <Link to="/upload-artwork">Add Artwork</Link>,
        },
        {
          key: "exhibition",
          icon: <CalendarOutlined />,
          label: <Link to="/create-exhibition">Add Exhibition</Link>,
        },
        {
          key: "event",
          icon: <CalendarOutlined />,
          label: <Link to="/create-event">Add Event</Link>,
        },
      ]}
    />
  );

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
        {isLoggedIn && (
          <Dropdown overlay={addMenu} placement="bottomRight">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              ghost
              style={{ display: "flex", alignItems: "center" }}
            >
              New <DownOutlined style={{ marginLeft: 4 }} />
            </Button>
          </Dropdown>
        )}
        {/* <ThemeToggle /> */}
        <LanguageSwitcher />
        <UserProfile />
      </Space>
    </Header>
  );
};

export default AppHeader;
