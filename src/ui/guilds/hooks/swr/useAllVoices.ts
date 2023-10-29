import { useValidatedSession } from "hooks/useValidatedSession";
import { swrAstvelFetcher } from "libs/axios";
import useSWR from "swr";
import { APIVoice } from "types/api/astvel";

const useAllVoices = (guildId: string | undefined) => {
  const { session } = useValidatedSession();

  return useSWR<APIVoice[]>(
    session.success && guildId
      ? {
          url: "/api/channels/voices/all",
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

export { useAllVoices };
