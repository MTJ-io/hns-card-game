import React, { useCallback, useEffect, useMemo, useState } from "react";

import classNames from "classnames";

import { Card, CardObject } from "../Card";
import styles from "./CardInfo.module.scss";

import data from "../../script/data.json";

import { ReactComponent as ArrowSvg } from "../../assets/arrow-right.svg";
import { FULL_CARDS_LIST } from "../Card/cards";
import { useAppContext } from "../AppContext";
import { HubAudioPlayer } from "../HubAudioPlayer";

const CardInfo: React.FC = () => {
  const { card, setCard } = useAppContext();
  const [audioFile, setAudioFile] = useState<false | string>(false);

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
    setAudioFile(false);
    setCard(card);

    const cont = new AbortController();
    fetch(`/audio/${card.suit}/${card.card}.mp3`, {
      signal: cont.signal,
    })
      .then((resp) => {
        if (resp.status === 200) {
          setAudioFile(`/audio/${card.suit}/${card.card}.mp3`);
        }
      })
      .catch(() => {});

    return () => cont.abort();
  }, [card]);

  const isRules = useMemo(() => {
    return card.suit === "common" && card.card === "rules1";
  }, [card.suit, card.card]);

  return (
    <div className={styles.info}>
      <div className={styles.left}>
        {card && <Card className={styles.card} {...card} flipped />}
      </div>

      <div className={styles.right}>
        <div className={styles.fakeCard}>
          <div className={styles.fakeCardInside}>
            <div className={styles.fakeCardContent}>
              {isRules ? (
                <div className={styles.rules}>
                  <span className={styles.rulesTitle}>
                    Rules that everyone can understand
                  </span>
                  <ul>
                    <li>
                      It’s clear what different cards do, and what the cards
                      mean
                    </li>
                    <li>
                      Pictures can really help, big numbers can be confusing
                    </li>
                    <li>
                      Have different sets of rules, so players can play in a way
                      that’s fun for everyone
                    </li>
                  </ul>

                  <span className={styles.rulesTitle}>
                    Games that everyone can win
                  </span>
                  <ul>
                    <li>Everyone can win bingo, it’s down to luck</li>
                    <li>Games can have more than one winner</li>
                    <li>
                      You can play for a set time then stop – remember “Play is
                      the Point”!
                    </li>
                    <li>
                      Recognise different players’ achievements, not just win or
                      lose.
                    </li>
                  </ul>

                  {audioFile && (
                    <HubAudioPlayer src={audioFile} label="Listen" />
                  )}
                </div>
              ) : (
                <>
                  <span className={styles.title}>{cardData.title}</span>
                  <span className={styles.artist}>By {cardData.artist}</span>
                  <p className={styles.description}>{cardData.description}</p>

                  {audioFile && (
                    <HubAudioPlayer src={audioFile} label="Listen" />
                  )}
                </>
              )}
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
