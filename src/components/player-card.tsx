import { Card, CardHeader, CardContent } from "./ui/card";
import Link from "next/link";
import { Player } from "@prisma/client";

interface PlayerCardProps {
  player: Player & {
    decks: { id: number }[];
  };
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{player.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Joined: {player.createdAt.toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">Decks: {player.decks.length}</p>
        <Link
          href={`/players/${player.id}/decks`}
          className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          View Decks
        </Link>
      </CardContent>
    </Card>
  );
}
