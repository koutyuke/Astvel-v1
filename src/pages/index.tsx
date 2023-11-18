import { Layout } from "components/layouts";
import type { NextPageWithLayout } from "next";
import { Bot, Build, EndMessage, Hero, Linkage, App, Feature } from "ui/top/page";

const Home: NextPageWithLayout = () => (
  <div className=" h-full min-h-full w-full ">
    <Hero />
    <Build />
    <App className="mt-32" />
    <Feature className="mt-36" />
    <Bot className="mt-36" />
    <Linkage className="mt-36" />
    <EndMessage className="mt-36" />
  </div>
);

Home.getLayout = page => (
  <Layout title="Astvel - DiscordVC拡張操作アプリケーション" className="pb-32 pt-0">
    {page}
  </Layout>
);

export default Home;
