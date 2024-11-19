"use client";

import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import type { DeckWithPlayer } from "@/types";

interface ColorStatsProps {
  decks: DeckWithPlayer[];
}

export function ColorStats({ decks }: ColorStatsProps) {
  const { theme } = useTheme();

  const colorCombinations = decks.reduce(
    (acc, deck) => {
      const colors = deck.colorIdentity;
      acc[colors] = (acc[colors] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(colorCombinations).map(([colors, count]) => ({
    name: colors || "Colorless",
    value: count,
  }));

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
