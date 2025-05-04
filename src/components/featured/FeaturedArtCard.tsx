// src/components/FeaturedArtCard.tsx

import { CommentOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React from "react";
import { LikeButton } from "../LikeButton";
import ArtImageOverlay from "../artwork/ArtImageOverlay";
import FrameContainer from "../artwork/FrameContainer";
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
  onClick,
  onLikeChange,
}) => {
  const overlay = (
    <>
      <strong style={{ fontSize: 16, marginBottom: 8 }}>{art.title}</strong>
      <em style={{ marginBottom: 12 }}>By {art.artist.fullName}</em>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LikeButton
          artworkId={art.id}
          initialCount={art.likes}
          initialLiked={art.liked}
          onLikeChange={(liked, newCount) =>
            onLikeChange(art.id, liked, newCount)
          }
        />
        <CommentOutlined style={{ marginLeft: 16, fontSize: 18 }} />
        <Text style={{ marginLeft: 4, color: "white" }}>{art.comments}</Text>
      </div>
    </>
  );

  return (
    <Card
      hoverable
      bordered={false}
      bodyStyle={{
        padding: 0,
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={onClick}
    >
      <FrameContainer padding="0" boxShadow="none">
        <ArtImageOverlay overlayContent={overlay}>
          {/* here you can swap in <img> or a custom <SmartImage> */}
          <img
            src={art.imageUrl}
            alt={art.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "1rem",
            }}
          />
        </ArtImageOverlay>
      </FrameContainer>
    </Card>
  );
};

export default FeaturedArtCard;
export type { ArtworkWithLike };
