import { apiInstance } from "./apiConfig";

const prefix = "/api/events";

export const createEvent = async (eventData: any): Promise<any> => {
  const response = await apiInstance.post(`${prefix}/create`, eventData);
  return response.data;
};

export const getEvent = async (id: any): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/getById/${id}`);
  return response.data;
};
export const getUpcomingEvents = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/upcoming`);
  return response.data;
};
export const getAllEvents = async (): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/all`);
  return response.data;
};

export const getEventBySlug = async (slug: string): Promise<any> => {
  const all = await getAllEvents();
  return all.find((e: { slug: string }) => e.slug === slug);
};
