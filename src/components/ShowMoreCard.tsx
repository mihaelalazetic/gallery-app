// ShowMoreCard.tsx
import React from "react";
import { RightOutlined } from "@ant-design/icons";
import "../styles/EventCard.css"; // Reuse EventCard styles
import { Button } from "antd";
import { useThemeToggle } from "../providers/AppThemeProvider";

const ShowMoreCard: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { darkMode } = useThemeToggle();

  return (
    <div
      className="event-flip-card-container"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="event-flip-card">
        {/* Front Side only (no flip) */}
        <div className={`event-flip-front${darkMode ? " dark" : ""}`}>
          <div className={`event-calendar-tabs${darkMode ? " dark" : ""}`}>
            <div className="spiral left" />
            <div className="spiral right" />
          </div>

          <div
            className="event-calendar-body"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80')",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Button type="primary" shape="round" className="show-more-button">
              <RightOutlined />
              Show More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMoreCard;
