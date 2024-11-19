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
import type { Player, Match } from "@prisma/client";
import type { MatchWithDecks } from "@/types";

interface PlayerStatsProps {
  players: Player[];
  matches: MatchWithDecks[];
}

export function PlayerStats({ players, matches }: PlayerStatsProps) {
  const playerStats = players.map((player) => {
    const playerMatches = matches.filter((match) =>
      match.decks.some((d) => d.deck.playerId === player.id),
    );

    const totalMatches = playerMatches.length;
    const wins = playerMatches.filter((match) =>
      match.decks.some((d) => d.deck.player.id === player.id && d.isWinner),
    ).length;

    const threePlayerMatches = playerMatches.filter(
      (m) => m.decks.length === 3,
    ).length;
    const fourPlayerMatches = playerMatches.filter(
      (m) => m.decks.length === 4,
    ).length;

    const threePlayerWins = playerMatches.filter(
      (m) =>
        m.decks.length === 3 &&
        m.decks.some((d) => d.deck.player.id === player.id && d.isWinner),
    ).length;

    const fourPlayerWins = playerMatches.filter(
      (m) =>
        m.decks.length === 4 &&
        m.decks.some((d) => d.deck.player.id === player.id && d.isWinner),
    ).length;

    return {
      player,
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
        <h2 className="text-2xl font-semibold">Player Statistics</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Total Matches</TableHead>
              <TableHead className="text-right">Total Wins</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
              <TableHead className="text-right">3P Matches</TableHead>
              <TableHead className="text-right">3P Win Rate</TableHead>
              <TableHead className="text-right">4P Matches</TableHead>
              <TableHead className="text-right">4P Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playerStats
              .sort((a, b) => b.winRate - a.winRate)
              .map((stats) => (
                <TableRow key={stats.player.id}>
                  <TableCell>{stats.player.name}</TableCell>
                  <TableCell className="text-right">
                    {stats.totalMatches}
                  </TableCell>
                  <TableCell className="text-right">{stats.wins}</TableCell>
                  <TableCell className="text-right">
                    {stats.winRate.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.threePlayerMatches}
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.threePlayerWinRate.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {stats.fourPlayerMatches}
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
