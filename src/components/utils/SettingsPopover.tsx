import React from "react";
import { Popover, Space, Divider, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useThemeToggle } from "../../providers/AppThemeProvider";
import ThemeToggle from "./ThemeToggle";
import LanguageChanger from "./LanguageChanger";

const SettingsPopover: React.FC = () => {
  const { darkMode } = useThemeToggle();

  const content = (
    <div
      style={{
        display: "block",
        padding: 0,
        // borderRadius: 8,
        margin: 0,
      }}
    >
      <Space direction="vertical" align="center">
        {/* Theme Toggle */}
        <ThemeToggle />

        <Divider
          style={{
            margin: "5px 0",
            borderColor: darkMode ? "#444" : "#f0f0f0",
          }}
        />

        {/* Language Selector */}
        <LanguageChanger />
      </Space>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      // keep popover open when interacting
      autoAdjustOverflow={true}
      style={{
        background: darkMode ? "#e6e9ef" : "#fff",
      }}
    >
      <Button
        type="text"
        shape="circle"
        icon={<SettingOutlined />}
        style={{ fontSize: 18 }}
      />
    </Popover>
  );
};

export default SettingsPopover;
