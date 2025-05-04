// src/pages/Explore.tsx

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Masonry from "@mui/lab/Masonry";
import { getFeaturedArtworks } from "../api/artworkServices";
import ArtworkCard from "../components/artwork/ArtworkCard";
import FilterDrawer from "../components/artwork/FilterDrawer";
import FilterBar from "../components/FilterBar";
import ImagePreviewDrawer from "../components/ImagePreviewDrawer";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { Artwork } from "../types/IObjectTypes";
import { FilterProvider } from "../context/FilterContext"; // Import the FilterProvider

const { Content } = Layout;

const Explore: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { darkMode } = useThemeToggle();

  useEffect(() => {
    getFeaturedArtworks().then(setArtworks);
  }, []);

  return (
    <FilterProvider>
      {" "}
      {/* Wrap your components with FilterProvider */}
      <Layout>
        <FilterBar onOpenDrawer={() => setIsDrawerVisible(true)} />
        <Content style={{ padding: "24px" }}>
          <Masonry columns={{ xs: 2, sm: 2, md: 4 }} spacing={2}>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={{
                  ...artwork,
                  artist:
                    typeof artwork.artist === "object"
                      ? artwork.artist.fullName
                      : artwork.artist,
                  price: artwork.price.toString(),
                }}
                onClick={() => setSelectedArtwork(artwork)}
              />
            ))}
          </Masonry>
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
            art={
              selectedArtwork
                ? {
                    ...selectedArtwork,
                    comments: selectedArtwork.comments.length,
                  }
                : null
            }
          />
        )}
      </Layout>
    </FilterProvider>
  );
};

export default Explore;
