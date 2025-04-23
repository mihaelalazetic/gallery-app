import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PictureOutlined,
  UserOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Sider } = Layout;

const AppSider: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { t } = useTranslation();
  const { darkMode } = useThemeToggle();
  const isAuthenticated = false; // Replace with actual authentication check

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
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">{t("home")}</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PictureOutlined />}>
          <Link to="/gallery">{t("gallery")}</Link>
        </Menu.Item>
        {isAuthenticated && (
          <>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/my-art">{t("myArt")}</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<CalendarOutlined />}>
              <Link to="/my-events">{t("myEvents")}</Link>
            </Menu.Item>
          </>
        )}
        <Menu.Item key="5" icon={<AppstoreOutlined />}>
          <Link to="/explore">{t("explore")}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSider;
