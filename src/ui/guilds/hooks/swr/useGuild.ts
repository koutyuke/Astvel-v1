import useSWR from "swr";
import { APIGuild } from "types/api/astvel";
import { useSession } from "next-auth/react";
import { swrAstvelFetcher } from "libs/axios";
import { sessionSchema } from "stores/schema/session";

const useGuild = (guildId?: string) => {
  const { data: SESSION } = useSession();
  const session = sessionSchema.safeParse(SESSION);

  return useSWR<APIGuild>(
    session.success && guildId
      ? {
          url: "/api/guilds",
          token: session.data.accessToken,
          params: {
            guild_id: guildId,
            user_id: session.data.user.provider_id,
          },
        }
      : null,
    swrAstvelFetcher,
  );
};

export { useGuild };
