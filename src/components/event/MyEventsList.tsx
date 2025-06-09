import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Badge, Button, Card, Col, Row, Skeleton, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../../api/eventsServices";
import { useFilterContext } from "../../context/FilterContext";
import EventFilterBar from "../EventFilterBar";

const { Title, Paragraph, Text } = Typography;

export interface EventDto {
  name: string;
  description: string;
  location: string;
  locationAddress: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  bannerImageUrl: string;
  shareableLink: string;
  createdBy: string;
  type: string;
  tags: string[];
  artworkIds: string[];
  slug: string;
}

export enum EventType {
  EXHIBITION = "EXHIBITION",
  WORKSHOP = "WORKSHOP",
  MEETUP = "MEETUP",
  OTHER = "OTHER",
}

const eventTypeColors: { [key: string]: string } = {
  [EventType.EXHIBITION]: "magenta",
  [EventType.WORKSHOP]: "blue",
  [EventType.MEETUP]: "green",
  [EventType.OTHER]: "gray",
};

// Styles
const CARD_HEIGHT = "auto";
const CARD_WIDTH = 320;

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "8px 12px",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)",
  color: "#fff",
};
const cardContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};
const cardStyle: React.CSSProperties = {
  borderRadius: 12,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  height: CARD_HEIGHT,
  width: CARD_WIDTH,
  transition: "transform 0.2s",
};
const imgContainerStyle: React.CSSProperties = {
  position: "relative",
  height: 180,
  overflow: "hidden",
};
const contentStyle: React.CSSProperties = {
  padding: 16,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",
};
const footerStyle: React.CSSProperties = { marginTop: "auto", flexShrink: 0 };

const MyEventsList: React.FC = () => {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { searchQuery, selectedCategories, dateRange } = useFilterContext();

  useEffect(() => {
    getMyEvents()
      .then((all) => {
        setEvents(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter events based on the context values
  const filteredEvents = events.filter((event) => {
    // Filter by search query
    if (
      searchQuery &&
      !event.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by categories
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(event.type as unknown as number)
    ) {
      return false;
    }

    // Filter by date range
    if (dateRange[0] && dateRange[1]) {
      const eventStartDate = new Date(event.startDate);
      if (eventStartDate < dateRange[0] || eventStartDate > dateRange[1]) {
        return false;
      }
    }

    return true;
  });
  const items = loading ? Array(8).fill({}) : filteredEvents;

  return (
    <>
      {/* Filter Bar */}
      <EventFilterBar />

      {/* Event Cards */}
      <Row gutter={[24, 24]} justify="start" align="top">
        {items.map((item: any, idx) => {
          const typeColor = eventTypeColors[item.type] || "gray";
          const cardContent = (
            <Card
              hoverable
              style={cardStyle}
              bodyStyle={{ padding: 0 }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {loading ? (
                <Skeleton.Image active style={{ width: "100%", height: 180 }} />
              ) : (
                <div style={imgContainerStyle}>
                  <img
                    src={item.bannerImageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div style={overlayStyle}>
                    <Title
                      level={5}
                      style={{
                        color: "#fff",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </Title>
                    <Text
                      style={{
                        color: "#ddd",
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <CalendarOutlined /> {item.startDate}
                    </Text>
                  </div>
                </div>
              )}
              <div style={contentStyle}>
                {loading ? (
                  <>
                    <Skeleton
                      active
                      paragraph={{ rows: 1, width: "60%" }}
                      title={false}
                    />
                    <Skeleton
                      active
                      paragraph={{ rows: 2, width: ["80%", "90%"] }}
                      title={false}
                    />
                  </>
                ) : (
                  <>
                    <Paragraph
                      ellipsis={{ rows: 2 }}
                      style={{ marginBottom: 12, height: 48 }}
                    >
                      {item.description}
                    </Paragraph>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Text>
                        <EnvironmentOutlined /> {item.location}
                      </Text>
                      <Text type="secondary">By {item.createdBy}</Text>
                    </div>
                    <div
                      style={{
                        marginBottom: 12,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                      }}
                    >
                      {item.tags.map((tag: string) => (
                        <Tag
                          key={tag}
                          color={eventTypeColors[tag] || "blue"}
                          style={{ borderRadius: 4 }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </>
                )}
                <div style={footerStyle}>
                  {loading ? (
                    <Skeleton.Button active block size="default" />
                  ) : (
                    <Button
                      type="primary"
                      block
                      icon={<LinkOutlined />}
                      onClick={() => navigate(`/events/${item.slug}`)}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
          return (
            <Col
              key={item.slug || idx}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={cardContainer}
            >
              {loading ? (
                cardContent
              ) : (
                <Badge.Ribbon text={item.type} color={typeColor}>
                  {cardContent}
                </Badge.Ribbon>
              )}
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MyEventsList;
