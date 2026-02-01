export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  website?: string;
  login?: {
    username: string;
    uuid: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
  };
}

export interface Post {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image?: string;
  thumbnail?: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  comment: string;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export type TabType = 'users' | 'posts' | 'comments' | 'albums';

export interface FilterState {
  search: string;
  userId: string;
}

