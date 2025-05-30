import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React from "react";

interface DynamicLinksInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const DynamicLinksInput: React.FC<DynamicLinksInputProps> = ({
  value = [""],
  onChange,
}) => {
  const updateLink = (index: number, newValue: string) => {
    const newLinks = [...value];
    newLinks[index] = newValue;
    onChange?.(newLinks);
  };

  const addLink = () => {
    onChange?.([...value, ""]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...value];
    newLinks.splice(index, 1);
    onChange?.(newLinks);
  };

  return (
    <>
      {value.map((link, idx) => (
        <Row key={idx} gutter={8} style={{ marginBottom: 8 }} align="middle">
          <Col flex="auto">
            <Input
              placeholder={`Link ${idx + 1}`}
              value={link}
              onChange={(e) => updateLink(idx, e.target.value)}
            />
          </Col>
          <Col>
            <Button
              icon={<MinusCircleOutlined />}
              onClick={() => removeLink(idx)}
              disabled={value.length === 1}
            />
          </Col>
        </Row>
      ))}
      <Button icon={<PlusOutlined />} onClick={addLink}>
        Add Link
      </Button>
    </>
  );
};

export default DynamicLinksInput;
