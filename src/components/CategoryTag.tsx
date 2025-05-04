// src/components/CategoryTag.tsx
import React from "react";
import { Card } from "antd";
import { useThemeToggle } from "../providers/AppThemeProvider"; // adjust path
import { IconType } from "react-icons";

interface CategoryTagProps {
  name: string;
  Icon: IconType;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ name, Icon }) => {
  const { darkMode, colorPrimary } = useThemeToggle();

  return (
    <Card
      hoverable
      style={{
        // width: 120,
        textAlign: "center",
        borderRadius: 10,
        background: darkMode ? "#1f1f1f" : "#f0f2f5",
        color: darkMode ? "#fff" : "#000",
        border: darkMode ? "1px solid #303030" : "1px solid #e0e0e0",
      }}
    >
      <Icon style={{ fontSize: "24px", color: colorPrimary }} />
      <div style={{ marginTop: 8, fontWeight: 600 }}>{name}</div>
    </Card>
  );
};

export default CategoryTag;
