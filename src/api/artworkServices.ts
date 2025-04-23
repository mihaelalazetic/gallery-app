import { apiInstance } from "./apiConfig";

const prefix = "/api/artworks";

export const uploadArtwork = async (artData: any): Promise<any> => {
  const response = await apiInstance.post(`${prefix}/upload`, artData);
  return response.data;
};

export const getAllArtworks = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}`);
  return response.data;
};

export const getLimitedArtworks = async (limit: number): Promise<any> => {
  const response = await apiInstance.get(`${prefix}?limit=${limit}`);
  return response.data;
};

export const getPaginatedArtworks = async (
  page = 0,
  size = 20
): Promise<any> => {
  const response = await apiInstance.get(`${prefix}?page=${page}&size=${size}`);
  return response.data;
};

export const getFeaturedArtworks = async (page = 0, size = 6): Promise<any> => {
  const response = await apiInstance.get(`${prefix}?page=${page}&size=${size}`);
  return response.data;
};

export const getArtworks = async (isAuthenticated: boolean): Promise<any> => {
  if (isAuthenticated) {
    return getPaginatedArtworks(); // or pass page/size
  } else {
    return getLimitedArtworks(3);
  }
};
