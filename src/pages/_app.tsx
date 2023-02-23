import "../styles/globals.css";
import type { AppProps } from "next/app";
import "destyle.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
