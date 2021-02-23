import { CardType, CardValue } from ".";

export const CARDS = {
  CLUBS: new Array(13).fill(0).map((v, idx) => idx + 1),
  SPADES: new Array(13).fill(0).map((v, idx) => idx + 1),
  DIAMONDS: new Array(13).fill(0).map((v, idx) => idx + 1),
  HEARTS: new Array(13).fill(0).map((v, idx) => idx + 1),
  COMMON: ["back", "rules1", "joker1", "joker2"],
};

const convertToCardObject = (list: string) => {
  return CARDS[list].map((v) => ({
    suit: list.toLowerCase(),
    card: v,
  }));
};

export const CARDS_LIST: Array<{ suit: CardType; card: CardValue }> = [
  ...convertToCardObject("CLUBS"),
  ...convertToCardObject("SPADES"),
  ...convertToCardObject("DIAMONDS"),
  ...convertToCardObject("HEARTS"),
];

export const FULL_CARDS_LIST: Array<{ suit: CardType; card: CardValue }> = [
  ...convertToCardObject("COMMON"),
  ...CARDS_LIST,
];

const suitLength = CARDS_LIST.length / 4;

export const FOLDED_FULL_CARDS_LIST: Array<{
  suit: CardType;
  card: CardValue;
}> = [
  ...convertToCardObject("COMMON"),
  ...CARDS_LIST.slice(0, suitLength).flatMap((v, i) => [
    CARDS_LIST[i + suitLength * 0],
    CARDS_LIST[i + suitLength * 1],
    CARDS_LIST[i + suitLength * 2],
    CARDS_LIST[i + suitLength * 3],
  ]),
];
