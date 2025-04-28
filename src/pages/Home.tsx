// src/pages/Home.tsx

import Masonry from "@mui/lab/Masonry";
import { Carousel, List, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

import CategoryTag from "../components/CategoryTag";
import FeaturedArtCard, {
  ArtworkWithLike,
} from "../components/FeaturedArtCard";
import FeaturedArtists from "../components/FeaturedArtists";

import { getFeaturedArtworks } from "../api/artworkServices";

import ImagePreviewDrawer from "../components/ImagePreviewDrawer";

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

const categories = ["Acrylic", "Oil", "Digital", "Mixed Media"];
const categoryStyles: Record<string, { gradient: string; color: string }> = {
  Acrylic: {
    gradient: "linear-gradient(45deg,#FF9F1C,#FFBF69)",
    color: "#fff",
  },
  Oil: { gradient: "linear-gradient(45deg,#2EC4B6,#98DFD6)", color: "#fff" },
  Digital: {
    gradient: "linear-gradient(45deg,#E71D36,#FF5964)",
    color: "#fff",
  },
  "Mixed Media": {
    gradient: "linear-gradient(45deg,#011627,#3D5A80)",
    color: "#fff",
  },
};

const Home: React.FC = () => {
  const { darkMode } = useThemeToggle();
  const { t } = useTranslation();

  const [arts, setArts] = useState<ArtworkWithLike[]>([]);
  const [previewArt, setPreviewArt] = useState<ArtworkWithLike | null>(null);

  useEffect(() => {
    getFeaturedArtworks().then((data) => setArts(data));
  }, []);

  const handleLikeChange = (id: string, liked: boolean, newCount: number) => {
    setArts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, liked, likes: newCount } : a))
    );
    if (previewArt?.id === id) {
      setPreviewArt({ ...previewArt, liked, likes: newCount });
    }
  };
  const contentStyle: React.CSSProperties = {
    height: "30rem",
    padding: "0 2rem",
    alignItems: "center",
    justifySelf: "center",
  };

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto", padding: "1rem" }}>
      {/* Featured Art */}
      <section>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("featuredArt")}
        </Title>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={5}
          style={{ marginTop: "3rem" }}
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
      </section>

      {/* Explore by Category */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={2}>{t("exploreByCategory")}</Title>
        <Space wrap style={{ marginTop: 16 }}>
          {categories.map((cat) => (
            <CategoryTag
              key={cat}
              name={cat}
              gradient={categoryStyles[cat].gradient}
              color={categoryStyles[cat].color}
            />
          ))}
        </Space>
      </section>

      {/* New This Week */}
      <section style={{ padding: "2rem 1rem" }}>
        <Title level={3}>New This Week</Title>
        <Carousel autoplay speed={500} arrows style={{ padding: "2rem" }}>
          {arts.map((art) => (
            <div key={art.id}>
              <img src={art.imageUrl} alt={art.title} style={contentStyle} />
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
