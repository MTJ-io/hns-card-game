import React, { useCallback, useEffect, useMemo, useState } from "react";

import classNames from "classnames";

import { Card, CardObject } from "../Card";
import styles from "./CardInfo.module.scss";

import data from "../../script/data.json";

import { ReactComponent as ArrowSvg } from "../../assets/arrow-right.svg";
import { FULL_CARDS_LIST } from "../Card/cards";
import { useAppContext } from "../AppContext";

const CardInfo: React.FC = () => {
  const { card, setCard } = useAppContext();

  const cardData = useMemo(() => {
    return data[card.suit][card.card] || false;
  }, [card]);

  const currentIndex = useMemo(() => {
    if (!card) {
      return 0;
    }

    const idx = FULL_CARDS_LIST.findIndex(
      (c) => card.suit === c.suit && card.card === c.card
    );

    return idx >= 0 ? idx : 0;
  }, [card]);

  const onPrev = useCallback(() => {
    let nextIndex = currentIndex - 1;

    if (nextIndex < 0) {
      nextIndex = FULL_CARDS_LIST.length - 1;
    }

    setCard(FULL_CARDS_LIST[nextIndex]);
  }, [currentIndex]);

  const onNext = useCallback(() => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= FULL_CARDS_LIST.length) {
      nextIndex = 0;
    }

    setCard(FULL_CARDS_LIST[nextIndex]);
  }, [currentIndex]);

  useEffect(() => {
    setCard(card);
  }, [card]);

  return (
    <div className={styles.info}>
      <div className={styles.left}>
        {card && <Card className={styles.card} {...card} flipped />}
      </div>

      <div className={styles.right}>
        <div className={styles.fakeCard}>
          <div className={styles.fakeCardInside}>
            <div className={styles.fakeCardContent}>
              <span className={styles.title}>{cardData.title}</span>
              <span className={styles.artist}>By {cardData.artist}</span>
              <p className={styles.description}>{cardData.description}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onPrev}
        className={classNames(styles.arrow, styles.prev)}
      >
        <ArrowSvg />
      </button>
      <button
        onClick={onNext}
        className={classNames(styles.arrow, styles.next)}
      >
        <ArrowSvg />
      </button>
    </div>
  );
};

export { CardInfo };
