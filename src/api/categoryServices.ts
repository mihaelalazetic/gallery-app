import { apiInstance } from "./apiConfig";

const prefix = "/api/category";

export const getCategories = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/getAll`);
  return response.data;
};

export const uploadCategory = async (categoryData: any): Promise<any> => {
  const response = await apiInstance.post(`${prefix}/create`, categoryData);
  return response.data;
};
