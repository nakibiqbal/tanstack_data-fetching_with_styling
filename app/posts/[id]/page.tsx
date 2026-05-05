"use client";

import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../API/types";

import { useParams } from "next/navigation";
import { getPostById } from "@/app/API/api";

export default function Post() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id as string),
  });

  if (isError)
    return <p> Error: {error?.message || "Something went wrong"} </p>;

  return (
    <div className="w-full h-screen bg-[#00FF00]">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 flex flex-col gap-4 justify-center items-center h-full">
          <h1 className="text-5xl">This is post number {id}</h1>
          <h2 className="text-3xl">These are the detail about the post</h2>
          <p className="text-xl">{data?.title}</p>
          <p className="text-xl">{data?.body}</p>
        </div>
      )}
    </div>
  );
}
