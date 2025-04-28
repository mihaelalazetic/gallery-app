import {
  AppstoreOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useThemeToggle } from "../providers/AppThemeProvider";
import ThemeToggle from "./ThemeToggle";

const { Sider } = Layout;

const AppSider: React.FC<{
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({ collapsed, toggleCollapsed }) => {
  const { t } = useTranslation();
  const { darkMode } = useThemeToggle();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme={darkMode ? "dark" : "light"}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: darkMode ? undefined : "#e6e9ef",
      }}
      trigger={
        <div style={{ position: "absolute", bottom: 16, width: "100%" }}>
          <ThemeToggle />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: 16, width: "100%" }}
          />
        </div>
      }
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {/* Public Links */}
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/explore" icon={<AppstoreOutlined />}>
          <Link to="/explore">Explore</Link>
        </Menu.Item>

        {isLoggedIn && <Divider />}

        {/* Authenticated Links */}
        {isLoggedIn && (
          <>
            <Menu.Item key="/profile" icon={<ProfileOutlined />}>
              <Link to="/profile">My Profile</Link>
            </Menu.Item>
            <Menu.Item key="/my-art" icon={<PictureOutlined />}>
              <Link to="/my-art">My Art</Link>
            </Menu.Item>
            <Menu.Item key="/my-exhibitions" icon={<CalendarOutlined />}>
              <Link to="/my-exhibitions">My Exhibitions</Link>
            </Menu.Item>
            <Menu.Item key="/my-events" icon={<TeamOutlined />}>
              <Link to="/my-events">My Events</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  );
};

export default AppSider;
