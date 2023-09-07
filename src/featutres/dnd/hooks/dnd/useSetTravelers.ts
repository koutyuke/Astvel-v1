/* eslint-disable default-case */
import { useSetRecoilState } from "recoil";
import { DragDataType, DropDataType } from "types/models/dnd";
import { DnDMembersAtom, DnDTeamsAtom } from "stores/atom/dnd";

const useSetTravelers = () => {
  const setMembers = useSetRecoilState(DnDMembersAtom);
  const setTeams = useSetRecoilState(DnDTeamsAtom);

  return (activeData: DragDataType | undefined, overData: DropDataType | undefined) => {
    if (overData === undefined || activeData === undefined) {
      return;
    }
    if (
      overData.group.type === "channel" &&
      activeData.group.type === "channel" &&
      overData.group.id === activeData.group.id
    ) {
      return;
    }
    if (overData.group.type === "noSelect" && activeData.group.type === "noSelect") {
      return;
    }
    if (
      overData.group.type === "team" &&
      activeData.group.type === "team" &&
      overData.group.id === activeData.group.id
    ) {
      return;
    }
    if (overData.group.type === "team" && activeData.dataType === "team") {
      return;
    }

    if (activeData.dataType === "member") {
      setMembers(current =>
        current.map(member => {
          if (member.id === activeData.data.id) {
            switch (overData.group.type) {
              case "channel":
                return {
                  id: member.id,
                  attributionType: "channel",
                  attributionId: overData.group.id,
                };
              case "noSelect":
                return {
                  id: member.id,
                  attributionType: "noSelect",
                  attributionId: null,
                };
              case "team":
                return {
                  id: member.id,
                  attributionType: "team",
                  attributionId: overData.group.id,
                };
            }
          }
          return member;
        }),
      );
    } else {
      setTeams(current =>
        current.map(team => {
          if (team.id === activeData.data.id) {
            switch (overData.group.type) {
              case "channel":
                return {
                  id: team.id,
                  attributionType: "channel",
                  attributionId: overData.group.id,
                };
              case "noSelect":
                return {
                  id: team.id,
                  attributionType: "noSelect",
                  attributionId: null,
                };
            }
          }
          return team;
        }),
      );
    }
  };
};

export { useSetTravelers };
