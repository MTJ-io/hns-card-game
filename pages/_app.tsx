import { useEffect } from "react";
import { registerBootlegVH } from "../utils/events";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    registerBootlegVH();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
