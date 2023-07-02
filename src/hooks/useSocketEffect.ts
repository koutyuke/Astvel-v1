import { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents } from "types/socket/clientToServer";
import { ServerToClientEvents } from "types/socket/serverToClient";
// import useAllVoices from "featutres/dnd/hooks/swr/useAllVoices";
import useAllMembers from "featutres/dnd/hooks/swr/useAllMembers";
import { APIMember } from "types/api/astvel";
import getAstvelAPI from "libs/axios/getAstvelAPI";
import useValidatedSession from "./useValidatedSession";

const useSocketEffect = (guildId: string | undefined) => {
  const session = useValidatedSession();
  // const allVoices = useAllVoices(guildId);
  const allMembers = useAllMembers(guildId);

  const accessToken = session.success ? session.data.accessToken : undefined;
  const useId = session.success ? session.data.user.provider_id : undefined;

  useEffect(() => {
    if (guildId === undefined || !session.success || accessToken === undefined) {
      return;
    }
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

    socket.on("connect", () => {
      socket.emit("join", guildId);
    });

    socket.on("memberVoiceState", async (type, channelId, memberId) => {
      // console.log(type, channelId, memberId)

      const newMember = await getAstvelAPI<APIMember | null>({
        url: "/api/members",
        token: accessToken,
        params: {
          guild_id: guildId,
          user_id: useId,
          member_id: memberId,
        },
      }).catch(() => undefined);

      if (allMembers.data === undefined || allMembers.error !== undefined || newMember === undefined) {
        return;
      }
      if (type === "join") {
        if (!allMembers.data.some(member => member.id === memberId) && newMember !== null) {
          allMembers.mutate([...allMembers.data, newMember]);
        }
      } else if (type === "leave") {
        allMembers.mutate(allMembers.data.filter(member => member.id !== memberId));
      } else if (type === "move" && newMember === null) {
        allMembers.mutate(allMembers.data.filter(member => member.id !== memberId));
      }
    });
  }, [accessToken, allMembers, guildId, session.success, useId]);
};

export default useSocketEffect;
