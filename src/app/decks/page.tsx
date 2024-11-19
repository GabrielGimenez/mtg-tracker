import { prisma } from "@/lib/db";
import { DeckCard } from "@/components/deck-card";
import { DeckForm } from "@/components/forms/deck-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [decks, players] = await Promise.all([
      prisma.deck.findMany({
        include: {
          player: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.player.findMany({
        orderBy: {
          name: "asc",
        },
      }),
    ]);

    if (!players.length) {
      console.log("No players found in database");
    }

    return { decks, players };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

function LoadingState() {
  return <div>Loading...</div>;
}

function ErrorState({ error }: { error: Error }) {
  return <div className="text-red-500">Error: {error.message}</div>;
}

export default async function DecksPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Decks</h1>

      <Suspense fallback={<LoadingState />}>
        <DeckForm players={data.players} />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<LoadingState />}>
          {data.decks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Decks | MTG Tracker",
  };
}

export async function generateStaticParams() {
  return [];
}
