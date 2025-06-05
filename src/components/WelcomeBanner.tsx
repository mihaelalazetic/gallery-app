import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomeBanner.css";

const WelcomeBanner: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);
  const navigate = useNavigate();
  return (
    <Modal
      open={showWelcome}
      footer={null}
      onCancel={() => setShowWelcome(false)}
      centered
      width={750}
      bodyStyle={{ padding: 0, borderRadius: "1rem", overflow: "hidden" }}
    >
      <div className="welcome-banner">
        {/* Left: Typing intro */}
        <div className="welcome-left">
          <div className="typing-title">Welcome to ExhibitMe</div>
          <div className="typing-body">
            An ART space where passion meets purpose... 🎨
          </div>
        </div>

        {/* Right: CTA */}
        <div className="welcome-right">
          <div className="cta-text">Join our gallery</div>
          <Button
            type="primary"
            shape="round"
            className="cta-button"
            onClick={() => navigate("/auth?modeState=login")}
          >
            Login
          </Button>
          <Button
            type="default"
            shape="round"
            className="cta-button"
            onClick={() => navigate("/auth?modeState=signup")}
          >
            Sign Up
          </Button>
          <div className="svg-art" />
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeBanner;
