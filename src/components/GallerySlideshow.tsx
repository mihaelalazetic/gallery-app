// GallerySlideshow.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PictureFrame from "./PictureFrame";
import { useThemeToggle } from "../providers/AppThemeProvider";

interface GallerySlideshowProps {
  images: string[];
}

const GallerySlideshow: React.FC<GallerySlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { darkMode } = useThemeToggle();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Updated spotlight with more transparency.
  const spotlightBg = darkMode
    ? "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.18), transparent 70%)"
    : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)";

  return (
    <Box
      sx={{
        left: 50,
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {images.map((img, idx) => {
        const position = idx - currentIndex;
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: 0,
              // left: "55%", // Position container center horizontally
              transform: `translateX(calc(${position * 120}% )) scale(${
                idx === currentIndex ? 1 : 0.75
              })`,
              opacity: idx === currentIndex ? 1 : 0,
              transition: "transform 1.5s ease, opacity 1.5s ease",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
            }}
          >
            <PictureFrame
              src={img}
              alt={`Gallery art ${idx + 1}`}
              source="auth"
            />
          </Box>
        );
      })}

      {/* Spotlight overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: spotlightBg,
          animation: "spotlightMove 8s linear infinite",
        }}
      />
    </Box>
  );
};

export default GallerySlideshow;
