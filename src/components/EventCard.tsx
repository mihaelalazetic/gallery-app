// EventCard.tsx
import React, { useState } from "react";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/EventCard.css";
import { useThemeToggle } from "../providers/AppThemeProvider";

const { Text } = Typography;

interface Props {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  postedBy: string;
  tags?: string[];
  slug?: string;
  bannerUrl?: string;
}

const EventCard: React.FC<Props> = ({
  title,
  startDate,
  endDate,
  location,
  description,
  postedBy,
  tags = [],
  slug,
  bannerUrl,
}) => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  // 👉 Destructure darkMode (boolean) out of the context object:
  const { darkMode } = useThemeToggle();

  return (
    <div
      className={`event-flip-card-container ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => navigate(`/events/${slug}`)}
    >
      <div className="event-flip-card">
        {/* Front Side */}
        <div
          className={`event-flip-front${darkMode ? " dark" : ""}`}
        >
          <div
            className={`event-calendar-tabs${darkMode ? " dark" : ""}`}
          >
            <div className="spiral left" />
            <div className="spiral right" />
          </div>

          <div
            className="event-calendar-body"
            style={{ backgroundImage: `url(${bannerUrl})` }}
          >
            <div className="event-dates">
              <CalendarOutlined />
              <span>
                {startDate}
                <br />
                {endDate}
              </span>
            </div>
            <div className="event-title-centered">
              <Text className="event-title">{title}</Text>
            </div>
            <div className="event-location">
              <EnvironmentOutlined />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`event-flip-back${darkMode ? " dark" : ""}`}>
          <div className="event-info">
            <Text strong>{title}</Text>
            <Text>{description}</Text>
            <Text>
              <UserOutlined /> {postedBy}
            </Text>
            <div className="event-tags">
              {tags.slice(0, 2).map((tag) => (
                <Tag key={tag} color="geekblue">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
