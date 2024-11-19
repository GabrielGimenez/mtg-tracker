// src/components/forms/deck-form.tsx
"use client";

import { useState } from "react";
import { createDeck } from "@/lib/actions";
import { Player } from "@prisma/client";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { ColorPicker } from "@/components/ui/color-picker";
import { toast } from "sonner";

interface DeckFormProps {
  players: Player[];
}

export function DeckForm({ players }: DeckFormProps) {
  const [colorIdentity, setColorIdentity] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  if (!players || players.length === 0) {
    return <div>No players available. Please add players first.</div>;
  }

  const playerOptions = players.map((player) => ({
    value: player.id.toString(),
    label: player.name,
  }));

  const handleSubmit = async (formData: FormData) => {
    formData.append("colorIdentity", colorIdentity);
    formData.append("playerId", selectedPlayer);

    try {
      await createDeck(formData);
      toast.success("Deck created successfully!");
      setColorIdentity("");
      setSelectedPlayer("");
      (document.getElementById("deck-form") as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to create deck");
    }
  };

  return (
    <form id="deck-form" action={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Player
              </label>
              <div className="mt-2">
                <SearchableSelect
                  options={playerOptions}
                  value={selectedPlayer}
                  onChange={setSelectedPlayer}
                  placeholder="Select player"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="commander"
                className="block text-sm font-medium text-gray-700"
              >
                Commander
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="commander"
                  id="commander"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Color Identity
              </label>
              <div className="mt-2">
                <ColorPicker
                  value={colorIdentity}
                  onChange={setColorIdentity}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="partner"
                className="block text-sm font-medium text-gray-700"
              >
                Partner (optional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="partner"
                  id="partner"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="companion"
                className="block text-sm font-medium text-gray-700"
              >
                Companion (optional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="companion"
                  id="companion"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="moxfieldUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Moxfield URL (optional)
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  name="moxfieldUrl"
                  id="moxfieldUrl"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={() =>
              (document.getElementById("deck-form") as HTMLFormElement).reset()
            }
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Deck
          </button>
        </div>
      </div>
    </form>
  );
}
