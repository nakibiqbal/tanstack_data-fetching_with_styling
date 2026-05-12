import axios from "axios";
import { Post } from "./types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  return response.status === 200 ? response.data : [];
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const fetchPaginationFunction = async (
  pageNumber: number,
): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>(
      `/posts?_start=${pageNumber}&_limit=6`,
    );
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.log("Error fetching paginated data:", error);
    return [];
  }
};

export const deletePost = async (id: number): Promise<Post[]> => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const updatePost = async (id: number): Promise<Post> => {
  const res = await api.patch(`/posts/${id}`, { title: "The data is updated" });
  return res.data;
};
