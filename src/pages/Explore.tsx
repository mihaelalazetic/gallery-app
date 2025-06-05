import { ArrowUpOutlined } from "@ant-design/icons";
import Masonry from "@mui/lab/Masonry";
import { Button, Layout, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
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
  const [showScroll, setShowScroll] = useState(false);
  const [searchParams] = useSearchParams();

  const { darkMode } = useThemeToggle();
  const { searchQuery, selectedCategories, priceRange, setSelectedCategories } =
    useFilterContext();

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [debouncedCategories] = useDebounce(selectedCategories, 300);
  const [debouncedPriceRange] = useDebounce(priceRange, 300);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const parsed = categoryParam
      ? categoryParam
          .split(",")
          .map((v) => parseInt(v))
          .filter((v) => !isNaN(v))
      : [];

    const isDifferent =
      parsed.length !== selectedCategories.length ||
      parsed.some((val, i) => val !== selectedCategories[i]);

    if (isDifferent) {
      setSelectedCategories(parsed);
    }
  }, [searchParams.get("category")]);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const params: Record<string, any> = {
          search: debouncedSearchQuery || "",
          categories:
            debouncedCategories.length > 0 ? debouncedCategories.join(",") : "",
          priceMin: debouncedPriceRange[0],
          priceMax: debouncedPriceRange[1],
          size: "*",
        };
        const data = await getPaginatedArtworks(params);
        setArtworks(data || []);
      } catch (error) {
        console.error("Failed to load artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [debouncedSearchQuery, debouncedCategories, debouncedPriceRange]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
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
          {loading ? (
            <Masonry columns={{ xs: 2, sm: 2, md: 4 }} spacing={1}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Skeleton.Image active style={{ marginBottom: 12 }} />
                  <Skeleton active title={false} paragraph={{ rows: 2 }} />
                </div>
              ))}
            </Masonry>
          ) : artworks.length > 0 ? (
            <Masonry columns={{ xs: 2, sm: 2, md: 4 }} spacing={1}>
              {artworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => setSelectedArtwork(artwork)}
                  onLikeChange={() => {}}
                  preview={false}
                />
              ))}
            </Masonry>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "50px 0",
                color: darkMode ? "#ffffff" : "#000000",
              }}
            >
              <h3>No artworks found</h3>
            </div>
          )}
        </div>

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
