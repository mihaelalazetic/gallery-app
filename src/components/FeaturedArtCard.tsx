// src/components/FeaturedArtCard.tsx

import React from "react";
import { Card, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import PictureFrame from "./PictureFrame";
import { LikeButton } from "./LikeButton";
interface ArtworkWithLike {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  liked: boolean;
  comments: number;
  artist: {
    fullName: string;
  };
}

const { Text } = Typography;

interface FeaturedArtCardProps {
  art: ArtworkWithLike;
  darkMode: boolean;
  onClick?(): void;
  onLikeChange: (id: string, liked: boolean, newCount: number) => void;
}

const FeaturedArtCard: React.FC<FeaturedArtCardProps> = ({
  art,
  darkMode,
  onClick,
  onLikeChange,
}) => (
  <Card
    hoverable
    cover={<PictureFrame src={art.imageUrl} alt={art.title} />}
    // className="featured-art-card"
    style={{
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Card.Meta
      title={
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <strong style={{ fontSize: 18 }}>{art.title}</strong>
          <div style={{ flex: 1 }} />
          <LikeButton
            artworkId={art.id}
            initialCount={art.likes}
            initialLiked={art.liked}
            onLikeChange={(liked, newCount) =>
              onLikeChange(art.id, liked, newCount)
            }
          />
          <CommentOutlined
            style={{ color: "#40a9ff", fontSize: 18, marginLeft: 16 }}
          />
          <Text style={{ color: darkMode ? "#eee" : "#555", marginLeft: 4 }}>
            {art.comments}
          </Text>
        </div>
      }
      description={<em>By {art.artist.fullName}</em>}
    />
  </Card>
);

export default FeaturedArtCard;
export type { ArtworkWithLike };
