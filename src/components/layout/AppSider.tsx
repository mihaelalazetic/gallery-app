import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  PlusOutlined,
  PlusSquareTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu, Modal } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ArtworkUploadForm from "../../forms/ArtworkUploadForm";
import { useThemeToggle } from "../../providers/AppThemeProvider";

const { Sider } = Layout;

const AppSider: React.FC<{
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({ collapsed, toggleCollapsed }) => {
  const { t } = useTranslation();
  const { darkMode, colorPrimary } = useThemeToggle();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Get the current user from localStorage or an API
  const { user } = useAuth();

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
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
            <Link to="/">{t("home")}</Link>
          </Menu.Item>
          <Menu.Item key="/explore" icon={<AppstoreOutlined />}>
            <Link to="/explore">{t("explore")}</Link>
          </Menu.Item>

          {isLoggedIn && <Divider />}

          {/* Authenticated Links */}
          {isLoggedIn && (
            <>
              <Menu.Item
                key={`/profile/${user?.username}`}
                icon={<UserOutlined />}
              >
                <Link to={`/profile/${user?.slug}`}>{t("myProfile")}</Link>
              </Menu.Item>
              <Menu.Item key="/my-exhibitions" icon={<CalendarOutlined />}>
                <Link to="/my-exhibitions">{t("myExhibitions")}</Link>
              </Menu.Item>

              <SubMenu
                key="new"
                title={
                  <>
                    {!collapsed ? (
                      <>
                        <PlusOutlined style={{ color: colorPrimary }} />
                        <span style={{ marginLeft: 8 }}>{t("add")}</span>
                      </>
                    ) : (
                      <PlusSquareTwoTone
                        type="primary"
                        twoToneColor={colorPrimary}
                      />
                    )}
                  </>
                }
              >
                <Menu.Item
                  key="/upload-artwork"
                  icon={<PictureOutlined />}
                  onClick={showModal} // Open modal on click
                >
                  Artwork
                </Menu.Item>
                <Menu.Item key="/create-exhibition" icon={<CalendarOutlined />}>
                  <Link to="/create-exhibition">{t("exhibition")}</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/upload-category" icon={<AppstoreAddOutlined />}>
                <Link to="/upload-category">{t("uploadCategory")}</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Sider>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer buttons
        centered // Centers the modal on the page
        width={"85%"} // Adjust width as needed
        bodyStyle={{
          maxHeight: "80vh", // Limit the height of the modal content
          overflowY: "auto", // Enable scrolling inside the modal if content overflows
          // padding: "20px", // Add padding for better spacing
          background: darkMode ? "#1c1c1e" : "#fff",
          backgroundColor: darkMode ? "#1c1c1e" : "#fff",
        }}
      >
        <ArtworkUploadForm />
      </Modal>
    </>
  );
};

export default AppSider;
