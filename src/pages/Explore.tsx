import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layout, Button, Skeleton } from "antd";
import Masonry from "@mui/lab/Masonry";
import { getPaginatedArtworks } from "../api/artworkServices";
import ArtworkCard from "../components/artwork/ArtworkCard";
import FilterDrawer from "../components/artwork/FilterDrawer";
import FilterBar from "../components/FilterBar";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { Artwork } from "../types/IObjectTypes";
import { useFilterContext } from "../context/FilterContext";
import { ArrowUpOutlined } from "@ant-design/icons";

const { Content } = Layout;

const Explore: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const { darkMode } = useThemeToggle();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Pulling values from the context
  const { searchQuery, selectedCategories, priceRange } = useFilterContext();

  // Fetch Artworks with filters
  const fetchArtworks = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        categories: selectedCategories.join(","),
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        page,
        limit: 20,
      };

      const data = await getPaginatedArtworks(params);

      if (data.length === 0) {
        setHasMore(false);
      }
      setArtworks((prev) => {
        if (page === 0) return data;
        const uniqueIds = new Set(prev.map((item) => item.id));
        const newData: Artwork[] = data.filter(
          (item: Artwork) => !uniqueIds.has(item.id)
        );
        return [...prev, ...newData];
      });
    } catch (error) {
      console.error("Failed to load artworks:", error);
    }
    setLoading(false);
  }, [page, loading, hasMore, searchQuery, selectedCategories, priceRange]);

  // Re-fetch data when filters change
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchArtworks();
  }, [searchQuery, selectedCategories, priceRange]);

  // Infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  // Back to Top Button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Moved <FilterProvider> here so it wraps everything correctly
    <Layout>
      <FilterBar onOpenDrawer={() => setIsDrawerVisible(true)} />
      <Content style={{ padding: "24px" }}>
        <Masonry columns={{ xs: 2, sm: 2, md: 4, lg: 4, xl: 4 }} spacing={1}>
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onLikeChange={(liked, newCount) => {}}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
          {loading &&
            hasMore &&
            Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton.Button
                active
                key={idx}
                style={{
                  width: "100%",
                  height: "400px",
                  marginBottom: "10px",
                }}
              />
            ))}
        </Masonry>

        <div ref={loaderRef} style={{ height: 20 }} />
        {showScroll && (
          <Button
            type="primary"
            shape="circle"
            icon={<ArrowUpOutlined />}
            size="large"
            style={{
              position: "fixed",
              bottom: 40,
              right: 40,
              zIndex: 1000,
            }}
            onClick={scrollToTop}
          />
        )}
      </Content>
      <FilterDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
      {selectedArtwork && (
        <ImagePreviewDrawer
          darkMode={darkMode}
          visible={!!selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          id={selectedArtwork.id}
        />
      )}
    </Layout>
  );
};

export default Explore;
