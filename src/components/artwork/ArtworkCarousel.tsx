// src/components/ArtworkCarousel.tsx

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";
import React, { useRef } from "react";
import "../../styles/ArtworkCarousel.css";
import PriceTag from "../PriceTag";

interface ArtworkCarouselProps {
  imageUrls: string[];
  price?: number;
  preview?: boolean; // Optional prop to make the carousel clickable
}

const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({
  imageUrls,
  price,
  preview,
}) => {
  const carouselRef = useRef<any>(null);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    carouselRef.current?.next();
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    carouselRef.current?.prev();
  };

  return (
    <div
      className="carousel-wrapper"
      style={{ position: "relative", textAlign: "center", padding: 16 }}
    >
      {/* Price tag overlay (hidden by default; shown on hover) */}
      <div className="price-tag">
        <PriceTag visible={!!price} price={price ?? 0} />
      </div>

      {/* ← Previous button */}
      <button
        className="arrow left"
        onClick={prev}
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <LeftOutlined />
      </button>

      {/* Next button → */}
      <button
        className="arrow right"
        onClick={next}
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <RightOutlined />
      </button>

      {/* The actual carousel slides */}
      <Carousel ref={carouselRef} dots={true}>
        {imageUrls.map((url: string, index: number) => (
          <div key={index}>
            <Image
              src={url}
              alt={`Artwork ${index + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "50vh",
                objectFit: "contain",
                margin: "0 auto",
              }}
              preview={preview}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArtworkCarousel;
