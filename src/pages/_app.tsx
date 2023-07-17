import "../styles/globals.scss";
import type { AppPropsWithLayout } from "next/app";
import "destyle.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? ((page: unknown) => page);
  return (
    <RecoilRoot>
      <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
    </RecoilRoot>
  );
};

export default MyApp;
