// useGeneratedAntForm.tsx
import { PlusOutlined } from "@ant-design/icons";
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
  Image,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import { ColProps } from "antd";

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
  multiple?: boolean; // New property to allow multiple file uploads
};

interface ColumnConfig {
  key: string;
  span: ColProps;
}

interface LayoutConfig {
  columns: ColumnConfig[];
  fieldGroups: {
    [key: string]: string[];
  };
  fullWidthFields?: string[];
}

type UseGeneratedAntFormProps = {
  fields: FieldConfig[];
  buttonLabel?: string;
  onSubmit: (values: any) => void;
  withButton?: boolean;
  layoutConfig?: LayoutConfig;
};

export const useGeneratedAntForm = ({
  fields,
  buttonLabel,
  onSubmit,
  withButton = true,
  layoutConfig,
}: UseGeneratedAntFormProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  useEffect(() => {
    form.setFieldsValue({ imageFile: fileList });
  }, [fileList, form]);

  const renderField = (field: FieldConfig) => {
    // Base rules
    const rules: any[] = [];
    if (field.required) {
      rules.push({ required: true, message: `${field.label} is required` });
    }
    // Confirm password validation
    if (field.name === "confirmPassword") {
      rules.push({
        validator: (_: any, value: string) => {
          if (!value || form.getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Passwords do not match"));
        },
      });
    }

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
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                validator: (_: any, value: UploadFile[]) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error(`${field.label} is required`)),
              },
            ]}
          >
            <>
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                fileList={fileList}
                multiple={field.multiple || false} // Allow multiple files if `multiple` is true
                onChange={({ fileList: newFileList }) => {
                  setFileList(newFileList);
                  form.setFieldsValue({ [field.name]: newFileList });
                }}
                onPreview={async (file) => {
                  if (!file.url && !file.preview && file.originFileObj) {
                    const base64 = await getBase64(file.originFileObj as File);
                    file.preview = base64;
                  }
                  setPreviewImage(file.url || (file.preview as string));
                  setPreviewOpen(true);
                }}
                accept="image/*"
              >
                {fileList.length >= (field.multiple ? 5 : 1) ? null : ( // Limit file count
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>

              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (vis) => setPreviewOpen(vis),
                  afterOpenChange: (vis) => !vis && setPreviewImage(""),
                }}
                src={previewImage}
              />
            </>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const GeneratedForm = () => (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          const files =
            Array.isArray(values.imageFile) && values.imageFile.length > 0
              ? values.imageFile
              : [];

          onSubmit({
            ...values,
            imageFile: {
              fileList: files.map((file: { originFileObj: any; name: any; uid: any; }) => ({
                originFileObj: file.originFileObj,
                name: file.name,
                uid: file.uid,
              })),
            },
          });
        }}
      >
        <Row gutter={16}>
          {/* Render columns */}
          {layoutConfig?.columns.map((col: { key: string; span: ColProps }) => (
            <Col key={col.key} {...col.span} style={{ padding: "0 1rem" }}>
              {layoutConfig.fieldGroups[col.key]?.map((fieldName) => {
                const field = fields.find((f) => f.name === fieldName);
                return field ? (
                  <div key={field.name}>{renderField(field)}</div>
                ) : null;
              })}
            </Col>
          ))}

          {/* Render full-width fields */}
          {layoutConfig?.fullWidthFields?.map((fieldName) => {
            const field = fields.find((f) => f.name === fieldName);
            return field ? (
              <Col key={field.name} span={24} style={{ padding: "0 1rem" }}>
                {renderField(field)}
              </Col>
            ) : null;
          })}
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
