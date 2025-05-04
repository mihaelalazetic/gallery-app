// // src/components/OnThisDateFeaturedArtists.tsx
// import React, { useEffect, useState } from "react";
// import { Carousel, Spin, Empty } from "antd";
// import { getTopArtworksForArtist } from "../../api/featured";
// import { ArtworkDto, FeaturedArtistDTO } from "../../types/IObjectTypes";
// import { getMostLikedArtists } from "../../api/usersService";
// import FeaturedArtistCard from "./FeaturedArtistCard";
// import FeaturedArtCard from "./FeaturedArtCard";

// interface SlideData {
//   artist: FeaturedArtistDTO;
//   artworks: ArtworkDto[];
// }

// const OnThisDateFeaturedArtists: React.FC = () => {
//   const [slides, setSlides] = useState<SlideData[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const artists = await getMostLikedArtists();
//         const data: SlideData[] = await Promise.all(
//           artists.map(
//             async (artist: FeaturedArtistDTO): Promise<SlideData> => ({
//               artist,
//               artworks: await getTopArtworksForArtist(artist.id, 5),
//             })
//           )
//         );
//         setSlides(data);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) {
//     return <Spin style={{ display: "block", margin: "2rem auto" }} />;
//   }
//   if (!slides.length) {
//     return <Empty description="No featured artists found for today" />;
//   }

//   return (
//     <Carousel
//       dots={false}
//       autoplay
//       autoplaySpeed={8000}
//       adaptiveHeight
//       style={{ padding: "2rem 0" }}
//     >
//       {slides.map(({ artist, artworks }) => (
//         <div key={artist.id}>
//           <FeaturedArtistCard artist={artist} artworks={artworks} />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default OnThisDateFeaturedArtists;
