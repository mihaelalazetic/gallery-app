// ArtImageOverlay.tsx
import React from "react";
import { Box } from "@mui/material";

interface ArtImageOverlayProps {
  children: React.ReactNode; // your <img> or custom tag
  overlayContent: React.ReactNode; // what shows on hover
  overlayBg?: string; // e.g. "rgba(0,0,0,0.6)"
  transitionMs?: number; // fade duration
}

const ArtImageOverlay: React.FC<ArtImageOverlayProps> = ({
  children,
  overlayContent,
  overlayBg = "rgba(0, 0, 0, 0.6)",
  transitionMs = 300,
}) => (
  <Box
    sx={{
      position: "relative",
      overflow: "hidden",
      "&:hover .overlay": {
        opacity: 1,
        transform: "translateY(0)",
      },
      
      // borderRadius: "1rem",
    }}
  >
    {children}

    <Box
      className="overlay"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: overlayBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: 0,
        transform: "translateY(10px)",
        transition: `opacity ${transitionMs}ms ease, transform ${transitionMs}ms ease`,
        color: "#fff",
        p: 2,
        textAlign: "center",
      }}
    >
      {overlayContent}
    </Box>
  </Box>
);

export default ArtImageOverlay;
