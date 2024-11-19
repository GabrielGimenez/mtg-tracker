import { prisma } from "@/lib/db";
import { PlayerCard } from "@/components/player-card";
import { PlayerForm } from "@/components/forms/player-form";

export default async function PlayersPage() {
  const players = await prisma.player.findMany({
    include: {
      decks: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Players</h1>
      <PlayerForm />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
