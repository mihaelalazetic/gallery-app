// --- FILE: CreateEventExhibitionForm.tsx ---
import { useMutation } from "@tanstack/react-query";
import { Card, Col, Row, Typography } from "antd";
import { useAuth } from "../context/AuthContext";
import { FieldConfig, useGeneratedAntForm } from "../hooks/useGeneratedAntForm";
import { useGlobalNotification } from "../providers/GlobalNotificationProvider";

const { Title } = Typography;

export default function CreateEventExhibitionForm() {
  const notification = useGlobalNotification();
  const { user } = useAuth();
  const slug = user?.slug;

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to create event");
      return res.json();
    },
    onSuccess: () => {
      notification.success({ message: "Event created successfully!" });
    },
    onError: () => {
      notification.error({ message: "Error creating event" });
    },
  });

  const fields: FieldConfig[] = [
    { name: "title", label: "Title", type: "input", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "dateRange", label: "Date & Time", type: "customDateRange" },
    { name: "mapPicker", label: "Pick Venue", type: "customMapPicker" },
    { name: "venueName", label: "Venue Name", type: "input" },
    { name: "venueAddress", label: "Venue Address", type: "input" },
    { name: "links", label: "Links", type: "customDynamicLinks" },
    { name: "bannerImage", label: "Banner Image", type: "upload" },
    { name: "artworkIds", label: "Artworks", type: "customArtworkSelector" },
  ];

  const layoutConfig = {
    columns: [{ key: "main", span: { xs: 24 } }],
    fieldGroups: {
      main: [
        "title",
        "description",
        "dateRange",
        "mapPicker",
        "venueName",
        "venueAddress",
        "links",
        "bannerImage",
        "artworkIds",
      ],
    },
  };

  const { GeneratedForm, form } = useGeneratedAntForm({
    fields,
    layoutConfig,
    buttonLabel: "Create Event / Exhibition",
    slug: slug,
    onSubmit: (values) => {
      const body = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (key === "imageFile") continue;
        if (Array.isArray(value)) {
          value.forEach((v) => body.append(`${key}[]`, v));
        } else if (typeof value === "string" || value instanceof Blob) {
          body.append(key, value);
        }
      }

      values.imageFile?.fileList?.forEach((file: any) => {
        body.append("bannerImage", file.originFileObj);
      });

      mutation.mutate(body);
    },
  });

  return (
    <Row justify="center">
      <Col xs={24} sm={22} md={18} lg={16}>
        <Card style={{ borderRadius: 12, padding: "2rem" }}>
          <Title level={2}>Create Event / Exhibition</Title>
          <GeneratedForm />
        </Card>
      </Col>
    </Row>
  );
}
