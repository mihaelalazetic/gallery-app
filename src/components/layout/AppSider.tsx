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
import CreateEventExhibitionForm from "../../forms/CreateEventExhibitionForm";
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
  const [formType, setFormType] = useState<"artwork" | "event" | null>(null);



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
          style={{ height: "100%", borderRight: 0, marginTop: 65 }}
        >
          {/* Public Links */}
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">{t("home")}</Link>
          </Menu.Item>
          <Menu.Item key="/explore" icon={<AppstoreOutlined />}>
            <Link to="/explore">{t("explore")}</Link>
          </Menu.Item>
          <Menu.Item key="/events" icon={<CalendarOutlined />}>
            <Link to="/events">{t("events")}</Link>
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
                  onClick={() => {
                    setFormType("artwork");
                    setIsModalVisible(true);
                  }}
                  // Open modal on click
                >
                  Artwork
                </Menu.Item>
                <Menu.Item
                  key="/create-event"
                  icon={<CalendarOutlined />}
                  onClick={() => {
                    setFormType("event");
                    setIsModalVisible(true);
                  }}
                >
                  {t("event")}
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
        footer={null}
        centered
        width={"85%"}
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "auto",
          background: darkMode ? "#1c1c1e" : "#fff",
        }}
        destroyOnClose
      >
        {formType === "artwork" && (
          <ArtworkUploadForm
            onUploadSuccess={() => {
              navigate("/profile/" + user?.slug);
              setIsModalVisible(false);
              setFormType(null);
            }}
          />
        )}
        {formType === "event" && <CreateEventExhibitionForm />}
      </Modal>
    </>
  );
};

export default AppSider;
