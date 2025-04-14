// useGeneratedAntForm.tsx
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";

const { TextArea } = Input;

type FieldType =
  | "input"
  | "textarea"
  | "password"
  | "number"
  | "select"
  | "multiSelect"
  | "date"
  | "switch"
  | "checkbox"
  | "radio"
  | "upload";

type OptionType = { label: string; value: string };

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: OptionType[];
  rows?: number;
};

type UseGeneratedAntFormProps = {
  fields: FieldConfig[];
  buttonLabel?: string;
  onSubmit: (values: any) => void;
  withButton?: boolean;
};

export const useGeneratedAntForm = ({
  fields,
  buttonLabel,
  onSubmit,
  withButton = true,
}: UseGeneratedAntFormProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const renderField = (field: FieldConfig) => {
    const rules = field.required
      ? [{ required: true, message: `${field.label} is required` }]
      : [];

    switch (field.type) {
      case "input":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <Input placeholder={field.placeholder} />
          </Form.Item>
        );
      case "textarea":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <TextArea rows={field.rows || 4} placeholder={field.placeholder} />
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <Input.Password placeholder={field.placeholder} />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <Select options={field.options} placeholder={field.placeholder} />
          </Form.Item>
        );
      case "multiSelect":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <Select
              mode="multiple"
              options={field.options}
              placeholder={field.placeholder}
              allowClear
            />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        );
      case "switch":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            valuePropName="checked"
            rules={rules}
          >
            <Switch />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            valuePropName="checked"
            rules={rules}
          >
            <Checkbox />
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <Radio.Group>
              {field.options?.map((opt) => (
                <Radio key={opt.value} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case "upload":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            valuePropName="file"
            rules={rules}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  // The container is now fully responsive by using 100% width and height.
  const GeneratedForm = () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        paddingRight: "1rem",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit({ ...values, file: fileList[0] });
        }}
      >
        <Row gutter={16}>
          {fields.map((field) => (
            <Col span={24} key={field.name}>
              {renderField(field)}
            </Col>
          ))}
        </Row>
        {withButton && (
          <Form.Item style={{ marginTop: "1rem", textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              {buttonLabel || "Submit"}
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );

  return { form, GeneratedForm };
};
