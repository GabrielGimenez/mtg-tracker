import { Card, CardHeader, CardContent } from "./ui/card";
import { getColorSymbols } from "@/lib/utils";
import type { MatchWithDecks } from "@/types";

interface MatchListProps {
  matches: MatchWithDecks[];
}

export function MatchList({ matches }: MatchListProps) {
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Card key={match.id}>
          <CardHeader>
            <h3 className="text-lg font-semibold">Match {match.id}</h3>
            <p className="text-sm text-gray-500">
              {match.createdAt.toLocaleDateString()} - {match.turns} turns
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {match.decks
                .sort((a, b) => a.position - b.position)
                .map((matchDeck) => (
                  <li key={matchDeck.id} className="flex items-center gap-2">
                    <span>#{matchDeck.position}:</span>
                    <span>{matchDeck.deck.player.name} -</span>
                    <span>{matchDeck.deck.commander}</span>
                    <span>{getColorSymbols(matchDeck.deck.colorIdentity)}</span>
                    {matchDeck.isWinner && (
                      <span className="text-yellow-500">🏆</span>
                    )}
                  </li>
                ))}
            </ul>
            {match.notes && (
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">Notes:</p>
                <p>{match.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
