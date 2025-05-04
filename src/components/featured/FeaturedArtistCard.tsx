import React from "react";
import "../../styles/FeaturedArtistCard.css";
import { Avatar } from "antd";
import { useThemeToggle } from "../../providers/AppThemeProvider";
import {
  StarFilled,
  HeartFilled,
  TeamOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Artist } from "../../types/IObjectTypes";

interface FeaturedArtistCardProps {
  artist: Artist;
}

const FeaturedArtistCard: React.FC<FeaturedArtistCardProps> = ({ artist }) => {
  const { darkMode } = useThemeToggle();

  return (
    <div className={`featured-artist-grid ${darkMode ? "dark" : ""}`}>
      <div className="artist-info-column">
        <h4 className="subtitle">
          <StarFilled style={{ color: "#fadb14", marginRight: 8 }} />
          Featured Artist
        </h4>
        <h2>
          <Avatar src={artist.profilePictureUrl} size="large" />{" "}
          {artist.fullName}
        </h2>
        <p>{artist.bio}</p>

        <div className="artist-stats">
          <span>
            <HeartFilled style={{ color: "#eb2f96", marginRight: 6 }} />
            {artist.totalLikes}
          </span>
          <span>
            <TeamOutlined style={{ color: "#9254de", marginRight: 6 }} />
            {artist.followerCount}
          </span>
          <span>
            <PictureOutlined style={{ color: "#69c0ff", marginRight: 6 }} />
            {artist.artCount}
          </span>
        </div>

        <a href="#" className="learn-more">
          Learn more
        </a>
      </div>

      <div className="art-collage-zone">
        {[0, 1, 2, 3].map(
          (i) =>
            artist.artworks[i] && (
              <div
                key={i}
                className={`art-block g-art-${i}`}
                style={{ backgroundImage: `url(${artist.artworks[i].imageUrl})` }}
              />
            )
        )}
      </div>
    </div>
  );
};

export default FeaturedArtistCard;
