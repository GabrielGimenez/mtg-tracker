import { prisma } from "@/lib/db";
import { DeckCard } from "@/components/deck-card";
import { DeckForm } from "@/components/forms/deck-form";

export default async function DecksPage() {
  const [decks, players] = await Promise.all([
    prisma.deck.findMany({
      include: {
        player: true,
      },
    }),
    prisma.player.findMany(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Decks</h1>
      <DeckForm players={players} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}
