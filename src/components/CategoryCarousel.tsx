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

  // Determine how many slides to show based on category count
  const effectiveSlidesToShow = Math.min(
    Math.max(1, categories.length),
    slidesToShow
  );

  // Show carousel controls only if there are more categories than can be displayed
  const showControls = categories.length > effectiveSlidesToShow;

  return (
    <div className="carousel-wrapper">
      {showControls && (
        <button className="arrowc leftc" onClick={prev}>
          <LeftOutlined />
        </button>
      )}
      <Carousel
        dots={false}
        infinite={categories.length > 1}
        autoplaySpeed={5000}
        slidesToShow={effectiveSlidesToShow}
        slidesToScroll={1}
        autoplay={categories.length > 1}
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
      {showControls && (
        <button className="arrowc rightc" onClick={next}>
          <RightOutlined />
        </button>
      )}
    </div>
  );
};

export default CategoryCarousel;
