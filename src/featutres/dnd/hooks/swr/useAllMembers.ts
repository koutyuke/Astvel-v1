import fetcherWithBearer from "libs/axios/swrFetcher";
import { useSession } from "next-auth/react";
import sessionSchema from "schema/session";
import useSWR from "swr";
import { APIMember } from "types/api/astvel";

const useAllMembers = (guildId?: string) => {
  const { data: SESSION } = useSession();
  const session = sessionSchema.safeParse(SESSION);

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
    fetcherWithBearer,
  );
};

export default useAllMembers;
