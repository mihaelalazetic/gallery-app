// AuthLanding.tsx
import { Card, Col, Layout, Row, Typography } from "antd";
import { useState } from "react";
import GallerySlideshow from "../components/GallerySlideshow";
import LanguageChanger from "../components/utils/LanguageChanger";
import ThemeToggle from "../components/utils/ThemeToggle";
import AuthForm from "./AuthForm";

import { useTranslation } from "react-i18next";
import logo from "../assets/logo3.png";
import fish from "../assets/moving-fish.webp";
import landscape from "../assets/moving-landscape.gif";
import pic from "../assets/moving-pic.gif";
import { useThemeToggle } from "../providers/AppThemeProvider";
import { useSearchParams } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const images = [pic, fish, landscape];

const AuthLanding = () => {
  const { darkMode } = useThemeToggle();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get("modeState");
  const [mode, setMode] = useState<"login" | "signup">(
    modeParam === "login" || modeParam === "signup" ? modeParam : "login"
  );
  const { t } = useTranslation();
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
            alignItems: "center",
          }}
        >
          <LanguageChanger />
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
          {/* Left Panel - Auth Form */}
          <Col
            xs={24}
            md={12}
            lg={10}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              bordered={false}
              style={{
                padding: 0, // Remove Card's inner padding.
                borderRadius: 12,
                overflow: "hidden", // This ensures the rounded corners are preserved.
                backgroundColor: darkMode ? "#2a2a3b" : "#ffffff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                maxHeight: "90vh",
              }}
            >
              {/* Inner container with fixed height & scroll */}
              <div
                style={{
                  maxHeight: "90vh", // Force the inner container to match Card's max height.
                  overflowY: "auto",
                  padding: 32,
                  paddingTop: 0,
                  boxSizing: "border-box",
                }}
              >
                <Title
                  level={1}
                  style={{
                    textAlign: "center",
                    color: darkMode ? "#fff" : "#1a1a1a",
                    margin: 0,
                  }}
                >
                  <img style={{ width: "150px" }} src={logo} />
                  {/* <i style={{ fontSize: "16px" }}>
                    A space where passion meets purpouse
                  </i> */}
                  {/* {mode === "login"
                      ? t("welcomeBack") + " 👋"
                      : t("joinEgallery") + " 🎨"} */}
                </Title>

                <AuthForm
                  isLogin={mode === "login"}
                  onAfterSignup={() => setMode("login")}
                />

                <div style={{ textAlign: "center" }}>
                  {mode === "login" ? (
                    <>
                      {t("noAccount") + " "}
                      <a onClick={() => setMode("signup")}>{t("signup")}</a>
                    </>
                  ) : (
                    <>
                      Already registered?{" "}
                      <a onClick={() => setMode("login")}>{t("login")}</a>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Panel - Slideshow */}
          <Col
            xs={0}
            md={12}
            lg={12}
            style={{
              // position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              //   overflow: "hidden",
            }}
          >
            <GallerySlideshow images={images} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLanding;
