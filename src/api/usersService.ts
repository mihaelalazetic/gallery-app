import { IUser } from "../types/IObjectTypes";
import { apiInstance } from "./apiConfig";

const prefix = "/api/users";

export const getCurrentUser = async (): Promise<IUser> => {
  const response = await apiInstance.get<IUser>(`${prefix}/getCurrentUser`);

  return response.data;
};

export const getMostLikedArtists = async (): Promise<any> => {
  const response = await apiInstance.get<any>(`${prefix}/most-liked-artists`);

  return response.data;
};
