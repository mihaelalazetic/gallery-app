import { apiInstance } from "./apiConfig";

const prefix = "/api/subscriptions";

export const toggleFollow = async (userId: string): Promise<number> =>
  apiInstance.post<number>(`${prefix}/toggle/${userId}`).then((r) => r.data);

export const getFollowerCount = async (userId: string): Promise<number> =>
  apiInstance.get<number>(`${prefix}/count/${userId}`).then((r) => r.data);

export const getFollowingStatus = async (userId: string): Promise<boolean> =>
  apiInstance
    .get<boolean>(`${prefix}/is-following/${userId}`)
    .then((r) => r.data);
