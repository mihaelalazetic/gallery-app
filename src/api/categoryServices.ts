import { CategoryCreatePayload } from "../types/IObjectTypes";
import { apiInstance } from "./apiConfig";

const prefix = "/api/category";

export const getCategories = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/getAll`);
  return response.data;
};
export const getCategoryById = async (id: number): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/getById/${id}`);
  return response.data;
};

export const uploadCategory = async (
  payload: CategoryCreatePayload,
  image?: File
): Promise<any> => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );

  if (image) {
    formData.append("image", image); // MUST match @RequestPart("image")
  }

  const response = await apiInstance.post(`${prefix}/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};