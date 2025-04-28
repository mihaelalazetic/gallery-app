// src/components/FollowButton.tsx
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { toggleFollow } from "../api/artists";

interface Props {
  userId: string;
  initialCount: number;
  initialFollowing: boolean;
}

export const FollowButton: React.FC<Props> = ({
  userId,
  initialCount,
  initialFollowing,
}) => {
  const [count, setCount] = useState(initialCount);
  const [following, setFollowing] = useState(initialFollowing);

  const onClick = async () => {
    const newCount = await toggleFollow(userId);
    setFollowing(!following);
    setCount(newCount);
  };

  return (
    <Button
      danger={following}
      type={following ? "default" : "primary"}
      icon={following ? <UserDeleteOutlined /> : <UserAddOutlined />}
      onClick={onClick}
    >
      {following ? "Unfollow" : "Follow"} ({count})
    </Button>
  );
};
