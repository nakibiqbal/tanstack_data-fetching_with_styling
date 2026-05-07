"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPaginationFunction } from "@/app/API/api";
import type { Post } from "@/app/API/types";
import Link from "next/link";
import { useState } from "react";

export default function PostsWithPagination() {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPaginationFunction(pageNumber),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="bg-black flex flex-col justify-center items-center w-full min-h-screen h-full text-red-200 p-4">
      <h1 className="mb-10">All posts are here</h1>
      {isLoading && <p>Posts are loading... </p>}
      {isError && <p>There is an error fetching the posts</p>}

      <div className="flex flex-wrap gap-2 w-full justify-center">
        {data?.map((post) => {
          return (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="bg-red-950 p-4 rounded  min-w-[280px] max-w-[280px]"
            >
              <h1 className="text-2xl font-bold mb-2">{post.id}</h1>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p>{post.body}</p>
              <p className="text-right">Read more_</p>
            </Link>
          );
        })}
      </div>

      <div className="my-5 flex gap-6 justify-center items-center">
        <button
          className="bg-red-500 rounded px-6 py-2 text-2xl pt-0 cursor-pointer"
          onClick={() => setPageNumber((prev) => prev - 6)}
          disabled={pageNumber <= 0 ? true : false}
        >
          Previous
        </button>
        {pageNumber / 6 + 1}
        <button
          className="bg-red-500 rounded px-6 py-2 text-2xl pt-0 cursor-pointer"
          onClick={() => setPageNumber((prev) => prev + 6)}
          disabled={data && data.length < 6 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
}
