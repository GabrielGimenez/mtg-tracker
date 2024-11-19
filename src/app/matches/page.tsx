import { prisma } from "@/lib/db";
import { MatchForm } from "@/components/forms/match-form";
import { MatchFilters } from "@/components/match-filters";
import { MatchList } from "@/components/match-list";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MatchesPage(props: Props) {
  const params = await props.searchParams;
  const { playerId, deckId, players, dateFrom, dateTo } = params;

  const where = {
    AND: [
      playerId
        ? {
            decks: {
              some: {
                deck: {
                  playerId: parseInt(playerId as string),
                },
              },
            },
          }
        : {},
      deckId
        ? {
            decks: {
              some: {
                deckId: parseInt(deckId as string),
              },
            },
          }
        : {},
      players
        ? {
            decks: {
              _count: parseInt(players as string),
            },
          }
        : {},
      dateFrom
        ? {
            createdAt: {
              gte: new Date(dateFrom as string),
            },
          }
        : {},
      dateTo
        ? {
            createdAt: {
              lte: new Date(dateTo as string),
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
