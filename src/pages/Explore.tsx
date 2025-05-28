import { ArrowUpOutlined } from "@ant-design/icons";
import Masonry from "@mui/lab/Masonry";
import { Button, Layout, Skeleton } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPaginatedArtworks } from "../api/artworkServices";
import ArtworkCard from "../components/artwork/ArtworkCard";
import FilterDrawer from "../components/artwork/FilterDrawer";
import FilterBar from "../components/FilterBar";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";
import { useFilterContext } from "../context/FilterContext";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { Artwork } from "../types/IObjectTypes";
import { useDebounce } from "use-debounce";

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

  const { searchQuery, selectedCategories, priceRange } = useFilterContext();

  // Debounce the search query to avoid excessive API calls
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  // Fetch artworks from the API
  const fetchArtworks = useCallback(async () => {
    if (loading) return; // Prevent overlapping API calls

    setLoading(true);

    try {
      const params: Record<string, any> = {
        search: debouncedSearchQuery || "",
        categories:
          selectedCategories.length > 0 ? selectedCategories.join(",") : "",
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        page,
        limit: 20,
      };

      const data = await getPaginatedArtworks(params);

      if (page === 0) {
        setArtworks(data); // Replace results for a new search
      } else {
        setArtworks((prev) => [...prev, ...data]); // Append results for infinite scroll
      }

      if (data.length === 0) {
        setHasMore(false); // Stop fetching if no more results
      }
    } catch (error) {
      console.error("Failed to load artworks:", error);
    }

    setLoading(false);
  }, [page, debouncedSearchQuery, selectedCategories, priceRange, loading]);

  // Trigger fetchArtworks when filters or search query change
  useEffect(() => {
    setPage(0); // Reset to the first page
    setHasMore(true); // Allow fetching more results
    setArtworks([]); // Clear the current results
    fetchArtworks(); // Fetch new results based on updated filters
  }, [debouncedSearchQuery, selectedCategories, priceRange]);

  // Infinite scroll handler
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
    if (window.scrollY > 100) {
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
    <Layout>
      <FilterBar onOpenDrawer={() => setIsDrawerVisible(true)} />
      <Content>
        <div
          style={{
            width: "100%",
            maxWidth: "90%",
            margin: "0 auto",
            minHeight: "500px",
          }}
        >
          {artworks.length > 0 ? (
            <Masonry
              columns={{ xs: 2, sm: 2, md: 4, lg: 4, xl: 4 }}
              spacing={1}
            >
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
                      width: "1000px",
                      height: "1000px",
                      marginBottom: "10px",
                    }}
                  />
                ))}
            </Masonry>
          ) : (
            !loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 0",
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              >
                <h3>No artworks found</h3>
              </div>
            )
          )}
        </div>
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
