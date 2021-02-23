import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./TransformCard.module.scss";
import { Card } from "../Card";

interface TransformCardProps {
  targetSelector: string;
  show?: boolean;
  onFinish?: () => void;
  delay?: number;
  className?: string;
}

const TransformCard: React.FC<TransformCardProps> = ({
  targetSelector,
  show,
  onFinish,
  children,
  delay = 100,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [internalShow, setInternalShow] = useState(false);

  const onTransform = useCallback(() => {
    const target = document.querySelector<HTMLElement>(targetSelector);

    if (cardRef.current && target) {
      const {
        x: targetX,
        y: targetY,
        width: targetWidth,
      } = target.getBoundingClientRect();
      const {
        x: currentX,
        y: currentY,
        width: currentWidth,
      } = cardRef.current.getBoundingClientRect();

      const anim = cardRef.current.animate(
        [
          {
            transform: `translate3d(${targetX - currentX}px, ${
              targetY - currentY
            }px, 0) scale(${targetWidth / currentWidth})`,
          },
          {
            transform: `none`,
          },
        ],
        {
          duration: 250,
          delay,
        }
      );

      setTimeout(() => {
        requestAnimationFrame(() => {
          audioRef.current.play();
          setInternalShow(true);
        });
      }, delay + 100);

      anim.onfinish = () => {
        onFinish && onFinish();
      };
    }
  }, [targetSelector, onFinish, delay]);

  useEffect(() => {
    if (show && !internalShow) {
      onTransform();
    } else if (!show) {
      setInternalShow(false);
    }
  }, [show, internalShow]);

  return (
    <div
      ref={cardRef}
      className={classNames(
        styles.wrap,
        { [styles.show]: internalShow },
        className
      )}
    >
      <audio ref={audioRef} src="/audio/flip.mp3" />

      {children}
    </div>
  );
};

export { TransformCard };
