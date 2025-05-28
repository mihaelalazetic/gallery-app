import React, { useEffect, useRef } from "react";
import { Carousel } from "antd";
import CategoryCard from "./CategoryCard";
import "../styles/CategoryCarousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getCategories } from "../api/featured";

const CategoryCarousel: React.FC = () => {
  const [categories, setCategories] = React.useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={prev}>
        <LeftOutlined />
      </button>
      <Carousel
        dots={false}
        infinite
        autoplaySpeed={5000}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
        ref={carouselRef}
        className="carousel"
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            id={category.id}
            imageUrl={category.imageUrl}
            name={category.name}
            description={category.description}
          />
        ))}
      </Carousel>
      <button className="arrow right" onClick={next}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default CategoryCarousel;
