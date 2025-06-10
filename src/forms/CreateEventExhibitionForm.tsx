import { useMutation } from "@tanstack/react-query";
import { Card, Row } from "antd";
import { t } from "i18next";
import { createEvent } from "../api/eventsServices";
import { uploadEventToSupabase } from "../api/uploadEventToSupabase";
import { useAuth } from "../context/AuthContext";
import { FieldConfig, useGeneratedAntForm } from "../hooks/useGeneratedAntForm";
import { useGlobalNotification } from "../providers/GlobalNotificationProvider";
import React, { useEffect } from "react";
import { getCategories } from "../api/categoryServices";

export default function CreateEventExhibitionForm({
  onUploadSuccess,
}: {
  onUploadSuccess?: (eventSlug: string) => void;
}) {
  const notification = useGlobalNotification();

  const { user } = useAuth();
  const slug = user?.slug;

  const [categories, setCategories] = React.useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const {
        dateRange: [startDate, endDate] = [null, null],
        imageFile,
        ...restFields
      } = formData;

      // upload banner if present
      let bannerImage = "";
      const file = imageFile?.fileList?.[0]?.originFileObj as File | undefined;
      if (file) {
        bannerImage = await uploadEventToSupabase(file);
      }

      // build payload
      const payload = {
        ...restFields,
        startDate,
        endDate,
        bannerImage,
        createdByUUID: user?.id,
      };

      // call the service (which returns JSON directly)
      const createdEvent = await createEvent(payload);
      return createdEvent;
    },

    onMutate: () => {
      notification.info({ message: "Creating event...", duration: 2 });
    },

    onSuccess: (event) => {
      notification.success({ message: "Event created successfully!" });
      onUploadSuccess?.(event.slug);
    },

    onError: (err: any) => {
      notification.error({
        message: "Error creating event",
        description: err.message || String(err),
      });
    },
  });

  const fields: FieldConfig[] = [
    {
      name: "imageFile",
      label: t("createEvent"),
      type: "upload",
      uploadTitle: t("createEvent"),
    },
    { name: "title", label: "Title", type: "input", required: true },
    { name: "description", label: "Description", type: "textarea" },
    {
      name: "dateRange",
      label: "Date & Time",
      type: "customDateRange",  
      required: true,
    },
    { name: "isPublic", label: t("public"), type: "switch" },
    {
      name: "eventType",
      label: t("eventType"),
      type: "select",
      options: [
        { label: "Exhibition", value: "EXHIBITION" },
        { label: "Workshop", value: "WORKSHOP" },
        { label: "Meetup", value: "MEETUP" },
        { label: "Other", value: "OTHER" },
      ],
      required: true,
    },
    { name: "mapPicker", label: "Pick Venue", type: "customMapPicker" },
    { name: "venueName", label: "Venue Name", type: "input" },
    { name: "venueAddress", label: "Venue Address", type: "input" },
    {
      name: "tags",
      label: "Tags",
      type: "autocomplete",
      options: categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    },
    { name: "artworkIds", label: "Artworks", type: "customArtworkSelector" },
  ];

  const layoutConfig = {
    columns: [
      { key: "col1", span: { xs: 24, md: 12 } },
      { key: "col2", span: { xs: 24, md: 12 } },
    ],
    fieldGroups: {
      col1: [
        "imageFile",
        "title",
        "description",
        "dateRange",
        "eventType",
        "artworkIds",
      ],
      col2: ["isPublic", "tags", "mapPicker", "venueName", "venueAddress"],
    },
  };

  const { GeneratedForm } = useGeneratedAntForm({
    fields,
    layoutConfig,
    buttonLabel: "Create Event",
    slug,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <Row justify="center">
      <Card style={{ width: "100%", borderRadius: 12, padding: "2rem" }}>
        <GeneratedForm />
      </Card>
    </Row>
  );
}
