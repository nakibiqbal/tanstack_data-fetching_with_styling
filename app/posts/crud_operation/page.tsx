"use client";
import { deletePost, fetchPaginationFunction } from "@/app/API/api";
import { Post } from "@/app/API/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
    mutationFn: deletePost,
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (currElem: Post[]) => {
        return currElem?.filter((post) => post.id !== id);
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
            <div
              key={post.id}
              className="bg-[#031246] w-full max-w-[30rem] border border-red-700 p-4"
            >
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl">{post.id}</h1>
                <h2 className="text-2xl">{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <button
                onClick={() => deleteMutation.mutate(post.id)}
                className="bg-[#031246] w-full mt-4 border border-red-700 p-2 text-center cursor-pointer"
              >
                delete
              </button>
            </div>
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
