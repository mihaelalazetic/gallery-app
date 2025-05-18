import {
  CloseOutlined,
  CommentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Divider, Drawer, Image, Input, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { createComment, getComments, getArtwork } from "../api/artworkServices";
import { CommentDto } from "../types/IObjectTypes";
import CommentsThread from "./CommentsThread";
import { LikeButton } from "./LikeButton";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ImagePreviewDrawerProps {
  id: string; // UUID now
  visible: boolean;
  onClose(): void;
  darkMode: boolean;
}

const ImagePreviewDrawer: React.FC<ImagePreviewDrawerProps> = ({
  id,
  visible,
  onClose,
  darkMode,
}) => {
  const [art, setArt] = useState<any>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newText, setNewText] = useState("");
  const [posting, setPosting] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && visible) {
      getArtwork(id).then((response) => {
        setArt(response);
        getComments(id).then(setComments);
        setNewText("");
      });
    }
  }, [id, visible]);

  const scrollToComments = () => {
    if (!commentsRef.current) return;
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 400);
  };

  const handleAdd = async () => {
    if (!art || !newText.trim()) return;
    setPosting(true);
    try {
      await createComment(art.id, newText.trim());
      setNewText("");
      const updated = await getComments(art.id);
      setComments(updated);
      scrollToComments();
    } finally {
      setPosting(false);
    }
  };

  if (!art) return null;

  return (
    <Drawer
      placement="right"
      width={window.innerWidth < 768 ? "100%" : "50%"}
      onClose={onClose}
      visible={visible}
      style={{ background: darkMode ? "#1f1f2e" : undefined }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        height: "100%",
        background: darkMode ? "#1f1f2e" : undefined,
        color: darkMode ? "#fff" : undefined,
      }}
      closeIcon={
        <CloseOutlined style={{ color: darkMode ? "#fff" : undefined }} />
      }
    >
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Image
            src={art.imageUrl}
            alt={art.title}
            style={{
              maxWidth: "100%",
              maxHeight: "50vh",
              objectFit: "contain",
            }}
          />
        </div>
        <Title level={4} style={{ margin: 0 }}>
          {art.title}
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          By {art.artist.fullName}
        </Text>
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          {art.dimensions} • {art.price} EUR
        </Text>

        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <LikeButton
            artworkId={art.id}
            initialCount={art.likes}
            initialLiked={art.liked}
          />
          <CommentOutlined
            onClick={scrollToComments}
            style={{
              fontSize: 18,
              marginLeft: 24,
              color: "#40a9ff",
              cursor: "pointer",
            }}
          />
          <Text style={{ marginLeft: 8, color: darkMode ? "#eee" : "#555" }}>
            {comments.length}
          </Text>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        <div
          ref={commentsRef}
          className={isJumping ? "comments--jump" : ""}
          style={{
            scrollMarginTop: 80,
            willChange: "transform",
          }}
        >
          <CommentsThread comments={comments} />
        </div>
      </div>

      <div
        style={{
          padding: 12,
          borderTop: darkMode ? "1px solid #444" : "1px solid #f0f0f0",
          background: darkMode ? "#1f1f2e" : "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <TextArea
            placeholder="Write a comment…"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<SendOutlined />}
            onClick={handleAdd}
            loading={posting}
            disabled={!newText.trim()}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ImagePreviewDrawer;
