// src/components/FeaturedArtCard.tsx

import { CommentOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import "../../styles/FeaturedArtCard.css"; // Assuming you have some CSS for styling
import ArtImageOverlay from "../artwork/ArtImageOverlay";
import FrameContainer from "../artwork/FrameContainer";
import { LikeButton } from "../LikeButton";
import PictureFrame2 from "../PictureFrame2";

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
    <div style={{ paddingTop: "3rem" }}>
      <PictureFrame2
        children={
          <div style={{ cursor: "pointer" }} onClick={onClick}>
            <FrameContainer padding="0" boxShadow="none">
              <ArtImageOverlay overlayContent={overlay}>
                {/* here you can swap in <img> or a custom <SmartImage> */}
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  style={{
                    width: "100%",
                    // height: "40vh",
                    display: "block",
                    objectFit: "cover",
                    // borderRadius: "1rem",
                  }}
                />
              </ArtImageOverlay>
            </FrameContainer>
          </div>
        }
      />
    </div>
  );
};

export default FeaturedArtCard;
export type { ArtworkWithLike };
