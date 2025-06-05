import {
  HeartFilled,
  PictureOutlined,
  StarFilled,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleFollow } from "../../api/artists";
import { useThemeToggle } from "../../providers/AppThemeProvider";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext
import "../../styles/FeaturedArtistCard.css";
import { Artist } from "../../types/IObjectTypes";

interface FeaturedArtistCardProps {
  artist: Artist;
}

const FeaturedArtistCard: React.FC<FeaturedArtistCardProps> = ({ artist }) => {
  const { darkMode } = useThemeToggle();
  const { user } = useAuth(); // Check if the user is logged in
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const [followerCounts, setFollowerCounts] = useState<Record<string, number>>(
    {}
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false); // State for the login popup
  const navigate = useNavigate();

  const onToggleFollow = async (artistId: string) => {
    if (!user) {
      // If the user is not logged in, show the login popup
      setIsLoginPopupVisible(true);
      return;
    }

    // Handle follow/unfollow logic
    const newCount = await toggleFollow(artistId);
    setFollowingMap((m) => ({ ...m, [artistId]: !m[artistId] }));
    setFollowerCounts((m) => ({ ...m, [artistId]: newCount }));
  };

  useEffect(() => {
    setFollowingMap({ [artist.id]: artist.isFollowing });
    setFollowerCounts({ [artist.id]: artist.followerCount }); // <-- Add this line
  }, [artist.id, artist.isFollowing, artist.followerCount]);

  return (
    <div className={`featured-artist-grid ${darkMode ? "dark" : ""}`}>
      <div className="artist-info-column">
        <h4 className="subtitle">
          <StarFilled style={{ color: "#fadb14", marginRight: 8 }} />
          Featured Artist
        </h4>
        <h2
          onClick={() => navigate("/profile/" + artist?.slug)}
          style={{ cursor: "pointer" }}
        >
          <Avatar src={artist.profilePictureUrl} size="large" />{" "}
          {artist.fullName}
        </h2>
        <p>
          {isExpanded || artist.bio.length <= 150
            ? artist.bio
            : `${artist.bio.slice(0, 150)}...`}
          {artist.bio.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: "none",
                border: "none",
                color: "#1890ff",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="artist-stats">
          <span>
            <HeartFilled style={{ color: "#eb2f96", marginRight: 6 }} />
            {artist.totalLikes}
          </span>
          <span>
            <TeamOutlined style={{ color: "#9254de", marginRight: 6 }} />
            {followerCounts[artist.id] ?? artist.followerCount}
          </span>

          <span>
            <PictureOutlined style={{ color: "#69c0ff", marginRight: 6 }} />
            {artist.artCount}
          </span>
        </div>

        <Button
          block
          type={followingMap[artist.id] ? "default" : "primary"}
          danger={followingMap[artist.id]}
          icon={
            followingMap[artist.id] ? (
              <UserDeleteOutlined />
            ) : (
              <UserAddOutlined />
            )
          }
          style={{ borderRadius: 24 }}
          onClick={() => onToggleFollow(artist.id)}
        >
          {followingMap[artist.id] ? "Unfollow" : "Follow"}
        </Button>
      </div>

      <div className="art-collage-zone">
        {[0, 1, 2, 3].map(
          (i) =>
            artist.artworks[i] && (
              <div
                key={i}
                className={`art-block g-art-${i}`}
                style={{
                  backgroundImage: `url(${artist.artworks[i].imageUrls[0]})`,
                }}
              />
            )
        )}
      </div>

      {/* Fun Login Popup */}
      <Modal
        visible={isLoginPopupVisible}
        onCancel={() => setIsLoginPopupVisible(false)}
        footer={null}
        centered
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2 style={{ color: "#1890ff" }}>🎉 Join the Fun! 🎉</h2>
          <p style={{ fontSize: "16px", marginBottom: "20px" }}>
            Log in or create a profile to follow your favorite artists!
          </p>
          <button
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() => {
              console.log("Redirecting to login...");
              navigate("/login");
              setIsLoginPopupVisible(false);
            }}
          >
            Log In
          </button>
          <button
            style={{
              backgroundColor: "#52c41a",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log("Redirecting to sign-up...");
              setIsLoginPopupVisible(false);
            }}
          >
            Create Profile
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FeaturedArtistCard;
