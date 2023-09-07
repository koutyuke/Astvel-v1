import { useValidatedSession } from "hooks/useValidatedSession";
import { swrDiscordFetcher } from "libs/axios";
import useSWR from "swr";
import { APIUserGuild } from "types/api/astvel";

const useCurrentUserGuilds = () => {
  const { session } = useValidatedSession();

  return useSWR<APIUserGuild[]>(
    session.success
      ? {
          path: "/users/@me/guilds",
          token: session.data.accessToken,
        }
      : null,
    swrDiscordFetcher,
  );
};

export { useCurrentUserGuilds };
