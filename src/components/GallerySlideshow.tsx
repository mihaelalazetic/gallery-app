import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PictureFrame from "./PictureFrame";

type Props = {
  images: string[];
};

export const GallerySlideshow = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "45rem",
        overflow: "hidden",
        position: "relative",
        height: "500px",
        margin: "auto",
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
              left: "50%",
              transform: `translateX(${position * 120}%) scale(${
                idx === currentIndex ? 1 : 0.75
              })`,
              opacity: idx === currentIndex ? 1 : 0,
              transition: "transform 1.5s ease, opacity 1.5s ease",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PictureFrame src={img} alt={`Art ${idx + 1}`} />
          </Box>
        );
      })}
    </Box>
  );
};
