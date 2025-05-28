import React from "react";
import "../styles/CategoryCard.css";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  imageUrl,
  name,
  description,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/explore?category=${encodeURIComponent(id)}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
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
