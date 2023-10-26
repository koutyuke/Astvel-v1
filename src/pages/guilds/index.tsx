import type { NextPageWithLayout } from "next";
import { Layout } from "components/layouts";
import { SelectGuild } from "ui/selectGuild";

const Guilds: NextPageWithLayout = () => {
  return <SelectGuild />;
};

Guilds.getLayout = page => <Layout title="Guilds - Astvel">{page}</Layout>;

export default Guilds;
