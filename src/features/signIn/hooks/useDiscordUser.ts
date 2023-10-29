import { useValidatedSession } from "hooks/useValidatedSession";
import { swrDiscordFetcher } from "libs/axios";
import useSWR from "swr";
import { APIUser } from "types/api/astvel";

const useDiscordUser = () => {
  const { session } = useValidatedSession();

  return useSWR<APIUser>(
    session.success
      ? {
          path: "/users/@me",
          token: session.data.accessToken,
        }
      : null,
    swrDiscordFetcher,
  );
};

export { useDiscordUser };
