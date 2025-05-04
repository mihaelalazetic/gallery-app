// src/components/IconPicker.tsx
import React from "react";
import { Select } from "antd";
import * as Icons from "@ant-design/icons";

const IconPicker: React.FC = () => {
  const iconOptions = Object.keys(Icons).map((key) => ({
    label: React.createElement(Icons[key as keyof typeof Icons] as React.ComponentType),
    value: key,
  }));

  return (
    <Select
      showSearch
      placeholder="Select an icon"
      optionLabelProp="label"
      options={iconOptions}
      style={{ width: "100%" }}
    />
  );
};

export default IconPicker;
