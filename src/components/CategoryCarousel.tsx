import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import React, { useEffect, useRef } from "react";
import { getCategories } from "../api/featured";
import "../styles/CategoryCarousel.css";
import CategoryCard from "./CategoryCard";

interface CategoryCarouselProps {
  slidesToShow: number;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  slidesToShow,
}) => {
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
      <button className="arrowc leftc" onClick={prev}>
        <LeftOutlined />
      </button>
      <Carousel
        dots={false}
        infinite
        autoplaySpeed={5000}
        slidesToShow={slidesToShow}
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
      <button className="arrowc rightc" onClick={next}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default CategoryCarousel;
