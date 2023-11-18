import { Layout } from "components/layouts";
import { useValidatedSession } from "hooks/useValidatedSession";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import { useGuild } from "ui/guilds/hooks/swr";
import { Content, Loading, NotFoundGuild } from "ui/guilds/page";
import { AccessError } from "ui/root/page";
import { NoSignIn } from "ui/root/page/noSignIn";

const Guild: NextPageWithLayout = () => {
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

Guild.getLayout = page => (
  <Layout title="Guild - Astvel" className="flex h-[1px] items-center justify-center pb-4" footerHidden>
    {page}
  </Layout>
);

export default Guild;
