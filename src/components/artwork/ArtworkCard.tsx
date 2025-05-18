import React from "react";
import { Card, Tag, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { Artwork } from "../../types/IObjectTypes";
import { LikeButton } from "../LikeButton";

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
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        padding: 0,
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          alt={artwork.title}
          src={artwork.imageUrl}
          style={{
            width: "100%",
            // height: "300px",
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
          }}
        />
        {/* Bottom-right corner for the price */}
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
          {artwork.price} €
        </div>
      </div>

      <div style={{ padding: "16px" }}>
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
