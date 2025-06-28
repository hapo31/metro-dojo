"use client";

import { useParams } from "next/navigation";
import { api } from "@/app/_trpc/client";

export default function CharacterPage() {
  const params = useParams();
  const characterId = typeof params.characterId === "string" ? params.characterId : "";

  const {
    data: moves,
    isLoading: isLoadingMoves,
    isError: isErrorMoves,
  } = api.move.getMovesByCharacterId.useQuery({ characterId }, { enabled: !!characterId });

  const {
    data: character,
    isLoading: isLoadingCharacter,
    isError: isErrorCharacter,
  } = api.character.getCharacterById.useQuery({ id: characterId }, { enabled: !!characterId });

  if (isLoadingMoves || isLoadingCharacter) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <p>Loading moves...</p>
      </main>
    );
  }

  if (isErrorMoves || isErrorCharacter) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <p>Error loading character data.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 capitalize">
        {character?.name ?? characterId} 技一覧
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800">
          <thead>
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Command (Classic)</th>
              <th className="p-4 text-left">Command (Modern)</th>
              <th className="p-4 text-left">Startup</th>
              <th className="p-4 text-left">On Block</th>
              <th className="p-4 text-left">On Hit</th>
              <th className="p-4 text-left">Damage</th>
            </tr>
          </thead>
          <tbody>
            {moves?.map((move) => (
              <tr key={move.id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-4">{move.name}</td>
                <td className="p-4 font-mono">{move.commandClassic}</td>
                <td className="p-4 font-mono">{move.commandModern ?? "-"}</td>
                <td className="p-4">{move.startup}</td>
                <td className="p-4">{move.onBlock}</td>
                <td className="p-4">{move.onHit}</td>
                <td className="p-4">{move.damage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
