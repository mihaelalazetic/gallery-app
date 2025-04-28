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
      const timeAgo = (
        <Tooltip title={new Date(c.createdAt).toLocaleString()}>
          <Text type="secondary">
            {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
          </Text>
        </Tooltip>
      );

      return (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={c.user.profilePictureUrl} />}
            title={c.user.fullName}
            description={
              <>
                <Text>{c.text}</Text>
                <div style={{ marginTop: 4 }}>{timeAgo}</div>
              </>
            }
          />
        </List.Item>
      );
    }}
  />
);

export default CommentsThread;
