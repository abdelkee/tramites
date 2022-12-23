import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "../context/AuthProvider";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const client = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
