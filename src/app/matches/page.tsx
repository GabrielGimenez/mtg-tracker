import { prisma } from "@/lib/db";
import { MatchForm } from "@/components/forms/match-form";
import { MatchFilters } from "@/components/match-filters";
import { MatchList } from "@/components/match-list";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { playerId, deckId, players, dateFrom, dateTo } = searchParams;

  const where = {
    AND: [
      playerId
        ? {
            decks: {
              some: {
                deck: {
                  playerId: parseInt(playerId),
                },
              },
            },
          }
        : {},
      deckId
        ? {
            decks: {
              some: {
                deckId: parseInt(deckId),
              },
            },
          }
        : {},
      players
        ? {
            decks: {
              _count: parseInt(players),
            },
          }
        : {},
      dateFrom
        ? {
            createdAt: {
              gte: new Date(dateFrom),
            },
          }
        : {},
      dateTo
        ? {
            createdAt: {
              lte: new Date(dateTo),
            },
          }
        : {},
    ],
  };

  const [matches, decks, playersList] = await Promise.all([
    prisma.match.findMany({
      where,
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
        createdAt: "desc",
      },
    }),
    prisma.deck.findMany({
      include: {
        player: true,
      },
    }),
    prisma.player.findMany(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Matches</h1>
      <MatchForm decks={decks} />
      <MatchFilters players={playersList} decks={decks} />
      <MatchList matches={matches} />
    </div>
  );
}
