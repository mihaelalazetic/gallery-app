import { Artwork, CommentDto } from "../types/IObjectTypes";
import { apiInstance } from "./apiConfig";

const prefix = "/api/artworks";

export const uploadArtwork = async (artData: any): Promise<any> => {
  const response = await apiInstance.post(`${prefix}/upload`, artData);
  return response.data;
};

export const getArtwork = async (id: any): Promise<any> => {
  const response = await apiInstance.get(`${prefix}/getById/${id}`);
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

// Example API call
export const getPaginatedArtworks = async (params: any) => {
  const query = new URLSearchParams(params).toString();
  const response = await apiInstance.get(`${prefix}?${query}`);
  if (response.status < 200 || response.status >= 300)
    throw new Error("Failed to fetch artworks");
  return response.data;
};

// export const getArtworks = async (isAuthenticated: boolean) => {
//   return isAuthenticated
//     ? await getPaginatedArtworks()
//     : await getLimitedArtworks(3);
// };

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

export const getTopLikedArtworks = async (
  artworkId: string
): Promise<CommentDto[]> => {
  return apiInstance
    .get<CommentDto[]>(`/api/comments?targetId=${artworkId}&targetType=ARTWORK`)
    .then((res) => res.data);
};

export const currentUserArtworks = async (): Promise<Artwork> => {
  const response = await apiInstance.get(`${prefix}/currentUserArtworks`);
  return response.data;
};
