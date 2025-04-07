import { Button, Card, Carousel, Col, List, Row, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Title, Paragraph } = Typography;

const featuredArt = [
  { id: 1, title: "Sunset Bloom", artist: "Eva K.", image: "/demo1.jpg" },
  { id: 2, title: "Urban Mirage", artist: "Luka M.", image: "/demo2.jpg" },
  { id: 3, title: "Fluid Emotion", artist: "Anja R.", image: "/demo3.jpg" },
];

const topArtists = [
  { id: 1, name: "Eva K.", avatar: "/artist1.jpg", likes: 120 },
  { id: 2, name: "Luka M.", avatar: "/artist2.jpg", likes: 102 },
  { id: 3, name: "Anja R.", avatar: "/artist3.jpg", likes: 98 },
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

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1rem" }}>
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("featuredArt")}
        </Title>
        <Row gutter={[16, 16]}>
          {featuredArt.map((art) => (
            <Col xs={24} sm={12} md={8} key={art.id}>
              <Card
                hoverable
                cover={
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ height: 240, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta title={art.title} description={`By ${art.artist}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2}>{t("topArtists")}</Title>
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
