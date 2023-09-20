import { useValidatedSession } from "hooks/useValidatedSession";
import { swrAstvelFetcher } from "libs/axios";
import useSWR from "swr";
import { APIMember } from "types/api/astvel";

const useAllMembers = (guildId: string | undefined) => {
  const { session } = useValidatedSession();

  return useSWR<APIMember[]>(
    session.success && guildId
      ? {
          url: "/api/members/all",
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

export { useAllMembers };
