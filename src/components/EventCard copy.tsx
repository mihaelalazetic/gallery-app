import React, { useState } from "react";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import "../styles/EventCard.css";

const { Text } = Typography;

export interface EventCardProps {
  bannerUrl: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  postedBy: string;
  tags?: string[];
  slug?: string; // Optional slug for routing
}

const EventCard: React.FC<EventCardProps> = ({
  bannerUrl,
  title,
  startDate,
  endDate,
  location,
  description,
  postedBy,
  tags = [],
  slug
}) => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();



  return (
    <div
      className={`event-flip-card-container ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => {
        navigate(`/events/${slug}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="event-flip-card">
        {/* Front Side */}
        <div
          className="event-flip-face event-flip-front"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <div className="event-overlay-dim no-blur">
            <div className="event-dates top-left">
              <CalendarOutlined />
              <span>
                {startDate}
                <br />
                {endDate}
              </span>
            </div>
            <div className="event-title-centered">
              <Text className="event-title large">{title}</Text>
            </div>
            <div className="event-location-corner">
              <EnvironmentOutlined />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="event-flip-face event-flip-back"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <div className="event-overlay-blur intensified">
            <div className="event-info">
              <Text className="event-title large">{title}</Text>
              <Text className="event-description">{description}</Text>
              <Text className="event-meta">
                <UserOutlined /> {postedBy}
              </Text>
              <div className="event-tags">
                {tags.slice(0, 2).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
