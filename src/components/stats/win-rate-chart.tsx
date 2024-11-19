"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MatchWithDecks } from "@/types";

interface WinRateChartProps {
  matches: MatchWithDecks[];
}

export function WinRateChart({ matches }: WinRateChartProps) {
  const monthlyWinRates = matches.reduce(
    (acc, match) => {
      const monthYear = match.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = {
          month: monthYear,
          threePlayer: { wins: 0, total: 0 },
          fourPlayer: { wins: 0, total: 0 },
        };
      }

      if (match.decks.length === 3) {
        acc[monthYear].threePlayer.total++;
        if (match.decks.some((d) => d.isWinner)) {
          acc[monthYear].threePlayer.wins++;
        }
      } else if (match.decks.length === 4) {
        acc[monthYear].fourPlayer.total++;
        if (match.decks.some((d) => d.isWinner)) {
          acc[monthYear].fourPlayer.wins++;
        }
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  const data = Object.entries(monthlyWinRates).map(([month, stats]) => ({
    month,
    "3P Win Rate":
      stats.threePlayer.total > 0
        ? (stats.threePlayer.wins / stats.threePlayer.total) * 100
        : 0,
    "4P Win Rate":
      stats.fourPlayer.total > 0
        ? (stats.fourPlayer.wins / stats.fourPlayer.total) * 100
        : 0,
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
          <YAxis
            label={{
              value: "Win Rate %",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="3P Win Rate"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="4P Win Rate"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
