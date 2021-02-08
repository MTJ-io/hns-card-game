import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import useMeasure from "react-use-measure";

import styles from "./Card.module.scss";

export type CardType = "spades" | "hearts" | "diamonds" | "clubs" | "common";
export type CardValue = number | "joker1" | "joker2";

export type CardObject = {
  suit: CardType;
  card: CardValue;
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardObject {
  flipped?: boolean;
  autoFlip?: number;
  cardWidth?: number;
  debounceSize?: boolean;
  load?: boolean;
}

const Card: React.FC<CardProps> = ({
  flipped,
  autoFlip,
  cardWidth = 400,
  suit,
  card,
  debounceSize,
  onClick,
  className,
  load = true,
}) => {
  const [ref, bounds] = useMeasure({
    debounce: debounceSize ? 100 : undefined,
  });
  const [internalFlipped, setInternalFlipped] = useState(flipped);
  const timerRef = useRef<number>(-1);

  useEffect(() => {
    if (autoFlip) {
      timerRef.current = window.setTimeout(() => {
        setInternalFlipped(true);
      }, autoFlip);

      return () => {
        clearTimeout(timerRef.current);
      };
    }
  }, [autoFlip]);

  useEffect(() => {
    setInternalFlipped(flipped);
  }, [flipped]);

  return (
    <div
      ref={ref}
      className={classNames(
        styles.cardWrap,
        { [styles.interactive]: onClick },
        className
      )}
      role="button"
      onClick={onClick}
      style={
        {
          "--card-wrap-scale": bounds.width / cardWidth,
          "--card-width": `${bounds.width || cardWidth}px`,
          "--card-path": load ? `url('/cards/${suit}/${card}.jpg')` : "",
        } as React.CSSProperties
      }
    >
      <div
        className={classNames(styles.card, {
          [styles.flipped]: internalFlipped,
        })}
      >
        <div className={classNames(styles.face, styles.front)}>
          <div className={styles.inset} />
        </div>
        <div className={classNames(styles.face, styles.back)}>
          <div className={styles.inset} />
        </div>
      </div>
    </div>
  );
};

export { Card };
