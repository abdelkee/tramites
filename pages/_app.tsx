import { AppProps } from "next/app";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
