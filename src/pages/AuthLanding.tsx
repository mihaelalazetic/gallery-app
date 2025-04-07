import { Card, Col, Layout, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PictureFrame from "../components/PictureFrame";
import ThemeToggle from "../components/ThemeToggle";
import AuthForm from "./AuthForm";

import fish from "../assets/moving-fish.webp";
import landscape from "../assets/moving-landscape.gif";
import pic from "../assets/moving-pic.gif";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { t } from "i18next";

const { Content } = Layout;
const { Title } = Typography;

const images = [pic, fish, landscape];

const AuthLanding = () => {
  const { darkMode } = useThemeToggle();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Content
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#12131a" : "#f3f4f6",
          transition: "background-color 0.4s ease",
        }}
      >
        {/* Fixed container at top-right for theme toggle and language switcher */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1000,
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <Row
          justify="center"
          align="middle"
          style={{
            height: "100vh",
            overflow: "hidden",
            padding: 16,
          }}
        >
          {/* 👈 Left Panel */}
          <Col xs={24} md={12} lg={10}>
            <Card
              bordered={false}
              style={{
                padding: 32,
                borderRadius: 12,
                backgroundColor: darkMode ? "#2a2a3b" : "#ffffff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Title
                  level={3}
                  style={{
                    textAlign: "center",
                    color: darkMode ? "#fff" : "#1a1a1a",
                  }}
                >
                  {mode === "login"
                    ? "Welcome Back 👋"
                    : "Join the E-Gallery 🎨"}
                </Title>

                <AuthForm
                  isLogin={mode === "login"}
                  onSubmit={(values) => console.log(values)}
                />

                <div style={{ textAlign: "center" }}>
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <a onClick={() => setMode("signup")}>{t("signup")}</a>
                    </>
                  ) : (
                    <>
                      Already registered?{" "}
                      <a onClick={() => setMode("login")}>{t("login")}</a>
                    </>
                  )}
                </div>
              </Space>
            </Card>
          </Col>

          {/* 👉 Right Panel - Museum Walk Slideshow */}
          <Col
            xs={0}
            md={12}
            lg={12}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "90%",
                maxWidth: 500,
                height: "100%",
                position: "relative",
              }}
            >
              {images.map((img, idx) => {
                const position = idx - currentIndex;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      top: 0,
                      transform: `translateX(${position * 120}%) scale(${
                        idx === currentIndex ? 1 : 0.75
                      })`,
                      opacity: idx === currentIndex ? 1 : 0,
                      transition: "transform 1.5s ease, opacity 1.5s ease",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PictureFrame src={img} alt={`Gallery art ${idx + 1}`} />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLanding;
