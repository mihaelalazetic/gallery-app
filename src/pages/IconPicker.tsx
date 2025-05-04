// src/components/IconPicker.tsx
import React, { useState, useMemo } from "react";
import { Input, Tabs, Tooltip } from "antd";
import * as AntIcons from "@ant-design/icons";
import { IconType } from "react-icons";

const { Search } = Input;

type IconCategory = "outlined" | "filled" | "twoTone";

interface IconPickerProps {
  value?: string;
  onChange?: (iconName: string) => void;
  placeholder?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  placeholder = "Search icons",
}) => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<IconCategory>("outlined");

  // all AntD icons + their names
  const allIcons = useMemo(
    () =>
      Object.entries(AntIcons).filter(([name]) =>
        /(Outlined|Filled|TwoTone)$/.test(name)
      ) as [string, IconType][],
    []
  );

  // filter by category and search
  const filteredIcons = useMemo(
    () =>
      allIcons.filter(([name]) => {
        const suffix = name.match(/(Outlined|Filled|TwoTone)$/)?.[1];
        if (activeTab === "outlined" && suffix !== "Outlined") return false;
        if (activeTab === "filled" && suffix !== "Filled") return false;
        if (activeTab === "twoTone" && suffix !== "TwoTone") return false;
        if (
          searchText &&
          !name.toLowerCase().includes(searchText.toLowerCase())
        )
          return false;
        return true;
      }),
    [allIcons, activeTab, searchText]
  );

  const tabItems = [
    { label: "Outlined", key: "outlined" },
    { label: "Filled", key: "filled" },
    { label: "TwoTone", key: "twoTone" },
  ];

  return (
    <div>
      <Search
        placeholder={placeholder}
        onSearch={setSearchText}
        allowClear
        style={{ marginBottom: 12 }}
      />

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as IconCategory)}
        items={tabItems}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: 16,
          maxHeight: "50vh",
          overflowY: "auto",
          padding: 8,
        }}
      >
        {filteredIcons.map(([name, IconComp]) => {
          const isSelected = name === value;
          return (
            <div
              key={name}
              onClick={() => onChange?.(name)}
              style={{
                textAlign: "center",
                cursor: "pointer",
                color: isSelected ? "#1890ff" : undefined,
              }}
            >
              <Tooltip title={name}>
                <IconComp style={{ fontSize: 24 }} />
              </Tooltip>
              <div
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
