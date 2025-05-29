import {
  CloseOutlined,
  CommentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Drawer, Image, Input, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { createComment, getArtwork, getComments } from "../api/artworkServices";
import { CommentDto } from "../types/IObjectTypes";
import CommentsThread from "./CommentsThread";
import { LikeButton } from "./LikeButton";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PriceTag from "./PriceTag";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ImagePreviewDrawerProps {
  id: string; // UUID now
  visible: boolean;
  onClose(): void;
  darkMode: boolean;
} // ... same imports as before
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

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
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image
              src={art.artist.profilePictureUrl}
              alt={art.artist.fullName}
              width={32}
              height={32}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              preview={false}
            />
            <div>
              <Title
                level={5}
                style={{ margin: 0, color: darkMode ? "#fff" : undefined }}
              >
                {art.title}
              </Title>
              <Text type="secondary">
                <Link
                  to={`/profile/${art.artist.slug}`}
                  style={{ color: darkMode ? "#ccc" : "gray" }}
                >
                  {art.artist.fullName}
                </Link>
              </Text>
            </div>
          </div>

          {art.price && <PriceTag price={art.price} visible={true} />}
        </div>
      }
      placement="right"
      width={window.innerWidth < 768 ? "100%" : "60%"}
      onClose={onClose}
      visible={visible}
      style={{ background: darkMode ? "#1f1f2e" : undefined }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        height: "100%",
        background: darkMode ? "#1f1f2e" : "#fff",
        color: darkMode ? "#fff" : undefined,
      }}
      closeIcon={
        <CloseOutlined style={{ color: darkMode ? "#fff" : undefined }} />
      }
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Carousel Section */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {/* --- Carousel Section --- */}
          <div
            style={{ position: "relative", textAlign: "center", padding: 16 }}
          >
            <button
              className="arrow left"
              onClick={prev}
              style={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <LeftOutlined />
            </button>
            <button
              className="arrow right"
              onClick={next}
              style={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <RightOutlined />
            </button>

            <Carousel ref={carouselRef} dots={true}>
              {art.imageUrls.map((url: string, index: number) => (
                <div key={index}>
                  <Image
                    src={url}
                    alt={art.title}
                    preview={true}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "50vh",
                      objectFit: "contain",
                      display: "block",
                      margin: "0 auto",
                      justifyContent: "center",
                      alignContent: "middle",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 24px 16px",
            }}
          >
            {art?.description}
          </div>
          {/* Likes and Comments */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 24px 16px",
            }}
          >
            <LikeButton
              artworkId={art.id}
              initialCount={art.likes}
              initialLiked={art.liked}
            />
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={scrollToComments}
            >
              <CommentOutlined style={{ fontSize: 18, color: "#40a9ff" }} />
              <Text style={{ marginLeft: 4 }}>{comments.length}</Text>
            </div>
          </div>
        </div>

        {/* Comments Scrollable Section */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 24px",
          }}
        >
          <div
            ref={commentsRef}
            className={isJumping ? "comments--jump" : ""}
            style={{ scrollMarginTop: 80 }}
          >
            <CommentsThread comments={comments} />
          </div>
        </div>

        {/* Comment Input */}
        <div
          style={{
            padding: 12,
            borderTop: darkMode ? "1px solid #444" : "1px solid #f0f0f0",
            background: darkMode ? "#1f1f2e" : "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
      </div>
    </Drawer>
  );
};

export default ImagePreviewDrawer;
