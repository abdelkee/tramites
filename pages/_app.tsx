import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </QueryClientProvider>
  );
}
