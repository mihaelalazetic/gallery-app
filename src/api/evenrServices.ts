import { apiInstance } from "./apiConfig";

const prefix = "/api/event";

export const createEvent = async (artData: any): Promise<any> => {
  const response = await apiInstance.post(`${prefix}/create`, artData);
  return response.data;
};

export const getEvent = async (id: any): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/getById/${id}`);
  return response.data;
};

export const getAllEvents = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}`);
  return response.data;
};

// delete a comment
export const deleteComment = async (commentId: string): Promise<void> => {
  return apiInstance.delete(`/api/comments/${commentId}`).then(() => {});
};
