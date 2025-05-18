// PictureFrame.tsx
import React from "react";
import { Box } from "@mui/material";
import { useThemeToggle } from "../providers/AppThemeProvider";

interface PictureFrameProps {
  src: string;
  alt: string;
  source?: string; // Optional prop for the source of the image
}

const PictureFrame: React.FC<PictureFrameProps> = ({ src, alt, source }) => {
  const { darkMode } = useThemeToggle();

  // Define colors for light and dark modes
  const outerBorderColor = darkMode ? "#444" : "#e0e0e0";
  const outerBg = darkMode ? "#333" : "#fff";
  const innerBorderColor = darkMode ? "#555" : "#ccc";
  const innerBg = darkMode ? "#222" : "#f8f8f8";
  const wireColor = darkMode ? "#aaa" : "#888";

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Hanging Wire Effect */}
      <Box
        sx={{
          position: "absolute",
          top: "-35px",
          left: "50%",
          width: "100px",
          height: "40px",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        {/* Left diagonal wire */}
        <Box
          sx={{
            position: "absolute",
            width: "50px",
            height: "2px",
            bgcolor: wireColor,
            transform: "rotate(-45deg)",
            transformOrigin: "right",
            top: "0",
            left: "0",
          }}
        />
        {/* Right diagonal wire */}
        <Box
          sx={{
            position: "absolute",
            width: "50px",
            height: "2px",
            bgcolor: wireColor,
            transform: "rotate(45deg)",
            transformOrigin: "left",
            top: "0",
            right: "0",
          }}
        />
      </Box>

      {/* Picture Frame */}
      <Box
        sx={{
          p: "20px",
          border: `12px solid ${outerBorderColor}`,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          bgcolor: outerBg,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Inner Frame */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            border: `6px solid ${innerBorderColor}`,
            bgcolor: innerBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: source == "auth" ? "400px" : "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PictureFrame;
