import { CommentOutlined } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import React from "react";
import { Artwork } from "../../types/IObjectTypes";
import { LikeButton } from "../LikeButton";
import ArtworkCarousel from "./ArtworkCarousel";

const { Text } = Typography;

const ArtworkCard: React.FC<{
  artwork: Artwork;
  onClick: () => void;
  onLikeChange: (id: string, liked: boolean, newCount: number) => void;
}> = ({ artwork, onClick, onLikeChange }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.2s ease-in-out",
        padding: 0,
      }}
    >
      <ArtworkCarousel imageUrls={artwork.imageUrls} price={artwork.price} />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
            {artwork.title}
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LikeButton
              artworkId={artwork.id}
              initialCount={artwork.likes}
              initialLiked={artwork.liked}
              onLikeChange={(liked, newCount) =>
                onLikeChange(artwork.id, liked, newCount)
              }
            />
            <CommentOutlined style={{ marginLeft: 16, fontSize: 18 }} />
            <Text style={{ marginLeft: 4, color: "#888" }}>
              {artwork.commentCount}
            </Text>
          </div>
        </div>
        <p style={{ color: "#888", margin: "4px 0 12px" }}>
          {artwork.artist.fullName}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {artwork.categories.map((category) => (
            <Tag color="blue" key={category}>
              {category}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ArtworkCard;
