// ArtworkCarousel.tsx
import React, { useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../../styles/ArtworkCarousel.css"; // Assuming you have some CSS for styling


interface ArtworkCarouselProps {
  imageUrls: string[];
  price: number;
}

const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({ imageUrls, price }) => {
  const carouselRef = useRef<any>(null);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    carouselRef.current.next();
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    carouselRef.current.prev();
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={prev}>
        <LeftOutlined />
      </button>
      <Carousel arrows={false} draggable ref={carouselRef}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              backgroundColor: "#f0f0f0",
              position: "relative",
            }}
          >
            <img
              alt={`Artwork ${index + 1}`}
              src={url}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
            {/* Price Tag */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#ffffff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {price} €
            </div>
          </div>
        ))}
      </Carousel>
      <button className="arrow right" onClick={next}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default ArtworkCarousel;
