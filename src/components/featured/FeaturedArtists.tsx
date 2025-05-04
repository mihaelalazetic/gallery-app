import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { getTopArtworksForArtist } from "../../api/featured";
import { getMostLikedArtists } from "../../api/usersService";
import { Artist, ArtworkDto } from "../../types/IObjectTypes";
import FeaturedArtistCard from "./FeaturedArtistCard";

const FeaturedArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artworksMap, setArtworksMap] = useState<Record<string, ArtworkDto[]>>(
    {}
  );

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

  return (
    <Carousel autoplay arrows className="featured-carousel">
      {artists.map((artist) => (
        <div key={artist.id}>
          <FeaturedArtistCard
            artist={{
              ...artist,
              artworks: artworksMap[artist.id] || [],
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default FeaturedArtists;
