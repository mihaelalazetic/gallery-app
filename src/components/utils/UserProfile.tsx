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
import { useThemeToggle } from "../../providers/AppThemeProvider";
import LanguageSwitcher from "./LanguageChanger";

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
        width: 250,
        // color: darkMode ? "#e6e9ef" : undefined,
      }}
    >
      <Title
        level={5}
        style={{ margin: 0, color: darkMode ? "#e6e9ef" : undefined }}
      >
        <Flex justify="space-between" align="center">
          {user!.fullName}
          <LanguageSwitcher />
        </Flex>
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
        borderRadius: 8,
      }}
    >
      <div className="user-profile-wrapper">
        <Avatar
          size={40}
          src={user!.profilePictureUrl}
          icon={<UserOutlined />}
          draggable={false}
          style={{ marginRight: 10 }}
        />
        <Title
          level={5}
          style={{ margin: 0, color: darkMode ? "#e6e9ef" : undefined }}
        >
          {user!.fullName}
        </Title>
      </div>
    </Popover>
  );
};

export default UserProfile;
