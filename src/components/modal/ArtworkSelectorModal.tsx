import { Card, Col, Modal, Row } from "antd";

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
}) => (
  <Modal
    open={visible}
    onCancel={onClose}
    title="Select Artworks"
    centered
    width="80%"
    footer={null}
    // width={"90%"}
    bodyStyle={{
      maxHeight: "90vh",
      // overflowY: "auto",
      // background: darkMode ? "#1c1c1e" : "#fff",
    }}
    destroyOnClose
  >
    <Row gutter={[16, 16]}>
      {artworks.map((art) => {
        const isSelected = selectedIds.includes(String(art.id));
        return (
          <Col span={8} key={art.id}>
            <Card
              hoverable
              onClick={() => onToggleSelect(String(art.id))}
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    src={art.imageUrls?.[0]}
                    alt={art.title}
                    style={{
                      maxHeight: 200,
                      objectFit: "cover",
                      width: "100%",
                      border: isSelected
                        ? "3px solid purple"
                        : "1px solid #ccc",
                      transition: "all 0.3s",
                      borderRadius: 8,
                      filter: isSelected ? "brightness(70%)" : "none",
                    }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "purple",
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
              }
            >
              <Card.Meta title={art.title} />
            </Card>
          </Col>
        );
      })}
    </Row>
  </Modal>
);

export default ArtworkSelectorModal;
