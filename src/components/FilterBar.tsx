import React, { useEffect, useState } from "react";
import { Popover, Button, Input, Space, Slider, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useFilterContext } from "../context/FilterContext";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { getCategories } from "../api/categoryServices";

const { Option } = Select;

const FilterBar: React.FC<{ onOpenDrawer: () => void }> = ({
  onOpenDrawer,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
  } = useFilterContext();

  const { darkMode } = useThemeToggle();
  const isDarkMode = darkMode;
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterChange = () => {
    // Trigger custom event to fetch the data
    window.dispatchEvent(new CustomEvent("filterChange"));
  };

  const filterButtonStyle = {
    backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
    borderRadius: 8,
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "65px",
        zIndex: 1000,
        background: isDarkMode ? "#2a2a3b" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        padding: "10px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        borderBottom: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
      }}
    >
      <Space>
        {/* Search Input */}
        <Input
          placeholder="Search by title or artist"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={handleFilterChange}
          style={{ ...filterButtonStyle, width: 200 }}
        />

        {/* Category Select */}
        <Select
          mode="multiple"
          placeholder="Select Categories"
          value={selectedCategories}
          onChange={(value) => {
            setSelectedCategories(value);
            handleFilterChange();
          }}
          style={{ ...filterButtonStyle, minWidth: 200 }}
        >
          {categories.map((category) => (
            <Option key={category.name} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>

        {/* Price Range Slider */}
        <Popover
          content={
            <div style={{ padding: "10px 20px" }}>
              <Slider
                range
                defaultValue={[0, 10000]}
                min={0}
                max={10000}
                step={50}
                value={priceRange}
                onChange={(value) => {
                  setPriceRange(value as [number, number]);
                }}
                onChangeComplete={handleFilterChange}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          }
          title="Price Range"
          trigger="click"
        >
          <Button style={filterButtonStyle}>Price</Button>
        </Popover>

        <Button
          icon={<FilterOutlined />}
          onClick={onOpenDrawer}
          style={filterButtonStyle}
        >
          All Filters
        </Button>
      </Space>
    </div>
  );
};

export default FilterBar;
