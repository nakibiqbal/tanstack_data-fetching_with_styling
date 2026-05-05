import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-black flex justify-center items-center w-full h-screen text-red-700">
      <nav>
        <ul>
          <li className="text-5xl font-bold">
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
