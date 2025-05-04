import { useMutation } from "@tanstack/react-query";
import { Card, Col, notification, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtTypes } from "../api/artTypesServices";
import { uploadArtwork } from "../api/artworkServices";
import { uploadArtworkToSupabase } from "../api/uploadArtworkToSupabase";
import { useGeneratedAntForm } from "../hooks/useGeneratedAntForm";

const { Title } = Typography;

export default function ArtworkUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [artTypes, setArtTypes] = useState([]);

  const { id } = useParams(); // Optional: For editing or context-specific uploads
  notification.config({
    placement: "topRight", // topLeft, bottomRight, bottomLeft
  });
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const file = values.file?.originFileObj;
      if (!file) throw new Error("Please select an image file.");

      const imageUrl = await uploadArtworkToSupabase(file);

      return uploadArtwork({
        title: values.title,
        description: values.description,
        price: values.price,
        dimensions: values.dimensions || "50x50cm",
        visibility: "public",
        imageUrl,
        artTypeId: Number(values.artType) || 1,
      });
    },
    onMutate: () => {
      notification.info({ message: "Uploading artwork...", duration: 2 });
      setUploading(true);
    },
    onSuccess: () => {
      notification.success({ message: "Artwork uploaded successfully!" });
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
    async function fetchArtists() {
      const data = await getArtTypes();
      setArtTypes(data);
    }
    fetchArtists();
  }, []);

  const fields = [
    {
      name: "title",
      label: "Title",
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
      name: "dimensions",
      label: "Dimensions",
      type: "select" as const,
      options: ["30x40cm", "50x70cm", "60x90cm", "70x100cm", "100x150cm"].map(
        (d) => ({ value: d, label: d })
      ),
    },
    {
      name: "artType",
      label: "Type",
      type: "multiSelect" as const,
      options: artTypes.map((type: any) => ({
        value: String(type.id),
        label: type.name,
      })),
    },
    {
      name: "price",
      label: "Price",
      type: "number" as const,
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
      col1: ["title", "description", "dimensions", "artType", "price"],
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
            Upload New Artwork
          </Title>
          <GeneratedForm />
        </Card>
      </Col>
    </Row>
  );
}
