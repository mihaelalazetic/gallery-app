import {
  CloseOutlined,
  CommentOutlined,
  LinkOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Input,
  Modal,
  Tooltip,
  Typography,
} from "antd";
import { formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createComment, getArtwork, getComments } from "../api/artworkServices";
import { useAuth } from "../context/AuthContext";
import { CommentDto } from "../types/IObjectTypes";
import ArtworkCarousel from "./artwork/ArtworkCarousel";
import CommentsThread from "./CommentsThread";
import { LikeButton } from "./LikeButton";
import PriceTag from "./PriceTag";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ImagePreviewDrawerProps {
  id: string; // Artwork UUID
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
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const commentsRef = useRef<HTMLDivElement>(null);
  // const carouselRef = useRef<any>(null);

  // Replace this with your real authentication logic:
  const user = useAuth();
  // Fetch artwork + comments whenever the drawer becomes visible or the id changes
  useEffect(() => {
    if (id && visible) {
      getArtwork(id).then((response) => {
        setArt(response);
        getComments(id).then(setComments);
        setNewText("");
      });
    }
  }, [id, visible]);

  // Scroll down to the comments section and highlight briefly
  const scrollToComments = () => {
    if (!commentsRef.current) return;
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 400);
  };

  // Add a new comment, refresh the list, and scroll to it
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

  const handleOpenModal = () => {
    setIsModalVisible(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  if (!art) {
    return null; // Still loading
  }

  // Compute “time ago” from the artwork’s createdAt
  let postedAgo = "";
  let fullDateTime = "";
  if (art.createdAt) {
    const parsed = new Date(art.createdAt);
    if (!isNaN(parsed.getTime())) {
      postedAgo = formatDistanceToNow(parsed, { addSuffix: true });
      fullDateTime = dayjs(parsed).format("DD MMM YYYY HH:mm"); // Get the full date and time
    }
  }

  return (
    <Drawer
      placement="right"
      width={window.innerWidth < 768 ? "100%" : "80%"}
      onClose={onClose}
      open={visible}
      closeIcon={
        <CloseOutlined style={{ color: darkMode ? "#fff" : undefined }} />
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        height: "100%",
        background: darkMode ? "#1f1f2e" : "#fff",
        color: darkMode ? "#fff" : undefined,
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar
              src={art.artist.profilePictureUrl}
              alt={art.artist.fullName}
              style={{ width: 40, height: 40, cursor: "pointer" }}
            />

            <div>
              <Title
                level={5}
                style={{ margin: 0, color: darkMode ? "#fff" : undefined }}
              >
                <Link
                  to={`/profile/${art.artist.slug}`}
                  style={{ color: darkMode ? "#ccc" : "black" }}
                >
                  {art.artist.fullName}
                </Link>
              </Title>
              {postedAgo && (
                <Tooltip title={fullDateTime}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 12,
                      color: darkMode ? "#aaa" : "#888",
                    }}
                  >
                    {postedAgo}
                  </Text>
                </Tooltip>
              )}
            </div>
          </div>

          {art.price && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <PriceTag price={art.price} visible={true} />
              <Title
                level={5}
                style={{
                  margin: 0,
                  // marginRight: "3.5rem",
                  color: darkMode ? "#fff" : undefined,
                }}
              >
                {art.title}
              </Title>
              <Tooltip title="Relevant links">
                <Button
                  style={{
                    borderRadius: "50%",
                    border: "1px solid",
                    padding: "4px",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  type="link"
                  size="small"
                  onClick={handleOpenModal} // Open the modal on click
                >
                  <LinkOutlined style={{ fontSize: "16px" }} />
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      }
    >
      {/* ─── HEADER: Artist Avatar, Name, “Time Ago” ───────────────────────────────────── */}

      {/* ─── MAIN CONTENT ───────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* ─── LEFT: IMAGE CAROUSEL ─────────────────────────────────────────────────────────── */}
        <div
          style={{
            /* never grow or shrink, always exactly 60% of the drawer */
            flex: "0 0 60%",
            maxWidth: "60%",

            /* clip any child that sticks out */
            overflow: "hidden",

            position: "relative",
            background: darkMode ? "#000" : "#f9f9f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ← PREV BUTTON → */}
          {/* <button
            onClick={() => carouselRef.current?.prev()}
            style={{
              position: "absolute",
              top: "50%",
              left: 16,
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
          </button> */}

          {/* → NEXT BUTTON → */}
          {/* <button
            onClick={() => carouselRef.current?.next()}
            style={{
              position: "absolute",
              top: "50%",
              right: 16,
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
          </button> */}

          <ArtworkCarousel imageUrls={art.imageUrls} preview />
        </div>

        {/* ─── RIGHT: COMMENTS + BOTTOM PINS ───────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* 1) COMMENTS THREAD (scrollable, fills remaining) */}
          <div
            ref={commentsRef}
            className={isJumping ? "comments--jump" : ""}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 24px",
              scrollMarginTop: 80,
            }}
          >
            <CommentsThread comments={comments} />
          </div>

          {/* ──────────────────────────────────────────────────────────────────────────────── */}
          {/* 2-5) EVERYTHING BELOW COMMENTS—PINNED TO BOTTOM */}
          <div style={{ flexShrink: 0 }}>
            {/* 2) Likes + Comment‐count row */}
            {art.description && (
              <div
                style={{
                  padding: "12px 24px",
                  background: darkMode ? "#1f1f2e" : "#fff",
                  borderTop: darkMode ? "1px solid #444" : "1px solid #f0f0f0",
                }}
              >
                <Text
                  style={{ fontSize: 14, color: darkMode ? "#eee" : "#333" }}
                >
                  {art.description}
                </Text>
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                borderTop: darkMode ? "1px solid #444" : "1px solid #f0f0f0",
                background: darkMode ? "#1f1f2e" : "#fff",
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
                <Text style={{ marginLeft: 4, fontSize: 14 }}>
                  {comments.length}
                </Text>
              </div>
            </div>

            {/* 3) Description */}

            {/* 4) “Add a comment” OR “Log in to add a comment” */}
            <div
              style={{
                padding: "12px 24px",
                borderTop: darkMode ? "1px solid #444" : "1px solid #f0f0f0",
                background: darkMode ? "#1f1f2e" : "#fff",
              }}
            >
              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <TextArea
                    placeholder="Write a comment…"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAdd();
                      }
                    }}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    style={{
                      flex: 1,
                      background: darkMode ? "#2a2a3d" : "#fafafa",
                      color: darkMode ? "#fff" : "#000",
                    }}
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
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: darkMode ? "#aaa" : "#666",
                  }}
                >
                  <Link to="/login">Log in to add a comment</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for displaying relevant links */}
      <Modal
        title="Relevant Links"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        bodyStyle={{
          background: darkMode ? "#1f1f2e" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {art.links && art.links.length > 0 ? (
          <ul>
            {art.links.map((link: string, index: number) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: darkMode ? "#40a9ff" : "#1890ff" }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Text>No relevant links available for this artwork.</Text>
        )}
      </Modal>
    </Drawer>
  );
};

export default ImagePreviewDrawer;
