import React from "react";
import "../styles/CategoryCard.css";

interface CategoryCardProps {
  imageUrl: string;
  name: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  name,
  description,
}) => {
  return (
    <div className="category-card">
      <div
        className="category-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="overlay">
        <h2>{name}</h2>
        <p>{description}</p>
        <button className="explore-button">Explore</button>
      </div>
    </div>
  );
};

export default CategoryCard;
