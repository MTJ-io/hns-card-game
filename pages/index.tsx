import Head from "next/head";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { CARDS_LIST } from "../components/Card/cards";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  const [flipped, setFlipped] = useState(false);

  // useEffect(() => {
  //   setInterval(() => {
  //     setFlipped((state) => !state);
  //   }, 2000);
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.play}>
          <div className={styles.content}>play</div>
        </div>
        <div className={styles.cards}>
          {CARDS_LIST.map((obj, idx) => {
            return <Card key={idx} {...obj} autoFlip={(idx + 1) * 50} />;
          })}
        </div>
      </main>
    </div>
  );
}
