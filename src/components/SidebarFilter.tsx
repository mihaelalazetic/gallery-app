// src/components/SidebarFilter.tsx
import React from "react";
import { Form, Input, Select, Slider, Button } from "antd";

const { Option } = Select;

interface SidebarFilterProps {
  onFilterChange: (filters: any) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ onFilterChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    const values = form.getFieldsValue();
    onFilterChange(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      style={{ padding: "1rem" }}
    >
      <Form.Item name="search" label="Search">
        <Input placeholder="Search by title or artist" />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select placeholder="Select category" allowClear>
          <Option value="Abstract Expressionism">Abstract Expressionism</Option>
          <Option value="Pop Art">Pop Art</Option>
          <Option value="Minimalism">Minimalism</Option>
          <Option value="Digital Illustration">Digital Illustration</Option>
          <Option value="Street Art">Street Art</Option>
          <Option value="Surrealism">Surrealism</Option>
          <Option value="Photorealism">Photorealism</Option>
          <Option value="Conceptual Art">Conceptual Art</Option>
          <Option value="Installation Art">Installation Art</Option>
          <Option value="New Media Art">New Media Art</Option>
        </Select>
      </Form.Item>
      <Form.Item name="price" label="Price Range">
        <Slider range min={0} max={10000} step={100} />
      </Form.Item>
      <Form.Item name="dimensions" label="Dimensions (cm)">
        <Slider range min={0} max={200} step={1} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => form.resetFields()}>
          Reset Filters
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SidebarFilter;
