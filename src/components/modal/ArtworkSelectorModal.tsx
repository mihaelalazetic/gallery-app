import { Col, Modal, Row } from "antd";
import { useThemeToggle } from "../../providers/AppThemeProvider";

const ArtworkSelectorModal = ({
  visible,
  onClose,
  artworks,
  selectedIds,
  onToggleSelect,
}: {
  visible: boolean;
  onClose: () => void;
  artworks: any[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}) => {
  const { colorPrimary } = useThemeToggle();

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="Select Artworks"
      centered
      width="80%"
      footer={null}
      bodyStyle={{
        maxHeight: "90vh",
        minHeight: "40vh",
        // overflowY: "auto",
      }}
      destroyOnClose
    >
      <Row gutter={[16, 16]}>
        {artworks.map((art) => {
          const isSelected = selectedIds.includes(String(art.id));
          return (
            <Col span={8} key={art.id}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  borderRadius: 8,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                }}
                onClick={() => onToggleSelect(String(art.id))}
              >
                {/* Artwork Image */}
                <img
                  src={art.imageUrls?.[0]}
                  alt={art.title}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    filter: isSelected ? "brightness(0.5)" : "none",
                    border: isSelected ? `3px solid ${colorPrimary}` : "none",
                    borderRadius: 8,
                  }}
                />

                {/* Persistent Title Banner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: "8px",
                    background: "rgba(0, 0, 0, 0.7)",
                    boxShadow: "0 -4px 8px rgba(0,0,0,0.5)",
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: 500,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  {art.title}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: colorPrimary,
                      color: "#fff",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

export default ArtworkSelectorModal;
