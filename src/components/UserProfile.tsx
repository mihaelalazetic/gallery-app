import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Popover,
  Typography,
  Divider,
  Space,
  Flex,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Title, Text } = Typography;

interface StoredUser {
  username: string;
  fullName: string;
  email: string;
  profilePictureUrl?: string;
  roles: string[];
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeToggle();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("token") && user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  if (!isLoggedIn) {
    return (
      <Button type="link" onClick={() => navigate("/auth")}>
        Login / Sign Up
      </Button>
    );
  }

  const popoverContent = (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "block",
        width: 220,
        color: darkMode ? "#e6e9ef" : undefined,
      }}
    >
      <Title
        level={5}
        style={{ margin: 0, color: darkMode ? "#e6e9ef" : undefined }}
      >
        {user!.fullName}
      </Title>
      <Text type="secondary">@{user!.username}</Text>
      <Text type="secondary">{user!.email}</Text>
      <Text type="secondary">{user!.roles}</Text>

      <Divider
        style={{ margin: "8px 0", borderColor: darkMode ? "#444" : "#f0f0f0" }}
      />
      <Flex justify="space-between" align="center">
        <Button
          type="default"
          block
          icon={<ProfileOutlined />}
          onClick={() => navigate("/profile")}
        >
          My Profile
        </Button>
        <Button
          danger
          block
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ marginLeft: 8 }}
        >
          Logout
        </Button>
      </Flex>
    </Space>
  );

  return (
    <Popover
      content={popoverContent}
      placement="bottomRight"
      trigger="hover"
      overlayStyle={{
        background: darkMode ? "#e6e9ef" : "#fff",
        borderRadius: 8,
      }}
    >
      <Avatar
        size="large"
        src={user!.profilePictureUrl}
        icon={<UserOutlined />}
        style={{ cursor: "pointer" }}
      />
    </Popover>
  );
};

export default UserProfile;
