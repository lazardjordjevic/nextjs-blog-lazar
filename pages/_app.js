import { useEffect } from "react";
import { applyPolyfills, defineCustomElements } from "lazer-component/loader";

import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

import "../styles/globals.scss";
function MyApp({ Component, pageProps }) {
  useKeyboardNavigation();
  useEffect(() => {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
