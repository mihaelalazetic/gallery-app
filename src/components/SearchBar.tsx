import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar: React.FC = () => {
  return (
    <Input
      placeholder="Search artworks or artists..."
      prefix={<SearchOutlined />}
      style={{
        maxWidth: 400,
        width: "100%",
        marginLeft: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
      }}
    />
  );
};

export default SearchBar;
