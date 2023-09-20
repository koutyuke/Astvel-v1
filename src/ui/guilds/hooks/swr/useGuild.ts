import useSWR from "swr";
import { APIGuild } from "types/api/astvel";
import { swrAstvelFetcher } from "libs/axios";
import { useValidatedSession } from "hooks/useValidatedSession";

const useGuild = (guildId: string | undefined) => {
  const { session } = useValidatedSession();

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
