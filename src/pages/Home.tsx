// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { Typography, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import FeaturedArtCard from "../components/featured/FeaturedArtCard";
import { getFeaturedArtworks } from "../api/featured";
import CategoryCarousel from "../components/CategoryCarousel";
import EventCard from "../components/EventCard";
import ShowMoreCard from "../components/ShowMoreCard";
import WelcomeBanner from "../components/WelcomeBanner";
import NewArtworks from "../components/featured/NewArtworks";
import FeaturedArtists from "../components/featured/FeaturedArtists";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";

import { Artwork } from "../types/IObjectTypes";
import { getUpcomingEvents } from "../api/eventsServices";

const { Title } = Typography;

const Home: React.FC = () => {
  const { darkMode } = useThemeToggle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [arts, setArts] = useState<Artwork[]>([]);
  const [previewArt, setPreviewArt] = useState<Artwork | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  // fetch featured artworks
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

  // fetch all events and keep only upcoming
  useEffect(() => {
    getUpcomingEvents()
      .then((events) => {
        // const now = new Date();
        // const upcoming = all.filter((e: any) => new Date(e.startDate) >= now);
        setEvents(events);
      })
      .catch(console.error);
  }, []);

  // responsive masonry columns
  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 2;
    return 3;
  };
  const [columns, setColumns] = useState(getColumnCount());
  useEffect(() => {
    const update = () => setColumns(getColumnCount());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
          {t("upcomingEvents")}
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
          {[...events.slice(0, 4), "show-more"].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: "0 0 auto",
                width: window.innerWidth >= 992 ? "240px" : "200px",
              }}
            >
              {item === "show-more" ? (
                <ShowMoreCard onClick={() => navigate("/events")} />
              ) : (
                <EventCard
                  bannerUrl={item.bannerImageUrl}
                  title={item.name}
                  startDate={dayjs(item.startDate).format("DD MMMM YYYY hh:mm")}
                  endDate={dayjs(item.endDate).format("DD MMMM YYYY hh:mm")}
                  location={item.location}
                  description={item.description}
                  postedBy={item.createdBy}
                  tags={item.tags}
                  slug={item.slug}
                />
              )}
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
                imageUrl: art.imageUrls[0],
                comments: art.commentCount,
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
            visible
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
