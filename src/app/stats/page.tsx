import { prisma } from "@/lib/db";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlayerStats } from "@/components/stats/player-stats";
import { DeckStats } from "@/components/stats/deck-stats";
import { ColorStats } from "@/components/stats/color-stats";
import { WinRateChart } from "@/components/stats/win-rate-chart";

export default async function StatsPage() {
  const [matches, players, decks] = await Promise.all([
    prisma.match.findMany({
      include: {
        decks: {
          include: {
            deck: {
              include: {
                player: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
    prisma.player.findMany({
      include: {
        decks: {
          include: {
            matches: true,
          },
        },
      },
    }),
    prisma.deck.findMany({
      include: {
        player: true,
        matches: true,
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Statistics</h1>
      <PlayerStats players={players} matches={matches} />
      <DeckStats decks={decks} matches={matches} />
    </div>
  );
}
