import { Deck, Player, Match, MatchDeck } from "@prisma/client";

export type DeckWithPlayer = Deck & {
  player: Player;
};

export type MatchWithDecks = Match & {
  decks: (MatchDeck & {
    deck: DeckWithPlayer;
  })[];
};

export type PlayerWithDecks = Player & {
  decks: Deck[];
};
