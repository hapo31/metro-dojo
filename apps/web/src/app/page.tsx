"use client";

import Link from "next/link";
import { api } from "./_trpc/client";
import type { Character } from "@metro-dojo/api/schema";

export default function Home() {
  const { data: characters, isLoading, isError } = api.character.list.useQuery();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <p>Error loading characters.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mb-12">Metro Dojo</h1>
      <h2 className="text-3xl font-bold mb-8">Select Your Character</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters?.map((character: Character) => (
          <Link
            key={character.id}
            href={`/character/${character.id}`}
            className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 hover:bg-white/20 transition-colors"
          >
            {/* TODO: Add character images */}
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm">IMG</span>
            </div>
            <h3 className="text-xl font-bold">{character.name}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
