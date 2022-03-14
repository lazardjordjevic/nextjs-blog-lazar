import "../styles/globals.scss";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

function MyApp({ Component, pageProps }) {
  useKeyboardNavigation();

  return <Component {...pageProps} />;
}

export default MyApp;
