// src/components/SearchBar.tsx
import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useThemeToggle } from "../../providers/AppThemeProvider";

const SearchBar: React.FC = () => {
  const { darkMode } = useThemeToggle();

  return (
    <Input
      placeholder="Search artworks or artists..."
      prefix={
        <SearchOutlined
          style={{ color: darkMode ? "#fff" : "#000", opacity: 0.65 }}
        />
      }
      style={{
        maxWidth: 400,
        width: "100%",
        marginLeft: 20,
        backgroundColor: darkMode ? "#2a2a3b" : "#fff",
        borderRadius: 8,
        border: darkMode ? "1px solid #444" : "1px solid #d9d9d9",
        color: darkMode ? "#fff" : "#000",
      }}
      // ensure the input’s text and placeholder pick up the right color
      className={darkMode ? "ant-input-dark" : ""}
    />
  );
};

export default SearchBar;
