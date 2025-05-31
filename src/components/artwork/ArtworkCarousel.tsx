// ArtworkCarousel.tsx
import React, { useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../../styles/ArtworkCarousel.css"; // Assuming you have some CSS for styling
import PriceTag from "../PriceTag";

interface ArtworkCarouselProps {
  imageUrls: string[];
  price: number;
}

const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({
  imageUrls,
  price,
}) => {
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
              height: "400px",
              backgroundColor: "#f0f0f0",
              position: "relative", // ✅ Needed for PriceTag to position correctly
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Image wrapper */}
            <div
              style={{
                height: "100%",
                width: "100%",
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
              {/* ✅ Price Tag inside the image wrapper */}
              <PriceTag price={price} visible={true} />
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
