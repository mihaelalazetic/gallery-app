import { CommentDto } from "../types/IObjectTypes";
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
  // ✅ call the /featured endpoint, not the root list
  const response = await apiInstance.get(
    `${prefix}/featured?page=${page}&size=${size}`
  );
  return response.data.content;
};

export const getArtworks = async (isAuthenticated: boolean): Promise<any> => {
  if (isAuthenticated) {
    return getPaginatedArtworks(); // or pass page/size
  } else {
    return getLimitedArtworks(3);
  }
};

export const likeArtwork = async (artworkId: string): Promise<any> => {
  // InteractionTargetType.ARTWORK
  return await apiInstance
    .post<number>(`/api/likes/like/${artworkId}/ARTWORK`)
    .then((res) => res.data);
};

// fetch comments for one artwork
export const getComments = async (artworkId: string): Promise<CommentDto[]> => {
  return apiInstance
    .get<CommentDto[]>(`/api/comments?targetId=${artworkId}&targetType=ARTWORK`)
    .then((res) => res.data);
};

// post a new comment (server sets current user)
export const createComment = async (
  artworkId: string,
  text: string
): Promise<CommentDto> => {
  return apiInstance
    .post<CommentDto>("/api/comments", {
      targetId: artworkId,
      targetType: "ARTWORK",
      text,
    })
    .then((res) => res.data);
};

// delete a comment
export const deleteComment = async (commentId: string): Promise<void> => {
  return apiInstance.delete(`/api/comments/${commentId}`).then(() => {});
};
