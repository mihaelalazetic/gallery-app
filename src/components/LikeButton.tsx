// src/components/LikeButton.tsx

import { useState } from "react";
import { likeArtwork } from "../api/artworkServices";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface LikeButtonProps {
  artworkId: string;
  initialLiked: boolean;
  initialCount: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  artworkId,
  initialCount,
  initialLiked,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // toggle
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    try {
      await likeArtwork(artworkId); // POST /api/likes/like or unlike
    } catch {
      // rollback on error
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
