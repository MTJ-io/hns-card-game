import { useEffect, useState } from "react";
import classNames from "classnames";
import Head from "next/head";
import { Card } from "../components/Card";
import { FULL_CARDS_LIST } from "../components/Card/cards";
import { CardsGame } from "../components/CardsGame";
import styles from "../styles/pages/Home.module.scss";
import { ReactComponent as HandSvg } from "../assets/hand.svg";
import { tickUpdate } from "../utils/utils";
import { useWindowDimensions } from "../utils/hooks";

export default function Home() {
  const { height, bodyHeight } = useWindowDimensions();
  const [promptHide, setPromptHide] = useState(false);

  useEffect(() => {
    const onScroll = tickUpdate(() => {
      setPromptHide(window.scrollY > bodyHeight - height * 1.5);
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [height, bodyHeight]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.play}>
          <div className={styles.content}>
            <CardsGame />
          </div>
        </div>
        <div className={styles.cards}>
          {FULL_CARDS_LIST.map((obj, idx) => {
            return <Card key={idx} {...obj} autoFlip={(idx + 1) * 50} />;
          })}

          <div
            className={classNames(styles.prompt, { [styles.hide]: promptHide })}
          >
            More
            <HandSvg />
          </div>
        </div>
      </main>
    </div>
  );
}
