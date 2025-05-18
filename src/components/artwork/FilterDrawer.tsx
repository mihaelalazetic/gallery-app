// src/components/FilterDrawer.tsx
import React, { useEffect, useState } from "react";
import { Drawer, Form, Input, Select, Slider, Button } from "antd";
import { useFilterContext } from "../../context/FilterContext";
import { getCategories } from "../../api/categoryServices";

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
            {categories.map((category) => (
              <Select.Option key={category.name} value={category.id}>
                {category.name}
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
