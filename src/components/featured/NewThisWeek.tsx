import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Empty, Spin, Badge } from "antd";
import { getNewArtworks } from "../../api/featured";
import { Artwork } from "../../types/IObjectTypes";
import { useThemeToggle } from "../../providers/AppThemeProvider";

const { Title, Text } = Typography;

const NewThisWeek: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { darkMode } = useThemeToggle(); // Assuming you have a theme toggle context or provider

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getNewArtworks({ filter: "thisMonth" });
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: darkMode ? "#1e1e2f" : "#f3f4f6",
        borderRadius: 12,
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
        🆕 This Month
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: 48 }}>
          <Spin size="large" />
        </div>
      ) : artworks.length > 0 ? (
        <Row gutter={[24, 24]}>
          {artworks.map((artwork) => (
            <Col key={artwork.id} xs={24} sm={12} md={8} lg={6}>
              <Badge.Ribbon
                text={artwork.price ? `${artwork.price} EUR` : "New"}
                color="cyan"
              >
                <Card
                  hoverable
                  cover={
                    <img
                      src={artwork.imageUrls[0]}
                      alt={artwork.title}
                      style={{ height: 180, objectFit: "cover" }}
                    />
                  }
                  style={{ borderRadius: 8 }}
                >
                  <Card.Meta
                    title={
                      <Text strong style={{ color: "#555" }}>
                        {artwork.title}
                      </Text>
                    }
                    description={
                      <Text type="secondary">{artwork.artist.fullName}</Text>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="No new artworks this month"
          style={{ marginTop: 64 }}
        />
      )}
    </div>
  );
};

export default NewThisWeek;
