import fetcherWithBearer from "libs/axios/swrFetcher";
import { useSession } from "next-auth/react";
import sessionSchema from "schema/session";
import useSWR from "swr";
import { APICategory } from "types/api/astvel";

const useAllCategories = (guildId?: string) => {
  const { data: SESSION } = useSession();
  const session = sessionSchema.safeParse(SESSION);

  return useSWR<APICategory[]>(
    session.success && guildId
      ? {
          url: "/api/channels/categories/all",
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

export default useAllCategories;
