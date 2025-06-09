import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  ColProps,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import { getUserBySlug } from "../api/usersService";
import DynamicLinksInput from "../components/DynamicLinksInput";
import MapPicker from "../components/MapPicker";
// import ArtworkSelectorModal from "../components/modal/ArtworkSelectorModal";
import { Typography } from "antd";
import ArtworkSelectorModal from "../components/modal/ArtworkSelectorModal";

const { TextArea } = Input;

type FieldType =
  | "input"
  | "textarea"
  | "password"
  | "number"
  | "select"
  | "multiSelect"
  | "autocomplete"
  | "date"
  | "switch"
  | "checkbox"
  | "radio"
  | "upload"
  | "customMapPicker"
  | "customDateRange"
  | "customDynamicLinks"
  | "customArtworkSelector"
  | "title";

type OptionType = { label: string; value: string };

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: OptionType[];
  rows?: number;
  multiple?: boolean;
  uploadTitle?: string;
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
  slug?: string;
};

export const useGeneratedAntForm = ({
  fields,
  buttonLabel,
  onSubmit,
  withButton = true,
  layoutConfig,
  slug,
}: UseGeneratedAntFormProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const [artModalVisible, setArtModalVisible] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
  const [artworkOptions, setArtworkOptions] = useState<any[]>([]);

  // const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchArtworks = async () => {
      if (!slug) return;
      const user = await getUserBySlug(slug);
      setArtworkOptions(user?.artworks || []);
    };
    fetchArtworks();
  }, [slug]);

  useEffect(() => {
    form.setFieldsValue({ artworkIds: selectedArtworks });
  }, [selectedArtworks]);

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const renderField = (field: FieldConfig) => {
    const rules: any[] = [];
    if (field.required) {
      rules.push({ required: true, message: `${field.label} is required` });
    }

    switch (field.type) {
      case "title":
        return (
          <Form.Item key={field.name}>
            <Typography.Title level={3} style={{ margin: "1rem 0" }}>
              {field.label}
            </Typography.Title>
          </Form.Item>
        );
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

      case "autocomplete":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={rules}
          >
            <Select
              mode="tags"
              placeholder={field.placeholder}
              options={field.options}
              tokenSeparators={[","]}
              style={{ width: "100%" }}
            />
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
            initialValue={true}
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
            label={field.uploadTitle ? "" : field.label}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={rules}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {field.uploadTitle && (
                <Typography.Title level={2} style={{ marginBottom: 8 }}>
                  {field.uploadTitle}{" "}
                </Typography.Title>
              )}
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                fileList={fileList}
                multiple={field.multiple || false}
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
                {fileList.length >= (field.multiple ? 5 : 1) ? null : (
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
            </div>
          </Form.Item>
        );

      case "customMapPicker":
        return (
          <Form.Item key={field.name} label={field.label}>
            <MapPicker
              onSelect={({ name, address, lat, lng }) => {
                form.setFieldsValue({
                  venueName: name,
                  venueAddress: address,
                  latitude: lat,
                  longitude: lng,
                });
              }}
            />
          </Form.Item>
        );

      case "customDateRange":
        return (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            <DatePicker.RangePicker
              showTime
              onChange={(dates) => {
                if (dates) {
                  form.setFieldsValue({
                    startDate: dates[0]?.toISOString(),
                    endDate: dates[1]?.toISOString(),
                  });
                }
              }}
              style={{ width: "100%" }}
              required={field.required}
            />
          </Form.Item>
        );

      case "customDynamicLinks":
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            valuePropName="value"
            getValueFromEvent={(e) => e}
            rules={rules}
          >
            <DynamicLinksInput />
          </Form.Item>
        );

      case "customArtworkSelector":
        // only render the button (and preview bar) here;
        // the modal itself is rendered below in GeneratedForm
        return (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={rules}
          >
            <Button
              onClick={() => setArtModalVisible(true)}
              style={{ marginBottom: 16 }}
            >
              Select Artworks
            </Button>

            {selectedArtworks.length > 0 && (
              <Row gutter={[12, 12]}>
                {artworkOptions
                  .filter((a) => selectedArtworks.includes(String(a.id)))
                  .map((art) => (
                    <Col key={art.id}>
                      <div
                        style={{
                          position: "relative",
                          width: 120,
                          height: 120,
                          borderRadius: 8,
                          overflow: "hidden",
                          cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          transition: "transform 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <img
                          src={art.imageUrls?.[0]}
                          alt={art.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.7)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            padding: "8px",
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            textAlign: "center",
                          }}
                        >
                          {art.title}
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            )}
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const GeneratedForm = () => (
    <>
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
              fileList: files.map((file: any) => ({
                originFileObj: file.originFileObj,
                name: file.name,
                uid: file.uid,
              })),
            },
          });
        }}
      >
        <Row gutter={16}>
          {layoutConfig?.columns.map((col) => (
            <Col key={col.key} {...col.span} style={{ padding: "0 1rem" }}>
              {layoutConfig.fieldGroups[col.key]?.map((fieldName) => {
                const field = fields.find((f) => f.name === fieldName);
                return field ? (
                  <div key={field.name}>{renderField(field)}</div>
                ) : null;
              })}
            </Col>
          ))}
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

      {/* Always mounted modal */}
      <ArtworkSelectorModal
        visible={artModalVisible}
        // disable all built-in close behavior inside the modal:
        onClose={() => setArtModalVisible(false)}
        artworks={artworkOptions}
        selectedIds={selectedArtworks}
        onToggleSelect={(id) =>
          setSelectedArtworks((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          )
        }
      />
    </>
  );

  return { form, GeneratedForm, selectedArtworks };
};
