// src/components/CategoryTag.tsx
import React from "react";
import { Tag } from "antd";

interface CategoryTagProps {
  name: string;
  gradient: string;
  color: string;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ name, gradient, color }) => (
  <Tag
    className="category-tag"
    style={{
      background: gradient,
      color,
      fontWeight: "bold",
      padding: "4px 12px",
      borderRadius: 4,
    }}
  >
    {name}
  </Tag>
);

export default CategoryTag;
