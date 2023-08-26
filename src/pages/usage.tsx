import { Layout } from "components/layouts";
import { NextPageWithLayout } from "next";

const Usage: NextPageWithLayout = () => (
  <div className="flex h-full items-center justify-center text-2xl">Comming Soon....</div>
);

Usage.getLayout = page => <Layout title="Usage - Astvel">{page}</Layout>;

export default Usage;
