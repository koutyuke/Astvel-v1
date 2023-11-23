import { Layout } from "components/layouts";
import type { NextPageWithLayout } from "next";
import { Contents } from "ui/top/page";

const Home: NextPageWithLayout = () => <Contents />;

Home.getLayout = page => (
  <Layout title="Astvel - DiscordVC拡張操作アプリケーション" className="pb-32 pt-0">
    {page}
  </Layout>
);

export default Home;
