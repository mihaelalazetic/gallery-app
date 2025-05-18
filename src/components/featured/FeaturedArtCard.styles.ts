// src/components/FeaturedArtCard.styles.ts
import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const CardHeader = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #333;
`;

export const ArtistName = styled.p`
  margin: 4px 0 0 0;
  color: #888;
  font-size: 0.9rem;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
