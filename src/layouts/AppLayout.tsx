import { Layout } from "antd";
import React, { useState } from "react";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import AppSider from "../components/AppSider";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { darkMode } = useThemeToggle();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: "100vh", margin: 0 }}>
      <AppSider collapsed={collapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.3s ease",
        }}
      >
        <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content
          style={{
            padding: 24,
            backgroundColor: darkMode ? "#2a2a3b" : "#f3f4f6",
            transition: "background-color 0.3s ease",
          }}
        >
          {children}
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
