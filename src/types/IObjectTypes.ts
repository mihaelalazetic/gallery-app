export interface IUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  roles: Array<{ name: string }>;

  profilePictureUrl: string;
  bio?: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignupRequest {
  username: string;
  email: string;
  fullName: string;
  confirmPassword: string;
  password: string;
  role: string;
  profilePictureUrl?: string;
  bio?: string;
  accountType?: string;
}

export interface CommentDto {
  id: string;
  author: string;
  user: Artist;
  text: string;
  createdAt: string;
}

export interface Artist {
  id: string;
  fullName: string;
  slug: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
  profileImage: string;
  totalLikes: number;
  totalComments: number;
  followerCount: number;
  artCount: number;
  artworks: ArtworkDto[];
  isFollowing: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  imageUrls: string[];
  artist: Artist;
  likes: number;
  liked: boolean;
  price: number;
  dimensions: string;
  description: string;
  comments: Comment[];
  commentCount: number;
  categories: string[];
}

// src/api/types.ts
export interface FeaturedArtistDTO {
  id: string;
  fullName: string;
  profilePictureUrl: string;
  birthYear: number;
  bio: string;
}

export interface ArtworkDto {
  artist: string;
  liked: boolean;
  price: number;
  dimensions: string;
  id: string;
  title: string;
  imageUrls: string[];
  likes: number;
}
