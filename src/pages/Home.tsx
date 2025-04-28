// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import { Carousel, List, Typography, Space, Image } from "antd";
import Masonry from "@mui/lab/Masonry";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

import FeaturedArtCard, {
  ArtworkWithLike,
} from "../components/FeaturedArtCard";
import FeaturedArtists, { FeaturedArtist } from "../components/FeaturedArtists";
import CategoryTag from "../components/CategoryTag";

import { getFeaturedArtworks } from "../api/artworkServices";

import reactlogo from "../assets/react.svg";
import person from "../assets/person.jfif";
import person2 from "../assets/person2.jfif";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";

const { Title, Text } = Typography;

// dummy top‐artists data
export const featuredArtists: FeaturedArtist[] = [
  {
    id: 1,
    fullName: "Eva K.",
    avatarUrl: reactlogo,
    followers: 120,
    rating: 4.5,
    featuredArtCount: 12,
  },
  {
    id: 2,
    fullName: "Luka M.",
    avatarUrl: person,
    followers: 102,
    rating: 4.2,
    featuredArtCount: 9,
  },
  {
    id: 3,
    fullName: "Anja R.",
    avatarUrl: person2,
    followers: 98,
    rating: 4.8,
    featuredArtCount: 7,
  },
  {
    id: 4,
    fullName: "Mira T.",
    avatarUrl: person2,
    followers: 88,
    rating: 4.0,
    featuredArtCount: 5,
  },
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
        <FeaturedArtists artists={featuredArtists} />
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
