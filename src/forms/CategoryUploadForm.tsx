import { useMutation } from "@tanstack/react-query";
import { Card, Col, notification, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategories, uploadCategory } from "../api/categoryServices";
import { uploadCategoryToSupabase } from "../api/uploadCategoryToSupabase";
import { useGeneratedAntForm } from "../hooks/useGeneratedAntForm";

const { Title } = Typography;

export default function CategoryUploadForm() {
  const [uploading, setUploading] = useState(false);
  const [artTypes, setArtTypes] = useState([]);

  const { id } = useParams(); // Optional: For editing or context-specific uploads
  notification.config({
    placement: "topRight", // topLeft, bottomRight, bottomLeft
  });
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      console.log(values);
      const file = values.imageFile?.fileList[0].originFileObj;
      if (!file) throw new Error("Please select an image file.");

      const imageUrl = await uploadCategoryToSupabase(file);

      return uploadCategory({
        name: values.name,
        description: values.description,
        imageUrl,
      });
    },
    onMutate: () => {
      notification.info({ message: "Uploading category...", duration: 2 });
      setUploading(true);
    },
    onSuccess: () => {
      notification.success({ message: "Category uploaded successfully!" });
    },
    onError: (error: any) => {
      console.error(error);
      notification.error({
        message: "Upload failed",
        description: error.message,
      });
    },
    onSettled: () => setUploading(false),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const data = await getCategories();
    setArtTypes(data);
  }

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "input" as const,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
    },
    {
      name: "imageFile",
      label: "Image File",
      type: "upload" as const,
      required: true,
    },
  ];

  const layoutConfig = {
    columns: [
      { key: "col1", span: { xs: 24, md: 16 } },
      { key: "col2", span: { xs: 24, md: 8 } },
    ],
    fieldGroups: {
      col1: ["name", "description"],
      col2: ["imageFile"],
    },
  };

  const { GeneratedForm } = useGeneratedAntForm({
    fields,
    layoutConfig,
    buttonLabel: uploading ? "Uploading..." : "Submit",
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <Row justify="center" style={{ padding: "2rem" }}>
      <Col xs={24} sm={20} md={16} lg={24}>
        <Card bordered style={{ borderRadius: 12, padding: "0 2rem" }}>
          <Title level={2} style={{ textAlign: "start", marginBottom: "2rem" }}>
            Upload New Category
          </Title>
          <GeneratedForm />
        </Card>
      </Col>
    </Row>
  );
}
