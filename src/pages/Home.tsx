// src/pages/Home.tsx

import Masonry from "@mui/lab/Masonry";
import { Carousel, Col, List, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

import CategoryTag from "../components/CategoryTag";
import FeaturedArtCard, {
  ArtworkWithLike,
} from "../components/featured/FeaturedArtCard";

import { getFeaturedArtworks } from "../api/artworkServices";

import ImagePreviewDrawer from "../components/ImagePreviewDrawer";
import FeaturedArtists from "../components/featured/FeaturedArtists";
import {
  FaBolt,
  FaCamera,
  FaCubes,
  FaEye,
  FaLightbulb,
  FaMinus,
  FaMobileAlt,
  FaPaintBrush,
  FaSprayCan,
  FaTabletAlt,
} from "react-icons/fa";

const { Title, Text } = Typography;

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

const categories = [
  { name: "Abstract Expressionism", Icon: FaPaintBrush },
  { name: "Pop Art", Icon: FaBolt },
  { name: "Minimalism", Icon: FaMinus },
  { name: "Digital Illustration", Icon: FaTabletAlt },
  { name: "Street Art", Icon: FaSprayCan },
  { name: "Surrealism", Icon: FaEye },
  { name: "Photorealism", Icon: FaCamera },
  { name: "Conceptual Art", Icon: FaLightbulb },
  { name: "Installation Art", Icon: FaCubes },
  { name: "New Media Art", Icon: FaMobileAlt },
];

const Home: React.FC = () => {
  const { darkMode } = useThemeToggle();
  const { t } = useTranslation();

  const [arts, setArts] = useState<ArtworkWithLike[]>([]);
  const [previewArt, setPreviewArt] = useState<ArtworkWithLike | null>(null);

  useEffect(() => {
    getFeaturedArtworks().then(setArts);
  }, []);

  // update both grid and drawer on like
  const handleLikeChange = (id: string, liked: boolean, likes: number) => {
    setArts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, liked, likes } : a))
    );
    if (previewArt?.id === id) {
      setPreviewArt({ ...previewArt, liked, likes });
    }
  };

  // Decide how many columns to show at 'md' width:
  //  1 item → 1 col
  //  4 items → 2 cols
  //  any other count → up to 3 cols (but never more than number of items)
  const colsAtMd = (() => {
    const n = arts.length;
    if (n <= 1) return 1;
    if (n === 4) return 2;
    return Math.min(3, n);
  })();

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto", padding: "1rem" }}>
      {/* Explore by Category */}
      <section style={{ padding: "2rem 1rem" }}>
        <Row gutter={[16, 16]} justify="center">
          {categories.map(({ name, Icon }) => (
            <Col key={name} xs={12} sm={8} md={6} lg={4}>
              <CategoryTag name={name} Icon={Icon} />
            </Col>
          ))}
        </Row>
      </section>

      {/* Featured Art */}
      <section>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("featuredArt")}
        </Title>
        <Masonry
          // always 1 col on extra-small,
          // up to 2 cols on small (but never more than our md-count),
          // and 'colsAtMd' on medium+.
          columns={{
            xs: 1,
            sm: Math.min(2, colsAtMd),
            md: colsAtMd,
          }}
          spacing={5}
          style={{ marginTop: "1rem" }}
        >
          {arts.map((art) => (
            <FeaturedArtCard
              key={art.id}
              art={art}
              darkMode={darkMode}
              onClick={() => setPreviewArt(art)}
              onLikeChange={handleLikeChange}
            />
          ))}
        </Masonry>
      </section>

      {/* Preview Drawer */}
      <ImagePreviewDrawer
        art={previewArt}
        visible={!!previewArt}
        onClose={() => setPreviewArt(null)}
        darkMode={darkMode}
      />

      {/* Top Artists */}
      <section style={{ padding: "2rem 1rem" }}>
        <FeaturedArtists />
        {/* <OnThisDateFeaturedArtists /> */}
      </section>

      {/* New This Week */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={3}>New This Week</Title>
        <Carousel autoplay speed={500} arrows style={{ padding: "2rem" }}>
          {arts.map((art) => (
            <div key={art.id}>
              <img
                src={art.imageUrl}
                alt={art.title}
                style={{
                  height: "30rem",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Upcoming Exhibitions */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={3}>Upcoming Exhibitions</Title>
        <List
          itemLayout="vertical"
          dataSource={upcomingExhibitions}
          renderItem={(ev) => (
            <List.Item>
              <List.Item.Meta
                title={<strong>{ev.title}</strong>}
                description={<em>{ev.date}</em>}
              />
              <Text>{ev.description}</Text>
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default Home;
