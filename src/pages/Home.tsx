// src/pages/Home.tsx

import Masonry from "@mui/lab/Masonry";
import { Typography, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { useNavigate } from "react-router-dom";

import FeaturedArtCard from "../components/featured/FeaturedArtCard";
import { getFeaturedArtworks } from "../api/featured";
import CategoryCarousel from "../components/CategoryCarousel";
import EventCard from "../components/EventCard";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";
import FeaturedArtists from "../components/featured/FeaturedArtists";
import NewArtworks from "../components/featured/NewArtworks";
import ShowMoreCard from "../components/ShowMoreCard";
import WelcomeBanner from "../components/WelcomeBanner";
import { Artwork } from "../types/IObjectTypes";

const { Title } = Typography;

const events = [
  {
    bannerUrl:
      "https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FXKQswk9jnjP1NA--fQiGGg%2Fnormalized.jpg&width=2400",
    title: "Art Through Time",
    startDate: "2025-06-10 08:00",
    endDate: "2025-06-25 17:00",
    location: "Skopje City Gallery",
    description:
      "Join us for a visual journey through history in this carefully curated exhibition featuring renowned artists.",
    postedBy: "Mihaela Lazetic",
    tags: ["Modern", "Oil Painting", "Gallery"],
    slug: "test-event-1",
  },
  {
    bannerUrl:
      "https://xgvoeecvligsvmyefasj.supabase.co/storage/v1/object/public/users//1745862007581-ny%20pozadina%20rockefeller.jpeg",
    title: "Colors of the Mind",
    startDate: "2025-07-01 10:00",
    endDate: "2025-07-10 18:00",
    location: "Gallery Nova",
    description:
      "A vibrant collection exploring mental landscapes through abstract expressionism.",
    postedBy: "Ana Petrova",
    tags: ["Abstract", "Acrylic", "Expressionism"],
    slug: "test-event-2",
  },
  {
    bannerUrl:
      "https://xgvoeecvligsvmyefasj.supabase.co/storage/v1/object/public/users//1747683166731-Honerlah-Randy_Letting-Go_AcrylicWorks5_artists-network.webp",
    title: "Silent Forms",
    startDate: "2025-07-15 09:00",
    endDate: "2025-07-20 16:00",
    location: "National Art Museum",
    description:
      "Minimalist sculptures and installations reflecting silence in form and material.",
    postedBy: "Dragan Stojanovski",
    tags: ["Sculpture", "Minimalism", "Contemporary"],
    slug: "test-event-3",
  },
  {
    bannerUrl:
      "https://xgvoeecvligsvmyefasj.supabase.co/storage/v1/object/public/users//1747251128052-5d8dacda48ee42caacc6d5abd6a866ec_opt.webp",
    title: "Echoes of Tradition",
    startDate: "2025-08-05 11:00",
    endDate: "2025-08-18 17:00",
    location: "Ethno Cultural Center",
    description:
      "Traditional Balkan crafts reimagined by contemporary artists.",
    postedBy: "Lidija Ilievska",
    tags: ["Traditional", "Folk Art", "Culture"],
    slug: "test-event-4 ",
  },
];

const Home: React.FC = () => {
  const { darkMode } = useThemeToggle();
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 2;
    return 3;
  };

  const [columns, setColumns] = useState(getColumnCount());

  useEffect(() => {
    const updateSlides = () => {
      setColumns(getColumnCount());
    };
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

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
      <WelcomeBanner />

      <section style={{ marginBottom: "2rem" }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          Upcoming Events
        </Title>
        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "8px",
            WebkitOverflowScrolling: "touch",
            flexWrap: window.innerWidth >= 992 ? "wrap" : "nowrap",
            justifyContent: window.innerWidth >= 992 ? "flex-start" : undefined,
          }}
        >
          {[...events.slice(0), "show-more"].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: "0 0 auto",
                width: window.innerWidth >= 992 ? "240px" : "200px",
              }}
            >
              {item === "show-more" ? (
                <ShowMoreCard onClick={() => navigate("events")} />
              ) : typeof item === "object" && item !== null ? (
                <EventCard {...item} />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <Title level={2}>{t("exploreByCategory")}</Title>
        <CategoryCarousel slidesToShow={columns} />
      </section>

      <section style={{ padding: "2rem 1rem" }}>
        <Row>
          <Col span={24}>
            <FeaturedArtists />
          </Col>
        </Row>
      </section>

      <section>
        <Title level={2} style={{ color: darkMode ? "#fff" : "#1c1c1e" }}>
          {t("featuredArt")}
        </Title>
        <Masonry className="gallery-grid" columns={columns} spacing={3}>
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

      <section style={{ padding: "2rem 1rem" }}>
        <Row>
          <Col span={24}>
            <NewArtworks
              onArtClick={setPreviewArt}
              onLikeChange={handleLikeChange}
            />
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;
