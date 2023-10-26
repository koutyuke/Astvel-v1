import { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents } from "types/socket/clientToServer";
import { ServerToClientEvents } from "types/socket/serverToClient";
// import useAllVoices from "featutres/dnd/hooks/swr/useAllVoices";
import { useAllMembers } from "ui/guilds/hooks/swr/useAllMembers";
import { APIMember } from "types/api/astvel";
import { astvelAPI } from "libs/axios/astvelAPI";
import { useValidatedSession } from "hooks/useValidatedSession";

const useSocketEffect = (guildId: string | undefined) => {
  const { session } = useValidatedSession();
  // const allVoices = useAllVoices(guildId);
  const allMembers = useAllMembers(guildId);

  const accessToken = session.success ? session.data.accessToken : undefined;
  const userId = session.success ? session.data.user.provider_id : undefined;

  useEffect(() => {
    if (guildId === undefined || userId === undefined || !session.success || accessToken === undefined) {
      return;
    }
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

    socket.on("connect", () => {
      socket.emit("join", guildId);
    });

    socket.on("memberVoiceState", async (type, channelId, memberId) => {
      // console.log(type, channelId, memberId)

      const newMember = await astvelAPI({
        token: accessToken,
        params: {
          guild_id: guildId,
          user_id: userId,
        },
      })
        .get<APIMember | null>("/api/members", {
          params: {
            member_id: memberId,
          },
        })
        .then(res => res.data)
        .catch(() => undefined);

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
  }, [accessToken, allMembers, guildId, session.success, userId]);
};

export { useSocketEffect };
