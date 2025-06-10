import {
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArtwork } from "../../api/artworkServices";
import { getEventBySlug } from "../../api/eventsServices";
import ImagePreviewDrawer from "../ImagePreviewDrawer";

const { Title, Paragraph, Text } = Typography;

type Event = {
  id: string;
  name: string;
  bannerImageUrl: string;
  startDate: string;
  endDate: string;
  location: string;
  locationAddress: string;
  description: string;
  tags?: string[];
  artworkIds?: string[];
};

// Separate component to fetch & render a single artwork
function ArtworkCard({
  id,
  onClick,
}: {
  id: string;
  onClick: (id: string) => void;
}) {
  const {
    data: art,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["artwork", id],
    queryFn: () => getArtwork(id),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Skeleton.Image
          style={{ width: "100%", height: 150, borderRadius: 8 }}
          active
        />
        <Skeleton active paragraph={{ rows: 1 }} style={{ marginTop: 8 }} />
      </Card>
    );
  }

  if (isError || !art) {
    console.error(`Failed to load artwork with ID: ${id}`, error);
    return (
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Paragraph type="danger">
          Failed to load artwork with ID: {id}
        </Paragraph>
      </Card>
    );
  }

  return (
    <Card
      hoverable
      bordered={false}
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      cover={
        <img
          alt={art.title}
          src={art.imageUrls[0]}
          style={{
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            cursor: "pointer",
          }}
          onClick={() => onClick(id)} // Open the drawer on click
        />
      }
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <Card.Meta
        title={<Text strong>{art.title}</Text>}
        description={
          <Text type="secondary">
            {art.price ? `$${art.price}` : "Price not available"}
          </Text>
        }
        style={{ textAlign: "center" }}
      />
    </Card>
  );
}

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(
    null
  ); // State for selected artwork

  // Fetch event by slug
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getEventBySlug(slug)
      .then((evt) => setEvent(evt as Event))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading || !event) {
    return (
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        <Skeleton.Image
          style={{ width: "100%", height: 300, borderRadius: 12 }}
          active
        />
        <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 16 }} />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "2rem 1rem",
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          height: 300,
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <img
          alt={event.name}
          src={event.bannerImageUrl}
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
            bottom: 20,
            left: 20,
            color: "#fff",
          }}
        >
          <Title level={2} style={{ color: "#fff", margin: 0 }}>
            {event.name}
          </Title>
          <EnvironmentOutlined style={{ fontSize: 18, color: "#52c41a" }} />
          <Text style={{ fontSize: 16, color: "#fff", marginLeft: ".5rem" }}>
            {event.location}
          </Text>
        </div>
      </div>

      {/* Event Details */}
      <Row gutter={[24, 12]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Space>
            <CalendarOutlined style={{ fontSize: 18, color: "#1890ff" }} />
            <Text>
              <strong>Start:</strong>{" "}
              {dayjs(event.startDate).format("DD MMM YYYY, HH:mm")}
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Space>
            <CalendarOutlined style={{ fontSize: 18, color: "#1890ff" }} />
            <Text>
              <strong>End:</strong>{" "}
              {dayjs(event.endDate).format("DD MMM YYYY, HH:mm")}
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Space>
            <EnvironmentOutlined style={{ fontSize: 18, color: "#52c41a" }} />
            <Text
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.locationAddress || event.location
                  )}`,
                  "_blank"
                )
              }
            >
              <strong>Location:</strong>{" "}
              {event.locationAddress || event.location}
            </Text>
          </Space>
        </Col>
      </Row>

      <Divider />

      {/* Description */}
      <Paragraph style={{ lineHeight: 1.8, color: "#444" }}>
        {event.description}
      </Paragraph>

      {/* Tags */}
      {event.tags?.length ? (
        <div style={{ marginBottom: 24 }}>
          {event.tags.map((tag) => (
            <Tag
              key={tag[0]}
              style={{
                backgroundColor: "#e6f7ff",
                color: "#1890ff",
                fontWeight: 500,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      ) : null}

      {/* Exhibited Artworks */}
      {event.artworkIds?.length ? (
        <>
          <Title level={4} style={{ margin: "24px 0 16px", color: "#333" }}>
            Exhibited Artworks
          </Title>
          <Row gutter={[24, 24]}>
            {event.artworkIds.map((id) => (
              <Col key={id} xs={24} sm={12} md={8} lg={6}>
                <ArtworkCard id={id} onClick={setSelectedArtworkId} />
              </Col>
            ))}
          </Row>
        </>
      ) : null}

      {/* Image Preview Drawer */}
      {selectedArtworkId && (
        <ImagePreviewDrawer
          id={selectedArtworkId}
          visible={!!selectedArtworkId}
          onClose={() => setSelectedArtworkId(null)}
          darkMode={false} // Set to true if you have a dark mode toggle
        />
      )}
    </div>
  );
}
