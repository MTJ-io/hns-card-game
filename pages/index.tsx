import { useEffect, useLayoutEffect, useState } from "react";
import classNames from "classnames";
import Head from "next/head";
import { Card, CardObject } from "../components/Card";
import { FULL_CARDS_LIST } from "../components/Card/cards";
import { CardsGame } from "../components/CardsGame";
import styles from "../styles/pages/Home.module.scss";
import { ReactComponent as HandSvg } from "../assets/hand.svg";
import { tickUpdate } from "../utils/utils";
import { useTransitionMount, useWindowDimensions } from "../utils/hooks";
import { Modal } from "../components/Modal";
import { CardInfo } from "../components/CardInfo";
import { useAppContext } from "../components/AppContext";

export default function Home() {
  const { height, bodyHeight } = useWindowDimensions();
  const [promptHide, setPromptHide] = useState(false);
  const { open, setOpen, setCard, loaded } = useAppContext();
  const [show, setShow] = useState(false);

  const transition = useTransitionMount();

  useEffect(() => {
    const onScroll = tickUpdate(() => {
      setPromptHide(window.scrollY > bodyHeight - height * 1.5);
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [height, bodyHeight]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    <div id="app" className={styles.container}>
      <Head>
        <title>Felix Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loaded && <div className={classNames(styles.loading)}>Loading...</div>}

      <main
        className={classNames(
          styles.main,
          { [styles.loaded]: show },
          { [styles.transition]: transition }
        )}
      >
        <div className={styles.play}>
          <div className={styles.content}>
            <CardsGame />
          </div>
        </div>
        <div className={styles.cards}>
          {FULL_CARDS_LIST.map((obj, idx) => {
            return (
              <Card
                key={idx}
                {...obj}
                alt={obj.card === "rules1"}
                autoFlip={loaded && (idx + 1) * 50}
                load={loaded}
                onClick={() => {
                  setCard({
                    suit: obj.suit,
                    card: obj.card,
                  });

                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      setOpen(true);
                    });
                  });
                }}
              />
            );
          })}

          <div
            className={classNames(styles.prompt, { [styles.hide]: promptHide })}
          >
            More
            <HandSvg />
          </div>
        </div>

        <Modal onClose={() => setOpen(false)} open={open}>
          <CardInfo />
        </Modal>
      </main>
    </div>
  );
}
