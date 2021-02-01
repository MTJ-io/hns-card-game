import { CardType, CardValue } from ".";

export const CARDS = {
  CLUBS: new Array(13).fill(0).map((v, idx) => idx + 1),
  SPADES: new Array(13).fill(0).map((v, idx) => idx + 1),
  DIAMONDS: new Array(13).fill(0).map((v, idx) => idx + 1),
  HEARTS: new Array(13).fill(0).map((v, idx) => idx + 1),
  COMMON: ["joker1", "joker2"],
};

const convertToCardObject = (list: string) => {
  return CARDS[list].map((v) => ({
    suit: list.toLowerCase(),
    card: v,
  }));
};

export const CARDS_LIST: Array<{ suit: CardType; card: CardValue }> = [
  ...convertToCardObject("COMMON"),
  ...convertToCardObject("CLUBS"),
  ...convertToCardObject("SPADES"),
  ...convertToCardObject("DIAMONDS"),
  ...convertToCardObject("HEARTS"),
];
