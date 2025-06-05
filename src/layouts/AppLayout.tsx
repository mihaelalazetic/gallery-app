// src/layouts/AppLayout.tsx

import { Layout, theme as antdTheme } from "antd";
import React, { useState } from "react";
import AppFooter from "../components/layout/AppFooter";
import AppSider from "../components/layout/AppSider";
import AppHeader from "../components/layout/AppHeader";

const { Content } = Layout;
const { useToken } = antdTheme;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { token } = useToken();

  const toggleCollapsed = () => setCollapsed((c) => !c);

  return (
    <Layout
      style={{ minHeight: "100vh", margin: 0, background: token.colorBgBase }}
    >
      {/* Sider */}
      <AppSider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

      {/* Main area */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200, // static widths
          // marginTop: 64, // header height
          transition: "margin-left 0.3s ease",
          background: token.colorBgBase,
        }}
      >
        <AppHeader collapsed={collapsed} />
        <Content
          style={{
            padding: token.padding,
            background: token.colorBgContainer,
            transition: "background-color 0.3s ease",
          }}
        >
          <div style={{ marginTop: 64 }}>{children}</div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
