import React from "react";
import { Card } from "antd";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  dimensions: string;
  imageUrl: string;
}

const ArtworkCard: React.FC<{ artwork: Artwork; onClick: () => void }> = ({
  artwork,
  onClick,
}) => {
  return (
    <Card
      hoverable
      cover={<img alt={artwork.title} src={artwork.imageUrl} />}
      onClick={onClick}
      style={{ background: "none" , border: "none", padding: 0 }}
    >
      <Card.Meta
        title={artwork.title}
        description={`${artwork.artist} • ${artwork.dimensions} • ${artwork.price}`}
      />
    </Card>
  );
};

export default ArtworkCard;
