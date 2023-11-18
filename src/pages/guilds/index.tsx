import type { NextPageWithLayout } from "next";
import { Layout } from "components/layouts";
import { Content, Loading } from "ui/selectGuild/page";
import { useCurrentUserGuilds } from "ui/selectGuild/hooks/useCurrentUserGuilds";
import { AccessError, NoSignIn } from "ui/root/page";
import { useValidatedSession } from "hooks/useValidatedSession";

const Guilds: NextPageWithLayout = () => {
  const { data: guilds, error, isLoading } = useCurrentUserGuilds();
  const { status: sessionState } = useValidatedSession();

  if (sessionState === "unauthenticated") {
    return <NoSignIn />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error || guilds === undefined) {
    return <AccessError />;
  }

  return <Content guilds={guilds} />;
};

Guilds.getLayout = page => (
  <Layout title="Guilds - Astvel" className="flex items-center justify-center pt-28">
    {page}
  </Layout>
);

export default Guilds;
