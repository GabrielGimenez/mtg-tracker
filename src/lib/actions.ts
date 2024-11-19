"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";

export async function createPlayer(formData: FormData) {
  const name = formData.get("name") as string;

  const player = await prisma.player.create({
    data: { name },
  });

  revalidatePath("/players");
  return player;
}

export async function createDeck(formData: FormData) {
  const playerId = parseInt(formData.get("playerId") as string);
  const commander = formData.get("commander") as string;
  const partner = formData.get("partner") as string;
  const companion = formData.get("companion") as string;
  const colorIdentity = formData.get("colorIdentity") as string;
  const moxfieldUrl = formData.get("moxfieldUrl") as string;

  const deck = await prisma.deck.create({
    data: {
      playerId,
      commander,
      partner: partner || null,
      companion: companion || null,
      colorIdentity: colorIdentity.toUpperCase(),
      moxfieldUrl: moxfieldUrl || null,
    },
  });

  revalidatePath("/decks");
  return deck;
}

export async function createMatch(formData: FormData) {
  const turns = parseInt(formData.get("turns") as string);
  const deck1 = parseInt(formData.get("deck_1") as string);
  const deck2 = parseInt(formData.get("deck_2") as string);
  const deck3 = formData.get("deck_3") as string;
  const deck4 = formData.get("deck_4") as string;
  const winner1 = formData.get("winner_1") === "true";
  const winner2 = formData.get("winner_2") === "true";
  const winner3 = formData.get("winner_3") === "true";
  const winner4 = formData.get("winner_4") === "true";

  const decks = [
    { deckId: deck1, position: 1, isWinner: winner1 },
    { deckId: deck2, position: 2, isWinner: winner2 },
  ];

  if (deck3)
    decks.push({
      deckId: parseInt(deck3),
      position: 3,
      isWinner: winner3,
    });

  if (deck4)
    decks.push({
      deckId: parseInt(deck4),
      position: 4,
      isWinner: winner4,
    });

  const match = await prisma.match.create({
    data: {
      turns,
      decks: {
        create: decks,
      },
    },
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
  });

  revalidatePath("/matches");
  return match;
}
