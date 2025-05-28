import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import FeaturedArtistCard from "./FeaturedArtistCard";
import {
  getMostLikedArtists,
  getTopArtworksForArtist,
} from "../../api/featured";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Artist, ArtworkDto } from "../../types/IObjectTypes";

const FeaturedArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artworksMap, setArtworksMap] = useState<Record<string, ArtworkDto[]>>(
    {}
  );
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const artistList = await getMostLikedArtists();
      setArtists(artistList);

      const artworks = await Promise.all(
        artistList.map(async (artist: { id: string }) => {
          const art = await getTopArtworksForArtist(artist.id);
          return { id: artist.id, artworks: art };
        })
      );

      const map: Record<string, ArtworkDto[]> = {};
      artworks.forEach(({ id, artworks }) => {
        map[id] = artworks;
      });

      setArtworksMap(map);
    };

    fetchData();
  }, []);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={prev}>
        <LeftOutlined />
      </button>
      <Carousel
        dots={true}
        infinite
        autoplaySpeed={5000}
        slidesToShow={1} // Display one per slide
        slidesToScroll={1}
        autoplay
        ref={carouselRef}
        className="carousel"
      >
        {artists.map((artist) => (
          <FeaturedArtistCard
            key={artist.id}
            artist={{
              ...artist,
              artworks: artworksMap[artist.id] || [],
            }}
          />
        ))}
      </Carousel>
      <button className="arrow right" onClick={next}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default FeaturedArtists;
