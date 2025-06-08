import { Card, Col, Row, Spin, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventBySlug } from "../../api/eventsServices";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getArtwork } from "../../api/artworkServices";

const { Title, Paragraph } = Typography;

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getEventBySlug(slug)
      .then((evt) => setEvent(evt))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const useGetArtwork = (artworkId: string) => {
    return useQuery({
      queryKey: ["artwork", artworkId],
      queryFn: async () => {
        const art = await getArtwork(artworkId);
        return art.data;
      },
    });
  };
  if (loading || !event) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <Card
        cover={
          <img
            alt={event.name}
            src={event.bannerImageUrl}
            style={{ objectFit: "cover", height: 300 }}
          />
        }
      >
        <Title level={2}>{event.name}</Title>
        <Row gutter={16} style={{ marginBottom: "1rem" }}>
          <Col>
            <Paragraph>
              <strong>When:</strong>{" "}
              {dayjs(event.startDate).format("DD MMMM YYYY hh:mm")} –{" "}
              {dayjs(event.endDate).format("DD MMMM YYYY hh:mm")}
            </Paragraph>
          </Col>
          <Col>
            <Paragraph>
              <strong>Where:</strong> {event.location}
            </Paragraph>
            <Paragraph type="secondary">{event.locationAddress}</Paragraph>
          </Col>
        </Row>
        <Paragraph>{event.description}</Paragraph>
        {Array.isArray(event.tags) && event.tags.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            {event.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
        {Array.isArray(event.artworkIds) && event.artworkIds.length > 0 && (
          <>
            <Title level={4}>Exhibited Artworks</Title>
            <Row gutter={[16, 16]}>
              {event.artworkIds.map((art: any) => {
                const artwork = useGetArtwork(art.id);
                return (
                  <Col key={artwork.data?.id} xs={24} sm={12} md={8}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={artwork.data?.title}
                          src={artwork.data?.images?.[0]?.imageUrl}
                          style={{ height: 150, objectFit: "cover" }}
                        />
                      }
                    >
                      <Card.Meta title={artwork.data?.title} description={artwork.data?.price} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Card>
    </div>
  );
}
