// src/components/FeaturedArtists.tsx
import React from "react";
import { Carousel, Card, Avatar, Rate, Typography, Badge } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export interface FeaturedArtist {
  id: number | string;
  fullName: string;
  avatarUrl: string;
  followers: number;
  rating: number; // 0–5
  featuredArtCount: number; // e.g. how many pieces they have featured
}

interface FeaturedArtistsProps {
  artists: FeaturedArtist[];
}

const FeaturedArtists: React.FC<FeaturedArtistsProps> = ({ artists }) => {
  const { darkMode } = useThemeToggle();

  return (
    <div
      style={{
        padding: "2rem 1rem",
      }}
    >
      <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
        Featured Artists
      </Title>

      <Carousel
        dots={false}
        autoplay
        slidesToShow={3}
        swipeToSlide
        autoplaySpeed={5000} // ← 5000ms = 5 seconds per slide
        speed={800}
        adaptiveHeight
        style={{ padding: "0 1rem" }}
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } },
        ]}
      >
        {artists.map((artist) => (
          <div key={artist.id} style={{ padding: "0 8px" }}>
            <Card
              hoverable
              style={{
                background: darkMode ? "#2a2a3b" : "#fff",
                borderRadius: 8,
                textAlign: "center",
                paddingBottom: 16,
                margin: "1rem",
              }}
              bodyStyle={{ padding: 16 }}
            >
              <Badge
                count={`${artist.featuredArtCount} art`}
                style={{ backgroundColor: darkMode ? "#722ed1" : "#9254de" }}
              >
                <Avatar
                  size={80}
                  src={artist.avatarUrl}
                  icon={<TeamOutlined />}
                />
              </Badge>

              <Meta
                title={
                  <strong style={{ color: darkMode ? "#fff" : "#000" }}>
                    {artist.fullName}
                  </strong>
                }
                description={
                  <>
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={artist.rating}
                      style={{ marginTop: 8 }}
                    />
                    <Paragraph
                      style={{
                        color: darkMode ? "#ccc" : "#666",
                        margin: "8px 0 0",
                      }}
                    >
                      {artist.followers.toLocaleString()} followers
                    </Paragraph>
                  </>
                }
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedArtists;
