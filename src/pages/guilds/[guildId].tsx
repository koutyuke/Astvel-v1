import { Layout } from "components/layouts";
import { useValidatedSession } from "hooks/useValidatedSession";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import { useGuild } from "ui/guilds/hooks/swr";
import { AccessError, Content, Loading, NotFoundGuild } from "ui/guilds/page";
import { NoSignIn } from "ui/root/page/noSignIn";

const Sample: NextPageWithLayout = () => {
  const { status: sessionState } = useValidatedSession();
  const router = useRouter();
  const guildId = router.query.guildId as string;
  const guild = useGuild(guildId);

  if (sessionState === "unauthenticated") {
    return <NoSignIn />;
  }

  if (sessionState === "loading" || guild.isLoading) {
    return <Loading />;
  }

  if (guild.data === null) {
    return <NotFoundGuild />;
  }

  if (guild.error || guild.data === undefined) {
    return <AccessError />;
  }

  return <Content guildId={guildId} />;
};

Sample.getLayout = page => (
  <Layout title="Guild - Astvel" footerHidden>
    {page}
  </Layout>
);

export default Sample;
