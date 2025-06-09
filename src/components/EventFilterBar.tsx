import { DatePicker, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useFilterContext } from "../context/FilterContext";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Option } = Select;
const { RangePicker } = DatePicker;
import dayjs from "dayjs";

const EventFilterBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,

    dateRange,
    setDateRange,
  } = useFilterContext();

  const { darkMode } = useThemeToggle();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const data = await getCategories();
        setCategories([
          { label: "Exhibition", value: "EXHIBITION" },
          { label: "Workshop", value: "WORKSHOP" },
          { label: "Meetup", value: "MEETUP" },
          { label: "Other", value: "OTHER" },
        ]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filterButtonStyle = {
    backgroundColor: darkMode ? "#2a2a3b" : "#fff",
    color: darkMode ? "#fff" : "#000",
    border: darkMode ? "1px solid #444" : "1px solid #d9d9d9",
    borderRadius: 8,
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "65px",
        zIndex: 1000,
        background: darkMode ? "#2a2a3b" : "#fff",
        padding: "10px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        borderBottom: darkMode ? "1px solid #444" : "1px solid #d9d9d9",
      }}
    >
      <Space size="large" wrap>
        {/* Search by Name */}
        <Input
          placeholder="Search by event name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ ...filterButtonStyle, width: 200 }}
        />

        {/* Filter by Categories */}
        <Select
          mode="multiple"
          placeholder="Select Categories"
          value={selectedCategories}
          onChange={(value) => setSelectedCategories(value)}
          style={{ ...filterButtonStyle, minWidth: 200 }}
        >
          {categories.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.label}
            </Option>
          ))}
        </Select>

        {/* Filter by Date Range */}
        <RangePicker
          value={
            dateRange
              ? [
                  dateRange[0] ? dayjs(dateRange[0]) : null,
                  dateRange[1] ? dayjs(dateRange[1]) : null,
                ]
              : [null, null]
          }
          onChange={(dates) =>
            setDateRange(dates as [Date | null, Date | null])
          }
          style={{ ...filterButtonStyle }}
        />
      </Space>
    </div>
  );
};

export default EventFilterBar;
