import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Empty, Spin, Badge, Tag } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { getNewArtworks } from "../../api/featured";
import { Artwork } from "../../types/IObjectTypes";
import { useThemeToggle } from "../../providers/AppThemeProvider";
import { LikeButton } from "../LikeButton";
import PriceTag from "../PriceTag";

const { Title, Text } = Typography;
interface NewArtworksProps {
  onArtClick: (art: Artwork) => void;
  onLikeChange: (id: string, liked: boolean, newCount: number) => void;
}

const NewArtworks: React.FC<NewArtworksProps> = ({
  onArtClick,
  onLikeChange,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { darkMode } = useThemeToggle(); // Assuming you have a theme toggle context or provider

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getNewArtworks({ filter: "thisMonth" });
        setArtworks(
          data.map((a: { comments: any; likes: any; liked: any }) => ({
            ...a,
            comments: Array.isArray(a.comments) ? a.comments : [],
            likes: a.likes || 0,
            liked: a.liked || false,
          }))
        );

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
              <PriceTag price={artwork.price} visible={true} />

              <Card
                hoverable
                onClick={() => onArtClick(artwork)}
                style={{
                  background: "none",
                  border: "none",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "transform 0.2s ease-in-out",
                  padding: 0,
                }}
              >
                <img
                  src={artwork.imageUrls[0]}
                  alt={artwork.title}
                  style={{
                    height: 180,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />

                <div style={{ padding: "12px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3
                      style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}
                    >
                      {artwork.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <LikeButton
                        artworkId={artwork.id}
                        initialCount={artwork.likes}
                        initialLiked={artwork.liked}
                        onLikeChange={(liked, newCount) =>
                          onLikeChange(artwork.id, liked, newCount)
                        }
                      />
                      <CommentOutlined
                        style={{ marginLeft: 16, fontSize: 18 }}
                      />
                      <Text style={{ marginLeft: 4, color: "#888" }}>
                        {artwork.commentCount ??
                          (Array.isArray(artwork.comments)
                            ? artwork.comments.length
                            : 0)}
                      </Text>
                    </div>
                  </div>

                  <p style={{ color: "#888", margin: "4px 0 12px" }}>
                    {artwork.artist.fullName}
                  </p>

                  {artwork.categories?.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {artwork.categories.map((category) => (
                        <Tag color="blue" key={category}>
                          {category}
                        </Tag>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
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

export default NewArtworks;
