import {
  HeartFilled,
  PictureOutlined,
  TeamOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Input,
  Layout,
  Row,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toggleFollow } from "../api/artists";
import { currentUserArtworks } from "../api/artworkServices";
import { uploadProfilePictureToSupabase } from "../api/uploadProfilePictureToSupabase";
import { getUserBySlug, updateUserProfile } from "../api/usersService";
import ArtworkCard from "../components/artwork/ArtworkCard";
import { useAuth } from "../context/AuthContext";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { Artwork } from "../types/IObjectTypes";
import { Skeleton } from "antd";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

interface UserProfile {
  id: string;
  profilePictureUrl: string;
  fullName: string;
  followerCount: number;
  bio: string;
  artworks: Artwork[];
  isFollowing: boolean;
  totalLikes?: number;
}

const UserProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useThemeToggle();
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [editableName, setEditableName] = useState("");
  const [editableBio, setEditableBio] = useState("");
  const [newProfilePicFile, setNewProfilePicFile] = useState<File | null>(null);
  const [previewProfilePic, setPreviewProfilePic] = useState<string | null>(
    null
  );

  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      let updatedProfilePictureUrl = userProfile?.profilePictureUrl || "";

      if (newProfilePicFile) {
        const uploadedUrl = await uploadProfilePictureToSupabase(
          newProfilePicFile
        );
        if (!uploadedUrl)
          throw new Error("Failed to upload new profile picture.");
        updatedProfilePictureUrl = uploadedUrl;
      }

      await updateUserProfile({
        ...userProfile!,
        fullName: editableName,
        bio: editableBio,
        profilePictureUrl: updatedProfilePictureUrl,
      });

      return updatedProfilePictureUrl;
    },
    onSuccess: (updatedProfilePictureUrl) => {
      setUserProfile((prev) =>
        prev
          ? {
              ...prev,
              fullName: editableName,
              bio: editableBio,
              profilePictureUrl: updatedProfilePictureUrl,
            }
          : null
      );
      message.success("Profile updated successfully!");
      setEditing(false);
      setNewProfilePicFile(null);
      setPreviewProfilePic(null);
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
      message.error("Failed to update profile.");
    },
  });

  const onToggleFollow = async (artistId: string) => {
    if (!userProfile) return;

    const newFollowerCount = await toggleFollow(artistId);

    setUserProfile((prevProfile) =>
      prevProfile
        ? {
            ...prevProfile,
            isFollowing: !prevProfile.isFollowing,
            followerCount: newFollowerCount,
          }
        : null
    );
  };

  const handleProfilePictureChange = (file: File) => {
    setNewProfilePicFile(file);
    setPreviewProfilePic(URL.createObjectURL(file));
    return false; // Prevent default upload behavior
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        if (!slug) throw new Error("Slug is undefined");

        const data = await getUserBySlug(slug);
        setEditableName(data.fullName);
        setEditableBio(data.bio);
        setUserProfile(data);

        const fetchedArtworks = await currentUserArtworks(); // 🔁 Replace this with the correct service call
        setArtworks(
          Array.isArray(fetchedArtworks) ? fetchedArtworks : [fetchedArtworks]
        );
      } catch (error) {
        console.error("Failed to fetch user profile or artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <Content
          style={{
            padding: "24px",
            width: "90%",
            margin: "0 auto",
            backgroundColor: darkMode ? "#1f1f1f" : "#f9f9f9",
            color: darkMode ? "#ffffff" : "#000000",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          {/* Skeleton for profile section */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} md={6} style={{ textAlign: "center" }}>
              <Skeleton.Avatar active size={150} shape="circle" />
            </Col>
            <Col xs={24} sm={16} md={18}>
              <Skeleton active title={{ width: 200 }} paragraph={{ rows: 2 }} />
            </Col>
          </Row>

          <Divider />

          {/* Skeleton for artworks */}
          <Row gutter={[16, 16]}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Col xs={24} sm={12} md={8} lg={6} key={i}>
                <Skeleton.Image active style={{}} />
                <Skeleton active paragraph={{ rows: 1 }} />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    );
  }

  if (!userProfile) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Text type="danger">User not found or is not available.</Text>
      </div>
    );
  }

  const handleSave = async () => {
    updateProfileMutation.mutate();
  };

  const handleCancel = () => {
    if (!userProfile) return;
    setEditableName(userProfile.fullName);
    setEditableBio(userProfile.bio);
    setEditing(false);
    setNewProfilePicFile(null);
    setPreviewProfilePic(null);
  };

  return (
    <Layout>
      <Content
        style={{
          padding: "24px",
          width: "90%",
          margin: "0 auto",
          backgroundColor: darkMode ? "#1f1f1f" : "#f9f9f9",
          color: darkMode ? "#ffffff" : "#000000",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="profile-header"
          style={{ marginBottom: "40px" }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6} style={{ textAlign: "center" }}>
              <Badge
                count={
                  editing ? (
                    <Upload
                      showUploadList={false}
                      beforeUpload={handleProfilePictureChange}
                    >
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<UploadOutlined />}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                        }}
                      />
                    </Upload>
                  ) : null
                }
                offset={[0, 0]}
              >
                <Avatar
                  size={150}
                  src={previewProfilePic || userProfile.profilePictureUrl}
                  alt={userProfile.fullName}
                />
              </Badge>
            </Col>
            <Col xs={24} sm={16} md={18}>
              <Row
                gutter={16}
                style={{
                  marginBottom: "15px",
                  justifyContent: "space-between",
                }}
              >
                <Title
                  level={2}
                  style={{
                    marginBottom: "5px",
                    color: darkMode ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 16,
                      width: "100%",
                    }}
                  >
                    {editing ? (
                      <Input
                        value={editableName}
                        onChange={(e) => setEditableName(e.target.value)}
                        style={{ fontSize: 20, fontWeight: 600, maxWidth: 300 }}
                      />
                    ) : (
                      <Title
                        level={2}
                        style={{
                          marginBottom: "5px",
                          color: darkMode ? "#ffffff" : "#000000",
                        }}
                      >
                        {userProfile.fullName}
                      </Title>
                    )}
                  </div>

                  <Button
                    type={userProfile.isFollowing ? "default" : "primary"}
                    danger={userProfile.isFollowing}
                    icon={
                      userProfile.isFollowing ? (
                        <UserDeleteOutlined />
                      ) : (
                        <UserAddOutlined />
                      )
                    }
                    style={{
                      borderRadius: 24,
                    }}
                    onClick={() => onToggleFollow(userProfile.id)}
                    disabled={userProfile.id === user?.id}
                  >
                    {userProfile.id === user?.id
                      ? "This is You"
                      : userProfile.isFollowing
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                </Title>
                <Row gutter={24}>
                  <Col>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="stat-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <TeamOutlined
                        style={{
                          color: "#9254de",
                          fontSize: "24px",
                        }}
                      />
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          color: "#9254de",
                        }}
                      >
                        {userProfile.followerCount}
                      </Title>
                    </motion.div>
                  </Col>
                  <Col>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="stat-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <PictureOutlined
                        style={{
                          fontSize: "24px",
                          color: "#69c0ff",
                        }}
                      />
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          color: "#69c0ff",
                        }}
                      >
                        {userProfile.artworks.length}
                      </Title>
                    </motion.div>
                  </Col>
                  <Col>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="stat-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <HeartFilled
                        style={{ color: "#eb2f96", fontSize: "24px" }}
                      />

                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          color: "#eb2f96",
                        }}
                      >
                        {userProfile?.totalLikes || 0}
                      </Title>
                    </motion.div>
                  </Col>
                </Row>
              </Row>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 250 }}>
                  {editing ? (
                    <Input.TextArea
                      value={editableBio}
                      onChange={(e) => setEditableBio(e.target.value)}
                      autoSize={{ minRows: 3 }}
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        backgroundColor: darkMode ? "#2a2a2a" : "#f3f3f3",
                        color: darkMode ? "#fff" : "#000",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <Paragraph
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: darkMode ? "#ffffff" : "#000000",
                        padding: "10px 0",
                        borderRadius: "8px",
                      }}
                    >
                      {userProfile.bio ||
                        "This artist has not added a bio yet."}
                    </Paragraph>
                  )}
                </div>

                {/* Buttons on the right */}
                {userProfile.id === user?.id && (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {editing ? (
                      <>
                        <Button
                          type="primary"
                          size="middle"
                          onClick={handleSave}
                          loading={updateProfileMutation.status === "pending"}
                        >
                          Save
                        </Button>
                        <Button
                          size="middle"
                          style={{ background: "none" }}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{ background: "none" }}
                        size="middle"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
              <Divider />
            </Col>
          </Row>
        </motion.div>

        {/* Artworks Section */}
        <div style={{ marginTop: "20px" }}>
          <Title level={3} style={{ color: darkMode ? "#ffffff" : "#000000" }}>
            Gallery
          </Title>
          {artworks.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Row gutter={[16, 16]}>
                {artworks.map((artwork) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={artwork.id}>
                    <ArtworkCard
                      artwork={artwork}
                      onClick={() =>
                        console.log(`Artwork clicked: ${artwork.id}`)
                      }
                      onLikeChange={(id, liked, newCount) =>
                        console.log(
                          `Artwork ${id} liked: ${liked}, new like count: ${newCount}`
                        )
                      }
                    />
                  </Col>
                ))}
              </Row>
            </motion.div>
          ) : (
            <Text style={{ color: darkMode ? "#ffffff" : "#000000" }}>
              No artworks uploaded yet.
            </Text>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfile;
