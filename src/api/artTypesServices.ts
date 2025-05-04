import { apiInstance } from "./apiConfig";

const prefix = "/api/arttypes";

export const getArtTypes = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}`);
  return response.data;
};
