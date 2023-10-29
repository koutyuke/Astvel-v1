import { useValidatedSession } from "hooks/useValidatedSession";
import { swrAstvelFetcher } from "libs/axios";
import useSWR from "swr";
import { APICategory } from "types/api/astvel";

const useAllCategories = (guildId: string | undefined) => {
  const { session } = useValidatedSession();

  return useSWR<APICategory[]>(
    session.success && guildId
      ? {
          url: "/api/channels/categories/all",
          token: session.data.accessToken,
          params: {
            guild_id: guildId,
            user_id: session.data.user.id,
          },
        }
      : null,
    swrAstvelFetcher,
  );
};

export { useAllCategories };
