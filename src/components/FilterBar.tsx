// src/components/FilterBar.tsx
import React from "react";
import { Popover, Button, Input, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useFilterContext } from "../context/FilterContext";
import { useThemeToggle } from "../providers/AppThemeProvider";

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
    dimensions,
    setDimensions,
  } = useFilterContext();

  const { darkMode } = useThemeToggle();

  const isDarkMode = darkMode;

  const categoryOptions = ["Abstract", "Modern", "Classic"];

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
        <Input
          placeholder="Search by title or artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: 200,
            backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
            borderRadius: 8,
          }}
        />
        <Popover
          content={
            <div style={{ color: isDarkMode ? "#fff" : "#000" }}>
              {categoryOptions.map((category) => (
                <div key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category)
                        );
                      }
                    }}
                  />
                  {category}
                </div>
              ))}
            </div>
          }
          title="Categories"
          trigger="click"
        >
          <Button
            style={{
              backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
              border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
              borderRadius: 8,
            }}
          >
            Categories
          </Button>
        </Popover>
        <Popover
          content={
            <div>
              <Input
                placeholder="e.g., 20x30 cm"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                style={{
                  backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                  border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
                  borderRadius: 8,
                }}
              />
            </div>
          }
          title="Dimensions"
          trigger="click"
        >
          <Button
            style={{
              backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
              border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
              borderRadius: 8,
            }}
          >
            Dimensions
          </Button>
        </Popover>
        <Popover
          content={
            <div>
              <Input
                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                style={{
                  backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                  border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
                  borderRadius: 8,
                }}
              />
              <Input
                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                style={{
                  backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                  border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
                  borderRadius: 8,
                  marginTop: "5px",
                }}
              />
            </div>
          }
          title="Price Range"
          trigger="click"
        >
          <Button
            style={{
              backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
              border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
              borderRadius: 8,
            }}
          >
            Price
          </Button>
        </Popover>
        <Button
          icon={<FilterOutlined />}
          onClick={onOpenDrawer}
          style={{
            backgroundColor: isDarkMode ? "#2a2a3b" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            border: isDarkMode ? "1px solid #444" : "1px solid #d9d9d9",
            borderRadius: 8,
          }}
        >
          All Filters
        </Button>
      </Space>
    </div>
  );
};

export default FilterBar;
