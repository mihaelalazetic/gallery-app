// src/components/CommentsThread.tsx

import React from "react";
import { List, Avatar, Tooltip, Typography, Empty } from "antd";
import { formatDistanceToNow } from "date-fns";
import { CommentDto } from "../types/IObjectTypes";

const { Text } = Typography;

interface CommentsThreadProps {
  comments: CommentDto[];
}

const CommentsThread: React.FC<CommentsThreadProps> = ({ comments }) => (
  <List
    locale={{
      emptyText: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No comments yet"
        />
      ),
    }}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={(c) => {
      const timeAgoString = formatDistanceToNow(new Date(c.createdAt), {
        addSuffix: true,
      });

      const timeAgo = (
        <Tooltip title={new Date(c.createdAt).toLocaleString()}>
          <Text type="secondary">{timeAgoString}</Text>
        </Tooltip>
      );

      return (
        <List.Item style={{ padding: "12px 0" }}>
          <List.Item.Meta
            avatar={<Avatar src={c.user.profilePictureUrl} />}
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text strong>{c.user.fullName}</Text>
                <Text type="secondary">•</Text>
                {timeAgo}
              </div>
            }
            description={<Text>{c.text}</Text>}
          />
        </List.Item>
      );
    }}
  />
);

export default CommentsThread;
