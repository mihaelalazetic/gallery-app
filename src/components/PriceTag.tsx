import React from "react";

interface PriceTagProps {
  price: number;
  visible: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, visible }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) rotate(5deg)"
          : "translateY(-10px) rotate(5deg)",
        transition: "opacity 300ms ease, transform 300ms ease",
      }}
    >
      <div style={tagShape}>
        <div style={hole}></div>
        <span style={text}>€ {price}</span>
      </div>
    </div>
  );
};

export default PriceTag;

// --- Styles ---
const tagShape: React.CSSProperties = {
  position: "relative",
  background: "linear-gradient(135deg, #9254de, #722ed1)",
  clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 16px 100%, 0% 50%)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "13px",
  padding: "6px 14px 6px 20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  minWidth: 70,
  textAlign: "center",
  lineHeight: 1,
  borderRadius: 3,
};

const text: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
};

const hole: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: 4,
  transform: "translateY(-50%)",
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "#fff",
  boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
  zIndex: 3,
};
