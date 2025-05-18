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

export const getFeaturedArtworks = async (page = 0, size = 6): Promise<any> => {
  const response = await apiInstance.get(
    `${prefix}/artworks?page=${page}&size=${size}`
  );
  return response.data.content;
};
