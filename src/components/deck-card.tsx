import { Card, CardHeader, CardContent } from "./ui/card";
import { getColorSymbols, cn } from "@/lib/utils";
import { Deck } from "@prisma/client";

interface DeckCardProps {
  deck: Deck & {
    player: { name: string };
    _count?: { matches: number; wins: number };
  };
}

export function DeckCard({ deck }: DeckCardProps) {
  const winRate = deck._count
    ? ((deck._count.wins / deck._count.matches) * 100).toFixed(1)
    : null;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{deck.commander}</h3>
            <p className="text-sm text-gray-500">{deck.player.name}</p>
          </div>
          <div className="text-2xl">{getColorSymbols(deck.colorIdentity)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {deck.partner && (
            <p className="text-sm">
              <span className="font-medium">Partner:</span> {deck.partner}
            </p>
          )}
          {deck.companion && (
            <p className="text-sm">
              <span className="font-medium">Companion:</span> {deck.companion}
            </p>
          )}
          {winRate && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>Win Rate</span>
              <span
                className={cn(
                  "font-medium",
                  parseFloat(winRate) >= 60
                    ? "text-green-600"
                    : parseFloat(winRate) >= 45
                      ? "text-yellow-600"
                      : "text-red-600",
                )}
              >
                {winRate}%
              </span>
            </div>
          )}
        </div>
        {deck.moxfieldUrl && (
          <a
            href={deck.moxfieldUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
          >
            View Decklist
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
