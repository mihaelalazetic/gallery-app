// src/components/FilterDrawer.tsx
import React from "react";
import { Drawer, Form, Input, Select, Slider, Button } from "antd";
import { useFilterContext } from "../../context/FilterContext";

const FilterDrawer: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
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

  const categoryOptions = ["Abstract", "Modern", "Classic"]; // Replace with your categories

  const handleApply = () => {
    onClose();
  };

  return (
    <Drawer
      title="All Filters"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form layout="vertical">
        <Form.Item label="Search">
          <Input
            placeholder="Search by title or artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Categories">
          <Select
            mode="multiple"
            placeholder="Select categories"
            value={selectedCategories}
            onChange={(value) => setSelectedCategories(value)}
          >
            {categoryOptions.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price Range">
          <Slider
            range
            min={0}
            max={10000}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
          />
        </Form.Item>
        <Form.Item label="Dimensions">
          <Input
            placeholder="e.g., 20x30 cm"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleApply}>
            Apply Filters
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FilterDrawer;
