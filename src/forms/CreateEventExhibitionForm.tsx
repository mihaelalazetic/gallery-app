// --- FILE: CreateEventExhibitionForm.tsx ---
import { useMutation } from "@tanstack/react-query";
import { Card, Col, Row, Typography } from "antd";
import { createEvent } from "../api/evenrServices";
import { uploadEventToSupabase } from "../api/uploadEventToSupabase";
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
      // 1) Upload banner image to Supabase
      const imageUrl = await uploadEventToSupabase(
        formData.get("bannerImage") as File
      );
      formData.set("bannerImage", imageUrl);

      // 2) Create the event using your API
      const res = await createEvent(formData);
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

  //
  // 1) Define all your form fields here:
  //
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

  //
  // 2) Split the form into two columns on md+ screens:
  //
  const layoutConfig = {
    columns: [
      // Column 1: spans 24 on xs, 12 on md+
      { key: "col1", span: { xs: 24, md: 12 } },
      // Column 2: spans 24 on xs, 12 on md+
      { key: "col2", span: { xs: 24, md: 12 } },
    ],
    fieldGroups: {
      col1: [
        "title",
        "description",
        "dateRange",
        "links",
        "bannerImage",
        "artworkIds",
      ],
      col2: ["mapPicker", "venueName", "venueAddress"],
    },
  };

  //
  // 3) Instantiate the generated form hook:
  //
  const { GeneratedForm, form } = useGeneratedAntForm({
    fields,
    layoutConfig,
    buttonLabel: "Create Event / Exhibition",
    slug: slug,
    onSubmit: (values) => {
      // Convert values into a FormData instance:
      const body = new FormData();

      for (const [key, value] of Object.entries(values)) {
        // skip the internal fileList field—only append the raw file itself
        if (key === "imageFile") continue;

        if (Array.isArray(value)) {
          value.forEach((v) => body.append(`${key}[]`, v));
        } else if (typeof value === "string" || value instanceof Blob) {
          body.append(key, value);
        }
      }

      // Now append the actual bannerImage file(s):
      values.imageFile?.fileList?.forEach((file: any) => {
        body.append("bannerImage", file.originFileObj);
      });

      mutation.mutate(body);
    },
  });

  return (
    <Row justify="center">
      {/*
        - On very small screens (xs), the Col is 24 (full width).
        - On small screens (sm), it shrinks slightly (e.g. 22/24).
        - On medium screens (md), it’s 18/24.
        - On large (lg) & xl, we cap it even more so it doesn’t stretch too wide.
      */}
      {/* <Col xs={24} sm={22} md={18} lg={14} xl={12}> */}
      <Card
        style={{
          // maxWidth: 800, // Never exceed 800px wide
          width: "100%", // Otherwise fill available width
          borderRadius: 12,
          padding: "2rem",
        }}
      >
        <Title level={2} style={{ textAlign: "left", marginBottom: "1.5rem" }}>
          Create Event
        </Title>
        <GeneratedForm />
      </Card>
      {/* </Col> */}
    </Row>
  );
}
