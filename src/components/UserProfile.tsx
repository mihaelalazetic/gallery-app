// src/components/UserProfile.tsx
import React, { useState, useEffect } from "react";
import { Avatar, Button, Dropdown, Menu, Space, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface StoredUser {
  profilePictureUrl?: string;
  // …add more fields if you store them
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StoredUser | null>(null);

  // Pull stored user info once on mount
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item key="my-art" onClick={() => navigate("/my-art")}>
        My Art
      </Menu.Item>
      <Menu.Item
        key="my-exhibitions"
        onClick={() => navigate("/my-exhibitions")}
      >
        My Exhibitions
      </Menu.Item>
      <Menu.Item key="my-events" onClick={() => navigate("/my-events")}>
        My Events
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Logged‑in state
  if (isLoggedIn && user) {
    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar
          size="large"
          src={user.profilePictureUrl}
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
        />
      </Dropdown>
    );
  }

  // Not logged in
  return (
    <Space size="middle">
      <Button>
        <Text
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => navigate("/auth")}
        >
          Login / Sign Up
        </Text>
      </Button>
    </Space>
  );
};

export default UserProfile;
