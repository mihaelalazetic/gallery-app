import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const UserProfile: React.FC = () => {
  const isLoggedIn = true; // Replace with actual logic

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="my-art">My Art</Menu.Item>
      <Menu.Item key="my-exhibitions">My Exhibitions</Menu.Item>
      <Menu.Item key="my-events">My Events</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return isLoggedIn ? (
    <Dropdown overlay={menu} placement="bottomRight">
      <Avatar size="large" icon={<UserOutlined />} />
    </Dropdown>
  ) : (
    <>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
    </>
  );
};

export default UserProfile;
