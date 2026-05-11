import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-black flex justify-center items-center w-full h-screen text-red-700">
      <nav>
        <ul className="flex flex-col gap-8 text-center">
          <li className="text-5xl font-bold">
            <Link href="/posts">Posts</Link>
          </li>
          <li className="text-5xl font-bold">
            <Link href="/posts/pagination">Posts with Pagination</Link>
          </li>
          <li className="text-5xl font-bold">
            <Link href="/posts/crud_operation">Posts with CRUD Operation</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
