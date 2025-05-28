import { apiInstance } from "./apiConfig";

const prefix = "/api/users";

export const getCurrentUser = async (): Promise<any> => {
  const response = await apiInstance.get<any>(`${prefix}/getCurrentUser`);

  return response.data;
};

export const getUserBySlug = async (slug: string): Promise<any> => {
  const response = await apiInstance.get<any>(`${prefix}/get-by-slug/${slug}`);

  return response.data;
};

export const getMostLikedArtists = async (): Promise<any> => {
  const response = await apiInstance.get<any>(`${prefix}/most-liked-artists`);

  return response.data;
};

export const updateUserProfile = async (body: any): Promise<any> => {
  const response = await apiInstance.post<any>(`${prefix}/update`, body);

  return response.data;
};
