import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// import { Icon } from '../Icon/Icon';
import { ReactComponent as ListeningSvg } from "../../assets/listening.svg";
import { ReactComponent as PauseSvg } from "../../assets/pause.svg";
import { clickOutside } from "../../utils/utils";
import styles from "./HubAudioPlayer.module.scss";

const secondsToTime = (input) => {
  const minutes = Math.floor(input / 60);
  const seconds = Math.round(input - minutes * 60);

  const padOut = (i) => i.toString().padStart(2, "0");

  return `${padOut(minutes)}:${padOut(seconds)}`;
};

interface HubAudioPlayerProps {
  src?: string;
  label?: string;
  className?: string;
  active?: boolean;
}

const HubAudioPlayer: React.FC<HubAudioPlayerProps> = ({
  src,
  label,
  className,
  active = true,
}) => {
  // probably need some way to stop audio if scrolled away or if another is clicked
  const [timeRemaining, setTimeRemaining] = useState("");

  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);
  const btnRef = useRef(null);
  const initialPlay = useRef(false);

  const onPlaying = useCallback((e) => {
    if (e.target.duration >= 0 && e.target.currentTime >= 0) {
      setTimeRemaining(secondsToTime(e.target.duration - e.target.currentTime));
    } else {
      setTimeRemaining("");
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (playing) {
      audioRef.current.play();

      return clickOutside(btnRef.current, () => {
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const onBtnClick = useCallback(() => {
    setPlaying((state) => !state);
    if (!playing && !initialPlay.current) {
      audioRef.current.play();
    }
  }, [playing]);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={onPlaying}
      >
        Your browser does not support the audio element.
      </audio>
      <button
        ref={btnRef}
        aria-label="Play text audio"
        onClick={onBtnClick}
        className={classNames(
          styles.wrapper,
          { [styles.playing]: playing },
          className
        )}
        tabIndex={active ? 0 : -1}
      >
        {/* {!noIndicator && (
          <span className={styles.indicator}>
            <Icon name="pause" className={styles.indicatorIcon} />
          </span>
        )} */}

        {playing ? (
          <PauseSvg className={styles.icon} />
        ) : (
          <ListeningSvg className={styles.icon} />
        )}
        {label && (
          <span className={styles.label}>
            {playing
              ? `Pause ${timeRemaining && `(-${timeRemaining})`}`
              : label}
          </span>
        )}
      </button>
    </>
  );
};

HubAudioPlayer.propTypes = {
  src: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

export { HubAudioPlayer };
