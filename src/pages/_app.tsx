import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "destyle.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Layout from "components/ui/layouts";
import { RecoilRoot } from "recoil";
import Head from "next/head";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => (
  <>
    <Head>
      <title>Astvel - DiscordVC拡張操作アプリケーション</title>
    </Head>
    <RecoilRoot>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </RecoilRoot>
  </>
);

export default MyApp;
