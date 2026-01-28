import { useMutation } from "@tanstack/react-query";
import { Card, Col, notification, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCategories, uploadCategory } from "../api/categoryServices";
import { useGeneratedAntForm } from "../hooks/useGeneratedAntForm";

const { Title } = Typography;

export default function CategoryUploadForm() {
  const [uploading, setUploading] = useState(false);
  const [artTypes, setArtTypes] = useState([]);
  const { t } = useTranslation();

  notification.config({ placement: "topRight" });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const fileList = values.imageFile?.fileList ?? [];
      const file: File | undefined = fileList[0]?.originFileObj;

      if (!file) {
        throw new Error(t("validation.selectImage"));
      }

      return uploadCategory(
        { name: values.name, description: values.description },
        file
      );
    },
    onMutate: () => {
      notification.info({ message: t("category.uploading"), duration: 2 });
      setUploading(true);
    },
    onSuccess: () => {
      notification.success({ message: t("category.uploadSuccess") });
    },
    onError: (error: any) => {
      notification.error({
        message: t("category.uploadErrorTitle"),
        description: error?.message ?? t("common.error"),
      });
    },
    onSettled: () => setUploading(false),
  });

  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setArtTypes(data);
    })();
  }, []);

  const fields = [
    { name: "name", label: t("category.name"), type: "input" as const, required: true },
    { name: "description", label: t("category.description"), type: "textarea" as const, required: true },
    { name: "imageFile", label: t("category.image"), type: "upload" as const, required: true },
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
    buttonLabel: uploading ? t("common.uploading") : t("common.submit"),
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <Row justify="center" style={{ padding: "2rem" }}>
      <Col xs={24} sm={20} md={16} lg={24}>
        <Card bordered style={{ borderRadius: 12, padding: "0 2rem" }}>
          <Title level={2} style={{ textAlign: "start", marginBottom: "2rem" }}>
            {t("category.uploadTitle")}
          </Title>
          <GeneratedForm />
        </Card>
      </Col>
    </Row>
  );
}
