// src/components/FeaturedArtists.tsx

import {
  HeartFilled,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Carousel, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  getFollowerCount,
  getFollowingStatus,
  toggleFollow,
} from "../api/artists";
import { getMostLikedArtists } from "../api/usersService";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Title, Paragraph, Text } = Typography;

export interface FeaturedArtist {
  id: string;
  fullName: string;
  profilePictureUrl: string;
  followerCount: number;
  rating: number;
  artCount: number;
  totalLikes: number;
  bio: string;
}

const FeaturedArtists: React.FC = () => {
  const { darkMode } = useThemeToggle();
  const [artists, setArtists] = useState<FeaturedArtist[]>([]);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const [followerCounts, setFollowerCounts] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    getMostLikedArtists().then(async (data) => {
      setArtists(data);
      const statuses: boolean[] = await Promise.all(
        data.map((a: FeaturedArtist) => getFollowingStatus(a.id))
      );
      const counts: number[] = await Promise.all(
        data.map((a: FeaturedArtist) => getFollowerCount(a.id))
      );

      setFollowingMap(
        Object.fromEntries(
          data.map((a: FeaturedArtist, i: number): [string, boolean] => [
            a.id,
            statuses[i],
          ])
        )
      );
      setFollowerCounts(
        Object.fromEntries(
          data.map((a: FeaturedArtist, i: number): [string, number] => [
            a.id,
            counts[i],
          ])
        )
      );
    });
  }, []);

  const onToggleFollow = async (artistId: string) => {
    const newCount = await toggleFollow(artistId);
    setFollowingMap((m) => ({ ...m, [artistId]: !m[artistId] }));
    setFollowerCounts((m) => ({ ...m, [artistId]: newCount }));
  };

  // a little gradient for our avatar border
  const avatarBorder = darkMode
    ? "linear-gradient(135deg, #722ed1, #9254de) 1"
    : "linear-gradient(135deg, #ff9f1c, #ffbf69) 1";

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <Title
        level={2}
        style={{ color: darkMode ? "#fff" : "#1c1c1e", marginBottom: 24 }}
      >
        Featured Artists
      </Title>

      <Carousel
        dots={false}
        autoplay
        autoplaySpeed={6000}
        speed={800}
        slidesToShow={3}
        swipeToSlide
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } },
        ]}
      >
        {artists.map((artist) => (
          <div key={artist.id} style={{ padding: "0 8px" }}>
            <Card
              hoverable
              style={{
                background: darkMode ? "#2a2a3b" : "#fff",
                borderRadius: 12,
                textAlign: "center",
                padding: "2rem 1rem 1rem",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(0,0,0,0.5)"
                  : "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
              }}
              bodyStyle={{ padding: 0 }}
            >
              {/* Avatar with gradient ring */}
              <Badge
                count={`${artist.artCount} ${
                  artist.artCount === 1 ? " artwork" : " artworks"
                }`}
                style={{
                  backgroundColor: darkMode ? "#722ed1" : "#9254de",
                  boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
                }}
              >
                <Avatar
                  size={100}
                  src={artist.profilePictureUrl}
                  icon={<TeamOutlined />}
                />
              </Badge>

              {/* Name */}
              <Title
                level={4}
                style={{
                  marginTop: 12,
                  marginBottom: 8,
                  color: darkMode ? "#fff" : "#000",
                  fontFamily: `"Montserrat", sans-serif`,
                  letterSpacing: "0.05em",
                }}
              >
                {artist.fullName}
              </Title>

              {/* “Bio” in quotes */}
              <Paragraph
                italic
                style={{
                  fontStyle: "italic",
                  color: darkMode ? "#ccc" : "#666",
                  margin: "0 1rem 16px",
                }}
              >
                “{artist.bio}”
              </Paragraph>

              {/* Stats */}
              <Space
                size="large"
                style={{ marginBottom: 16, justifyContent: "center" }}
              >
                <Space>
                  <HeartFilled style={{ color: "#eb2f96", fontSize: 18 }} />
                  <Text style={{ color: darkMode ? "#eee" : "#555" }}>
                    {artist.totalLikes.toLocaleString()}
                  </Text>
                </Space>
                <Space>
                  <TeamOutlined style={{ color: "#9254de", fontSize: 18 }} />
                  <Text style={{ color: darkMode ? "#eee" : "#555" }}>
                    {(
                      followerCounts[artist.id] ?? artist.followerCount
                    ).toLocaleString()}
                  </Text>
                </Space>
              </Space>

              {/* Follow / Unfollow */}
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
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedArtists;
