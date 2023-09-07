import { swrAstvelFetcher } from "libs/axios";
import { useSession } from "next-auth/react";
import { sessionSchema } from "stores/schema/session";
import useSWR from "swr";
import { APIVoice } from "types/api/astvel";

const useAllVoices = (guildId?: string) => {
  const { data: SESSION } = useSession();
  const session = sessionSchema.safeParse(SESSION);

  return useSWR<APIVoice[]>(
    session.success && guildId
      ? {
          url: "/api/channels/voices/all",
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

export { useAllVoices };
