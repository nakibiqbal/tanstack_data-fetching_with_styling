import React from "react";

export default function Home() {
  return (
    <section className="bg-black flex justify-center items-center w-full h-screen text-red-700">
      <nav>
        <ul>
          <li className="text-5xl font-bold">
            <a href="/posts">Posts</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
