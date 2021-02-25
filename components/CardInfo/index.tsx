import React, { useCallback, useEffect, useMemo, useState } from "react";

import classNames from "classnames";

import { Card, CardObject } from "../Card";
import styles from "./CardInfo.module.scss";

import data from "../../script/data.json";

import { ReactComponent as ArrowSvg } from "../../assets/arrow-right.svg";
import { FOLDED_FULL_CARDS_LIST, FULL_CARDS_LIST } from "../Card/cards";
import { useAppContext } from "../AppContext";
import { HubAudioPlayer } from "../HubAudioPlayer";
import { ComponentSwitch } from "../ComponentSwitch";

const CardInfo: React.FC = () => {
  const { card, setCard, cardPool } = useAppContext();
  const [audioFile, setAudioFile] = useState<false | string>(false);

  const pool = useMemo(() => {
    return cardPool || FOLDED_FULL_CARDS_LIST;
  }, [cardPool]);

  const cardData = useMemo(() => {
    return data[card.suit][card.card] || false;
  }, [card]);

  const currentIndex = useMemo(() => {
    if (!card) {
      return 0;
    }

    const idx = pool.findIndex(
      (c) => card.suit === c.suit && card.card === c.card
    );

    return idx >= 0 ? idx : 0;
  }, [card, pool]);

  const onPrev = useCallback(() => {
    let nextIndex = currentIndex - 1;

    if (nextIndex < 0) {
      nextIndex = pool.length - 1;
    }

    setCard(pool[nextIndex]);
  }, [currentIndex, pool]);

  const onNext = useCallback(() => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= pool.length) {
      nextIndex = 0;
    }

    setCard(pool[nextIndex]);
  }, [currentIndex, pool]);

  useEffect(() => {
    setAudioFile(false);
    setCard(card);

    const cont = new AbortController();
    fetch(`/audio/${card.suit}/${card.card}.mp3`, {
      signal: cont.signal,
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(`/audio/${card.suit}/${card.card}.mp3`);
          setAudioFile(`/audio/${card.suit}/${card.card}.mp3`);
        }
      })
      .catch(() => {});

    return () => cont.abort();
  }, [card]);

  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      }
      if (e.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keyup", cb);

    return () => document.removeEventListener("keyup", cb);
  }, [onPrev, onNext]);

  const isRules = useMemo(() => {
    return card.suit === "common" && card.card === "rules1";
  }, [card.suit, card.card]);

  return (
    <div className={styles.info}>
      <ComponentSwitch name={`${card.card}-${card.suit}`}>
        <div className={styles.columns}>
          <div className={styles.left}>
            {isRules ? (
              <div className={styles.fakeCard}>
                <div className={styles.fakeCardInside}>
                  <div className={styles.fakeCardContent}>
                    <div className={styles.rules}>
                      <span className={styles.rulesTitle}>
                        Play is the point
                      </span>
                      <ul>
                        <li>
                          Play is personal, celebrate and explore instead of
                          judging and criticising
                        </li>
                        <li>Have fun, help other players have fun</li>
                        <li>Games where you tell stories help with this</li>
                      </ul>

                      <span className={styles.rulesTitle}>
                        Games that everyone can play
                      </span>
                      <ul>
                        <li>
                          Include people in your game, celebrate what they offer
                        </li>
                        <li>Game cards, boards and pieces are multi-sensory</li>
                        <li>
                          Players can help each other and ask for help. But they
                          can also say no!
                        </li>
                        <li>
                          Allow players to play alone, as a pair, or as a team
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              card && <Card className={styles.card} {...card} flipped />
            )}
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
                          Have different sets of rules, so players can play in a
                          way that’s fun for everyone
                        </li>
                      </ul>

                      <span className={styles.rulesTitle}>
                        Games that everyone can win
                      </span>
                      <ul>
                        <li>Everyone can win bingo, it’s down to luck</li>
                        <li>Games can have more than one winner</li>
                        <li>
                          You can play for a set time then stop – remember “Play
                          is the Point”!
                        </li>
                        <li>
                          Recognise different players’ achievements, not just
                          win or lose.
                        </li>
                      </ul>

                      <HubAudioPlayer
                        src={audioFile || undefined}
                        label="Listen"
                      />
                    </div>
                  ) : (
                    <>
                      <span className={styles.title}>{cardData.title}</span>
                      <span className={styles.artist}>
                        By {cardData.artist}
                      </span>
                      <p className={styles.description}>
                        {cardData.description}
                      </p>

                      {audioFile && (
                        <HubAudioPlayer src={audioFile} label="Listen" />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentSwitch>

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
