import useValidatedSession from "hooks/useValidatedSession";
import fetcherWithBearer from "libs/axios/swrFetcher";
import useSWR from "swr";
import { APIUserGuild } from "types/api/astvel";

const useCurrentUserGuilds = () => {
  const session = useValidatedSession();

  return useSWR<APIUserGuild[]>(
    session.success
      ? {
          url: "https://discord.com/api/v10/users/@me/guilds",
          token: session.data.accessToken,
        }
      : null,
    fetcherWithBearer,
  );
};

export default useCurrentUserGuilds;
