import { Button, Card, Carousel, Col, List, Row, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

import { useEffect, useState } from "react";
import { getFeaturedArtworks } from "../api/artworkServices";
import person from "../assets/person.jfif";
import person2 from "../assets/person2.jfif";
import reactlogo from "../assets/react.svg";
import PictureFrame from "../components/PictureFrame";

const { Title } = Typography;

// const featuredArt = [
//   { id: 1, title: "Sunset Bloom", artist: "Eva K.", image: color },
//   { id: 2, title: "Urban Mirage", artist: "Luka M.", image: imrs },
//   { id: 3, title: "Fluid Emotion", artist: "Anja R.", image: wallswap },
// ];

const topArtists = [
  { id: 1, name: "Eva K.", avatar: reactlogo, likes: 120 },
  { id: 2, name: "Luka M.", avatar: person, likes: 102 },
  { id: 3, name: "Anja R.", avatar: person2, likes: 98 },
];

const upcomingExhibitions = [
  {
    title: "Virtual Acrylic Showcase",
    date: "April 22, 2025",
    description: "Experience bold brushstrokes and digital light.",
  },
  {
    title: "Urban Nature – Hybrid Event",
    date: "May 10, 2025",
    description: "A fusion of flora and street art from Balkan artists.",
  },
];

const categories = ["Acrylic", "Oil", "Digital", "Mixed Media"];

const Home = () => {
  const { darkMode } = useThemeToggle();
  const { t } = useTranslation();

  const [featuredArt, setArtworks] = useState<any[]>([]);
  useEffect(() => {
    getFeaturedArtworks().then((response) => {
      setArtworks(response);
    });
  }, []);
  return (
    <div style={{ maxWidth: "90%", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Featured Art Section */}
      <section>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("featuredArt")}
        </Title>

        <Row gutter={[48, 48]} justify="center" style={{ marginTop: "3rem" }}>
          {featuredArt.map((art) => (
            <Col xs={24} sm={12} md={8} key={art.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Painting in frame */}
                <PictureFrame src={art.imageUrl} alt={art.title} />

                {/* Info Meta Card under the painting */}
                <Card
                  size="small"
                  bordered={false}
                  style={{
                    width: 200,
                    marginTop: 16,
                    background: darkMode ? "#2a2a3b" : "#fff",
                    boxShadow: darkMode
                      ? "0 2px 8px rgba(0,0,0,0.5)"
                      : "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Card.Meta
                    title={<strong>{art.title}</strong>}
                    description={<em>By {art?.artist.fullName}</em>}
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Top Artists Section */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("topArtists")}
        </Title>
        <Row gutter={[16, 16]}>
          {topArtists.map((artist) => (
            <Col xs={24} sm={12} md={8} key={artist.id}>
              <Card
                hoverable
                cover={
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    style={{ height: 240, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta
                  title={artist.name}
                  description={`Likes: ${artist.likes}`}
                />
                <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                  View Portfolio
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Categories Section */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2}>{t("exploreByCategory")}</Title>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Tag
              key={cat}
              color="purple"
              style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
            >
              {cat}
            </Tag>
          ))}
        </div>
      </section>

      {/* New This Week Carousel */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2}>New This Week</Title>
        <Carousel autoplay dotPosition="bottom">
          {featuredArt.map((art) => (
            <div key={art.id} style={{ padding: "0 1rem" }}>
              <Card
                hoverable
                cover={
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ height: 400, objectFit: "cover", borderRadius: 8 }}
                  />
                }
                style={{ maxWidth: 600, margin: "0 auto" }}
              >
                <Card.Meta title={art.title} description={`By ${art.artist}`} />
              </Card>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Upcoming Exhibitions */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2}>Upcoming Exhibitions</Title>
        <List
          itemLayout="vertical"
          dataSource={upcomingExhibitions}
          renderItem={(event) => (
            <List.Item>
              <List.Item.Meta
                title={<strong>{event.title}</strong>}
                description={<em>{event.date}</em>}
              />
              <div>{event.description}</div>
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default Home;
