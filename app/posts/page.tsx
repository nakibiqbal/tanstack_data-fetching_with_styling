"use client";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../API/api";

export default function Posts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <div className="bg-black flex flex-col justify-center items-center w-full min-h-screen h-full text-red-700 p-4">
      <h1 className="mb-6 text-4xl">These all are the posts</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading posts</p>}
      <div className="flex gap-4 flex-wrap justify-center items-stretch w-full max-w-7xl">
        {data?.map((post) => {
          return (
            <div
              key={post.id}
              className="bg-[#00FF00] text-black w-[300px] p-4 rounded-md flex flex-col gap-2"
            >
              <h1 className="font-bold">{post.id}</h1>
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm">{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
