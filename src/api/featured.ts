import { ArtworkWithLike } from "../components/featured/FeaturedArtCard";
import { apiInstance } from "./apiConfig";

const prefix = "/api/featured";

/**
 * Fetch top N artworks for a given artist, ordered by likes desc.
 */
export const getTopArtworksForArtist = async (
  artistId: string,
  limit = 5
): Promise<any[]> =>
  apiInstance
    .get<any[]>(`${prefix}/artist/${artistId}/top-artworks`, {
      params: { limit },
    })
    .then((r) => r.data);
