"use client";

import { api } from "./_trpc/client";

export default function Home() {
  const { data, isLoading } = api.hello.useQuery();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mb-12">
        Metro Dojo
      </h1>
      <div className="text-2xl">
        <p>Message from API: {data}</p>
      </div>
    </main>
  );
}
