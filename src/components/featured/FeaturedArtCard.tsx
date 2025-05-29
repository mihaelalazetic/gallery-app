import { Badge, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../../styles/FeaturedArtCard.css";
import ArtImageOverlay from "../artwork/ArtImageOverlay";
import FrameContainer from "../artwork/FrameContainer";
import { LikeButton } from "../LikeButton";
import PictureFrame2 from "../PictureFrame2";
import PriceTag from "../PriceTag";

interface ArtworkWithLike {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  liked: boolean;
  comments: number;
  price?: number;
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
  const [hovered, setHovered] = useState(false);

  const overlay = (
    <>
      <strong style={{ fontSize: 16, marginBottom: 8 }}>{art.title}</strong>
      <em style={{ marginBottom: 12, display: "block" }}>
        By {art.artist.fullName}
      </em>
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

  const content = (
    <div
      style={{ cursor: "pointer" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FrameContainer padding="0" boxShadow="none">
        <ArtImageOverlay overlayContent={overlay}>
          <img
            src={art.imageUrl}
            alt={art.title}
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </ArtImageOverlay>
      </FrameContainer>
    </div>
  );

  return (
    <div style={{ paddingTop: "3rem", position: "relative" }}>
      <PictureFrame2>
        <div style={{ position: "relative" }}>
          {/* Smooth transition wrapper */}
          <PriceTag price={art.price ?? 0} visible={hovered && !!art.price} />

          {/* Main image and overlay */}
          {content}
        </div>
      </PictureFrame2>
    </div>
  );
};

export default FeaturedArtCard;
export type { ArtworkWithLike };
