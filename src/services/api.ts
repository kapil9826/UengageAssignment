import axios from 'axios';
import { User, Post, Comment, Album } from '../types';
import { getCachedData, setCachedData } from './cache';

// Use Vite proxy in development, Vercel serverless function in production
const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

export const fetchUsers = async (): Promise<User[]> => {
  const cacheKey = 'users';
  const cached = getCachedData<User[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await api.get('/users');
    const data = Array.isArray(response.data) ? response.data : [];
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  const cacheKey = `user-${id}`;
  const cached = getCachedData<User>(cacheKey);
  if (cached) return cached;

  const listCache = getCachedData<User[]>('users');
  if (listCache) {
    const found = listCache.find((u) => u.id === id);
    if (found) {
      setCachedData(cacheKey, found);
      return found;
    }
  }

  try {
    const response = await api.get(`/users/${id}`);
    const data = response.data;
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  const cacheKey = 'posts';
  const cached = getCachedData<Post[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await api.get('/posts');
    const data = Array.isArray(response.data) ? response.data : [];
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const cacheKey = `post-${id}`;
  const cached = getCachedData<Post>(cacheKey);
  if (cached) return cached;

  const listCache = getCachedData<Post[]>('posts');
  if (listCache) {
    const found = listCache.find((p) => p.id === id);
    if (found) {
      setCachedData(cacheKey, found);
      return found;
    }
  }

  try {
    const response = await api.get(`/posts/${id}`);
    const data = response.data;
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const fetchComments = async (): Promise<Comment[]> => {
  const cacheKey = 'comments';
  const cached = getCachedData<Comment[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await api.get('/comments');
    const data = Array.isArray(response.data) ? response.data : [];
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const fetchCommentById = async (id: number): Promise<Comment> => {
  const cacheKey = `comment-${id}`;
  const cached = getCachedData<Comment>(cacheKey);
  if (cached) return cached;

  const listCache = getCachedData<Comment[]>('comments');
  if (listCache) {
    const found = listCache.find((c) => c.id === id);
    if (found) {
      setCachedData(cacheKey, found);
      return found;
    }
  }

  try {
    const response = await api.get(`/comments/${id}`);
    const data = response.data;
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching comment ${id}:`, error);
    throw error;
  }
};

export const fetchAlbums = async (): Promise<Album[]> => {
  const cacheKey = 'albums';
  const cached = getCachedData<Album[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await api.get('/albums');
    const data = Array.isArray(response.data) ? response.data : [];
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const fetchAlbumById = async (id: number): Promise<Album> => {
  const cacheKey = `album-${id}`;
  const cached = getCachedData<Album>(cacheKey);
  if (cached) return cached;

  const listCache = getCachedData<Album[]>('albums');
  if (listCache) {
    const found = listCache.find((a) => a.id === id);
    if (found) {
      setCachedData(cacheKey, found);
      return found;
    }
  }

  try {
    const response = await api.get(`/albums/${id}`);
    const data = response.data;
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching album ${id}:`, error);
    throw error;
  }
};

