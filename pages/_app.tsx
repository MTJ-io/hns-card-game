import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import { registerBootlegVH } from "../utils/events";

import "../styles/globals.scss";
import { AppContainer } from "../components/AppContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    registerBootlegVH();
    smoothscroll.polyfill();
  }, []);

  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default MyApp;
