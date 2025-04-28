// src/components/LikeButton.tsx
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { likeArtwork } from "../api/artworkServices";

export interface LikeButtonProps {
  artworkId: string;
  initialCount: number;
  initialLiked: boolean;
  onLikeChange?: (liked: boolean, newCount: number) => void; // <-- new
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  artworkId,
  initialCount,
  initialLiked,
  onLikeChange,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !liked;
    const delta = next ? +1 : -1;
    setLiked(next);
    setCount((c) => c + delta);

    try {
      // this toggles on the server, returns new total count
      const serverCount = await likeArtwork(artworkId);
      setCount(serverCount);
      setLiked(next);
      onLikeChange?.(next, serverCount); // <-- notify parent
    } catch {
      // rollback
      setLiked(liked);
      setCount(initialCount);
    }
  };

  return (
    <span
      onClick={handleClick}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {liked ? (
        <HeartFilled style={{ color: "#eb2f96", fontSize: 18 }} />
      ) : (
        <HeartOutlined style={{ color: "#eb2f96", fontSize: 18 }} />
      )}
      <span style={{ marginLeft: 4 }}>{count}</span>
    </span>
  );
};
