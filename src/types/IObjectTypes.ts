export interface IUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  roles: Array<{ name: string }>;
  
  profilePictureUrl :string;
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


export interface IComment {
  key: string;
  user: string;
  comment: string;
  date: string;
}

export interface Comment {
  user: {
    fullName: string;
    profilePictureUrl: string;
  };
  text: string;
}

export interface Artist {
  id: string;
  fullName: string;
  profilePictureUrl: string;
  bio: string;
  profileImage: string;
  totalLikes: number;
  totalComments: number;
}


export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artist: Artist;
  likes: number;
  comments: Comment[];
}
