import React, { useCallback, useState } from "react";
import { random, randomIndex } from "../../utils/utils";
import { Card, CardValue, CardType } from "../Card";
import { CARDS_LIST } from "../Card/cards";
import { TransformCard } from "../TransformCard";

import { ReactComponent as HandSvg } from "../../assets/hand.svg";

import styles from "./CardsGame.module.scss";
import { useAppContext } from "../AppContext";

type CardObject = {
  id: string;
  suit: CardType;
  card: CardValue;
};

const CardsGame = () => {
  const [cards, setCards] = useState<CardObject[]>([]);
  const [shownCards, setShownCards] = useState<number[]>([]);
  const { setCard, setCardPool } = useAppContext();

  const getCards = useCallback(() => {
    const getList = () => {
      const rand = [
        randomIndex(CARDS_LIST),
        randomIndex(CARDS_LIST),
        randomIndex(CARDS_LIST),
      ];
      const randUnique = [...new Set(rand)];

      if (rand.length === randUnique.length) {
        return rand.map((v) => ({
          ...CARDS_LIST[v],
          id: `${CARDS_LIST[v].card}-${CARDS_LIST[v].suit}`,
        }));
      }

      return getList();
    };

    setCards([]);
    setShownCards([]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCards(getList());
      });
    });
  }, []);

  const setShown = useCallback((idx: number) => {
    setShownCards((state) => [...state, idx]);
  }, []);

  const setDealtCards = useCallback(
    (individual: CardObject) => {
      setCardPool(cards);
      setCard(individual);
    },
    [cards]
  );

  return (
    <section className={styles.section}>
      <div className={styles.cards}>
        {cards.map((individual, idx) => {
          return (
            <div key={individual.id} className={styles.cardsItem}>
              <TransformCard
                targetSelector="#target"
                show
                onFinish={() => setShown(idx)}
                delay={(idx + 1) * 150}
                className={styles.individual}
              >
                <Card
                  // debounceSize
                  {...individual}
                  flipped={shownCards.includes(idx)}
                  onClick={() => setDealtCards(individual)}
                />
              </TransformCard>
            </div>
          );
        })}
      </div>

      <div className={styles.action}>
        <div
          id="target"
          className={styles.target}
          onClick={() => {
            getCards();
          }}
        >
          <span className={styles.draw}>
            <HandSvg /> Deal
          </span>
          <Card className={styles.targetCard} card="joker1" suit="common" />
        </div>
      </div>
    </section>
  );
};

export { CardsGame };
