import axios from "axios";
import { Post } from "./types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  return response.status === 200 ? response.data : [];
};
