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

export const getCategories = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/categories`);
  return response.data;
};

// Example API call
export const getNewArtworks = async (params: any) => {
  const query = new URLSearchParams(params).toString();
  const response = await apiInstance.get(`${prefix}/new-artworks?${query}`);
  if (response.status < 200 || response.status >= 300)
    throw new Error("Failed to fetch artworks");
  return response.data;
};

export const getMostLikedArtists = async (): Promise<any> => {
  const response = await apiInstance.get<any>(`${prefix}/most-liked-artists`);

  return response.data;
};
