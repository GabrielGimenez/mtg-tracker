"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getColorSymbols } from "@/lib/utils";
import type { Deck } from "@prisma/client";
import type { DeckWithPlayer, MatchWithDecks } from "@/types";

interface DeckStatsProps {
  decks: DeckWithPlayer[];
  matches: MatchWithDecks[];
}

export function DeckStats({ decks, matches }: DeckStatsProps) {
  const deckStats = decks.map((deck) => {
    const deckMatches = matches.filter((match) =>
      match.decks.some((d) => d.deck.id === deck.id),
    );

    const totalMatches = deckMatches.length;
    const wins = deckMatches.filter((match) =>
      match.decks.some((d) => d.deck.id === deck.id && d.isWinner),
    ).length;

    const threePlayerMatches = deckMatches.filter(
      (m) => m.decks.length === 3,
    ).length;
    const fourPlayerMatches = deckMatches.filter(
      (m) => m.decks.length === 4,
    ).length;

    const threePlayerWins = deckMatches.filter(
      (m) =>
        m.decks.length === 3 &&
        m.decks.some((d) => d.deck.id === deck.id && d.isWinner),
    ).length;

    const fourPlayerWins = deckMatches.filter(
      (m) =>
        m.decks.length === 4 &&
        m.decks.some((d) => d.deck.id === deck.id && d.isWinner),
    ).length;

    return {
      deck,
      totalMatches,
      wins,
      winRate: totalMatches ? (wins / totalMatches) * 100 : 0,
      threePlayerMatches,
      threePlayerWins,
      threePlayerWinRate: threePlayerMatches
        ? (threePlayerWins / threePlayerMatches) * 100
        : 0,
      fourPlayerMatches,
      fourPlayerWins,
      fourPlayerWinRate: fourPlayerMatches
        ? (fourPlayerWins / fourPlayerMatches) * 100
        : 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Deck Statistics</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commander</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Colors</TableHead>
              <TableHead className="text-right">Matches</TableHead>
              <TableHead className="text-right">Wins</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
              <TableHead className="text-right">3P Win Rate</TableHead>
              <TableHead className="text-right">4P Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deckStats
              .filter((stats) => stats.totalMatches > 0)
              .sort((a, b) => b.winRate - a.winRate)
              .map((stats) => (
                <TableRow key={stats.deck.id}>
                  <TableCell>{stats.deck.commander}</TableCell>
                  <TableCell>{stats.deck.player.name}</TableCell>
                  <TableCell>
                    {getColorSymbols(stats.deck.colorIdentity)}
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.totalMatches}
                  </TableCell>
                  <TableCell className="text-right">{stats.wins}</TableCell>
                  <TableCell className="text-right">
                    {stats.winRate.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.threePlayerWinRate.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.fourPlayerWinRate.toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
