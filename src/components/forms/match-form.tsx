"use client";

import { useState } from "react";
import { createMatch } from "@/lib/actions";
import type { DeckWithPlayer } from "@/types";

interface MatchFormProps {
  decks: DeckWithPlayer[];
}

export function MatchForm({ decks }: MatchFormProps) {
  const [winners, setWinners] = useState<number[]>([]);
  const [matchNotes, setMatchNotes] = useState("");

  const handleWinnerToggle = (position: number) => {
    setWinners((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position],
    );
  };

  async function handleSubmit(formData: FormData) {
    winners.forEach((position) => {
      formData.append(`winner_${position}`, "true");
    });
    formData.append("notes", matchNotes);

    try {
      await createMatch(formData);
      setWinners([]);
      setMatchNotes("");
      (document.getElementById("match-form") as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="match-form" action={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="turns"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Turns
        </label>
        <input
          type="number"
          name="turns"
          id="turns"
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {[1, 2, 3, 4].map((playerNum) => (
        <div key={playerNum} className="border rounded-lg p-4">
          <h4 className="text-lg font-medium mb-2">Player {playerNum}</h4>
          <div className="space-y-2">
            <select
              name={`deck_${playerNum}`}
              required={playerNum <= 2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a deck</option>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.player.name} - {deck.commander}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`winner_${playerNum}`}
                checked={winners.includes(playerNum)}
                onChange={() => handleWinnerToggle(playerNum)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`winner_${playerNum}`}
                className="text-sm text-gray-700"
              >
                Winner
              </label>
            </div>
          </div>
        </div>
      ))}

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Match Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={matchNotes}
          onChange={(e) => setMatchNotes(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Record Match
      </button>
    </form>
  );
}
