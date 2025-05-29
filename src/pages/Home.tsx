// src/pages/Home.tsx

import Masonry from "@mui/lab/Masonry";
import { List, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";

import FeaturedArtCard from "../components/featured/FeaturedArtCard";

import { getFeaturedArtworks } from "../api/featured";
import CategoryCarousel from "../components/CategoryCarousel";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";
import FeaturedArtists from "../components/featured/FeaturedArtists";
import NewArtworks from "../components/featured/NewArtworks";
import { Artwork } from "../types/IObjectTypes";

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

const Home: React.FC = () => {
  const { darkMode } = useThemeToggle();
  const { t } = useTranslation();

  const [arts, setArts] = useState<Artwork[]>([]);
  const [previewArt, setPreviewArt] = useState<Artwork | null>(null);

  useEffect(() => {
    getFeaturedArtworks().then((data) =>
      setArts(
        data.map((art: Artwork) => ({
          ...art,
          comments: Array.isArray(art.comments) ? art.comments.length : 0,
        }))
      )
    );
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

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto", padding: "1rem" }}>
      {/* Explore by Category */}
      <section>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("exploreByCategory")}
        </Title>
        <CategoryCarousel />
      </section>

      {/* Top Artists */}
      <section style={{ padding: "2rem 1rem" }}>
        <FeaturedArtists />
        {/* <OnThisDateFeaturedArtists /> */}
      </section>

      {/* Featured Art */}
      <section>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("featuredArt")}
        </Title>
        <Masonry className="gallery-grid" columns={3} spacing={3}>
          {arts.map((art) => (
            <FeaturedArtCard
              key={art.id}
              art={{
                ...art,
                imageUrl: art?.imageUrls[0],
                comments: art?.commentCount,
              }}
              darkMode={darkMode}
              onClick={() => setPreviewArt(art)}
              onLikeChange={handleLikeChange}
            />
          ))}
        </Masonry>
        {previewArt && (
          <ImagePreviewDrawer
            id={previewArt.id}
            visible={true}
            onClose={() => setPreviewArt(null)}
            darkMode={darkMode}
          />
        )}
      </section>

      {/* Preview Drawer */}

      {/* New This Week */}
      <section style={{ padding: "2rem 1rem" }}>
        <NewArtworks
          onArtClick={setPreviewArt}
          onLikeChange={handleLikeChange}
        />
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
