import { useMutation } from "@tanstack/react-query";
import { Card, Col, notification, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { uploadArtwork } from "../api/artworkServices";
import { getCategories } from "../api/categoryServices";
import { useGeneratedAntForm } from "../hooks/useGeneratedAntForm";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
export default function ArtworkUploadForm({
  onUploadSuccess,
}: {
  onUploadSuccess?: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [artTypes, setArtTypes] = useState([]);
  const { t } = useTranslation();

  // const { id } = useParams(); // Optional: For editing or context-specific uploads
  notification.config({
    placement: "topRight", // topLeft, bottomRight, bottomLeft
  });
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const fileList = values.imageFile?.fileList;
      const files: File[] =
        fileList?.map((f: any) => f.originFileObj).filter(Boolean) ?? [];

      if (files.length === 0) {
        throw new Error(t("validation.selectImages")); // or your own translation key
      }

      const payload = {
        title: values.title,
        description: values.description,
        price: values.price,
        dimensions: values.dimensions || "50x50cm",
        visibility: "public",
        categoryIds: values.artType?.map((id: any) => Number(id)) ?? [],
        relevantLinks: values.relevantLinks ?? [],
      };
      

      await uploadArtwork(payload, files);
    },
    onMutate: () => {
      notification.info({ message: t("artwork.uploading"), duration: 2 });
      setUploading(true);
    },
    onSuccess: () => {
      notification.success({ message: t("artwork.uploadSuccess") });
      onUploadSuccess?.();
    },
    onError: (error: any) => {
      notification.error({
        message: t("artwork.uploadErrorTitle"),
        description: error?.message ?? t("common.error"),
      });
    },

    onSettled: () => setUploading(false),
  });

  useEffect(() => {
    async function fetchArtists() {
      const data = await getCategories();
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
      multiple: true,
    },
    {
      name: "relevantLinks",
      label: t("relevantLinks"),
      type: "customDynamicLinks" as const,
    },
  ];

  const layoutConfig = {
    columns: [
      { key: "row1", span: { xs: 24, md: 12 } },
      { key: "row1b", span: { xs: 24, md: 12 } },
      { key: "row2", span: { xs: 24, md: 12 } },
      { key: "row2b", span: { xs: 24, md: 12 } },
      { key: "row3", span: { xs: 24, md: 12 } },
      { key: "row3b", span: { xs: 24, md: 12 } },
    ],
    fieldGroups: {
      row1: ["title"],
      row1b: ["dimensions"],
      row2: ["price"],
      row2b: ["artType"],
      row3: ["description", "relevantLinks"],
      row3b: ["imageFile"],
    },
  };

  const { GeneratedForm } = useGeneratedAntForm({
    fields,
    layoutConfig,
    buttonLabel: uploading ? t("common.uploading") : t("common.submit"),

    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <Row justify="center" style={{}}>
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
