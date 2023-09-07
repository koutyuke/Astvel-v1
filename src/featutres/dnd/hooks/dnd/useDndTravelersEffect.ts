import { useRecoilValue, useSetRecoilState } from "recoil";
import { DnDMembersAtom, DnDTeamsAtom, TeamsAtom } from "stores/atom/dnd";
import { useEffect } from "react";
import { useAllMembers } from "../../../../ui/guilds/hooks/swr";

const useDnDTravelersEffect = (guildId: string | undefined) => {
  const allMembers = useAllMembers(guildId);
  const setDnDMembers = useSetRecoilState(DnDMembersAtom);

  const allTeams = useRecoilValue(TeamsAtom);
  const setDnDTeams = useSetRecoilState(DnDTeamsAtom);

  useEffect(() => {
    setDnDMembers(current => {
      if (allMembers.data !== undefined && allMembers.error === undefined) {
        return allMembers.data.map(
          member =>
            current.find(m => m.id === member.id) ?? {
              id: member.id,
              attributionType: "noSelect",
              attributionId: null,
            },
        );
      }
      return [];
    });
  }, [allMembers.data, allMembers.error, setDnDMembers]);

  useEffect(() => {
    setDnDTeams(current =>
      allTeams.map(
        team =>
          current.find(t => t.id === team.id) ?? {
            id: team.id,
            attributionType: "noSelect",
            attributionId: null,
          },
      ),
    );
  }, [allTeams, setDnDTeams]);
};

export { useDnDTravelersEffect };
