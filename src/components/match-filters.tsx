"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchableSelect } from "./ui/searchable-select";
import type { Player, Deck } from "@prisma/client";
import type { DeckWithPlayer } from "@/types";

interface MatchFiltersProps {
  players: Player[];
  decks: DeckWithPlayer[];
}

export function MatchFilters({ players, decks }: MatchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/matches?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="font-semibold">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Player
          </label>
          <SearchableSelect
            options={players.map((p) => ({
              value: p.id.toString(),
              label: p.name,
            }))}
            value={searchParams.get("playerId") || ""}
            onChange={(value) => updateFilters("playerId", value)}
            placeholder="Select player"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deck
          </label>
          <SearchableSelect
            options={decks.map((d) => ({
              value: d.id.toString(),
              label: `${d.player.name} - ${d.commander}`,
            }))}
            value={searchParams.get("deckId") || ""}
            onChange={(value) => updateFilters("deckId", value)}
            placeholder="Select deck"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Players
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchParams.get("players") || ""}
            onChange={(e) => updateFilters("players", e.target.value)}
          >
            <option value="">Any</option>
            <option value="3">3 Players</option>
            <option value="4">4 Players</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={searchParams.get("dateFrom") || ""}
              onChange={(e) => updateFilters("dateFrom", e.target.value)}
            />
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={searchParams.get("dateTo") || ""}
              onChange={(e) => updateFilters("dateTo", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
