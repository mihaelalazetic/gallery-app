// FrameContainer.tsx
import React from "react";
import { Box } from "@mui/material";

interface FrameContainerProps {
  children: React.ReactNode;
  padding?: string; // e.g. "16px"
  borderRadius?: string; // e.g. "8px"
  borderColor?: string; // default light gray
  boxShadow?: string; // default subtle
}

const FrameContainer: React.FC<FrameContainerProps> = ({
  children,
  padding = "16px",
  // borderRadius = "12px",
  borderColor = "#e0e0e0",
  boxShadow = "0 4px 12px rgba(0,0,0,0.1)",
}) => (
  <Box
    sx={{
      position: "relative",
      p: padding,
      border: `1px solid ${borderColor}`,
      // borderRadius,
      
      boxShadow,
      bgcolor: "background.paper",
    }}
  >
    {children}
  </Box>
);

export default FrameContainer;
