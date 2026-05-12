"use client";
import { deletePost, fetchPaginationFunction, updatePost } from "@/app/API/api";
import { Post } from "@/app/API/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function CRUD_Operation() {
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPaginationFunction(pageNumber),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (currElem: Post[]) => {
        return currElem?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id: number) => updatePost(id as number),
    onSuccess: (apiData, postID) => {
      queryClient.setQueryData(["posts", pageNumber], (postsData: Post[]) => {
        return postsData?.map((post) =>
          post.id === postID ? { ...post, title: apiData.title } : post,
        );
      });
    },
  });

  return (
    <section className="bg-black flex flex-col justify-center items-center w-full min-h-screen h-full text-red-700 p-4">
      <h1 className="mb-6 text-5xl">CRUD OPERATION</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading posts</p>}

      <div className="flex justify-center items-stretch gap-[2rem] flex-wrap">
        {data?.map((post) => {
          return (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="bg-[#031246] w-full max-w-[30rem] border border-red-700 p-4"
            >
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl">{post.id}</h1>
                <h2 className="text-2xl">{post.title}</h2>
                <p>{post.body}</p>
                <p className="text-right">Read more_</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => updateMutation.mutate(post.id)}
                  className="bg-[#031246] w-full mt-4 border border-red-700 p-2 text-center cursor-pointer uppercase"
                >
                  update
                </button>
                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  className="bg-[#031246] w-full mt-4 border border-red-700 p-2 text-center cursor-pointer uppercase"
                >
                  delete
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-4 gap-4 text-2xl">
        <button
          onClick={() => setPageNumber((prev) => prev - 6)}
          disabled={pageNumber === 0}
          className="bg-[#031246] border border-red-700 py-2 px-4 text-center cursor-pointer"
        >
          Prev
        </button>
        {pageNumber / 6 + 1}
        <button
          className="bg-[#031246] py-2 px-4 border border-red-700 text-center cursor-pointer"
          onClick={() => setPageNumber((prev) => prev + 6)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
