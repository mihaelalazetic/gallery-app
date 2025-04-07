import React from "react";
import { Box } from "@mui/material";

interface PictureFrameProps {
  src: string;
  alt: string;
}

const PictureFrame: React.FC<PictureFrameProps> = ({ src, alt }) => (
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
          bgcolor: "#888",
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
          bgcolor: "#888",
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
        border: "12px solid #e0e0e0",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        bgcolor: "#fff",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Inner Frame */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "6px solid #ccc",
          bgcolor: "#f8f8f8",
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
            maxHeight: "400px",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  </Box>
);

export default PictureFrame;
