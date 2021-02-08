import { useEffect } from "react";
import { registerBootlegVH } from "../utils/events";

import "../styles/globals.scss";
import { AppContainer } from "../components/AppContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    registerBootlegVH();
  }, []);

  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default MyApp;
