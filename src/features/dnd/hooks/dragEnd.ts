import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useSetChannels } from "stores/channels";
import { noCategoryValue } from "stores/channels/atom";
import { useSetTeams } from "stores/teams";
import { useSetTeamTravelers, useSetUnselectedTravelers, useSetVoiceTravelers } from "stores/travelers";
import { DndData } from "types/models/dnd";

const useDragEnd = () => {
  const setTeams = useSetTeams();
  const setChannels = useSetChannels();
  const setTeamTravelers = useSetTeamTravelers();
  const setUnselectedTravelers = useSetUnselectedTravelers();
  const setVoiceTravelers = useSetVoiceTravelers();

  return ({ active, over }: DragEndEvent) => {
    const activeData = active?.data.current as DndData | undefined;
    const overData = over?.data.current as DndData | undefined;

    if (activeData === undefined || overData === undefined) {
      return;
    }

    if (activeData.type === "category" && overData.type === "category") {
      setChannels(currentChannels => {
        const activeIndex = currentChannels.findIndex(channel => channel.id === activeData.data.id);
        const overIndex = currentChannels.findIndex(channel => channel.id === overData.data.id);

        return arrayMove(currentChannels, activeIndex, overIndex);
      });
    } else if (activeData.type === "voice" && overData.type === "voice") {
      setChannels(currentChannels => {
        const category = currentChannels.find(
          channel =>
            channel.id === activeData.data.parentId ||
            (channel.id === noCategoryValue.id && activeData.data.parentId === null),
        );
        const categoryIndex = currentChannels.findIndex(channel => channel.id === category?.id);
        if (category === undefined || categoryIndex === -1) {
          return currentChannels;
        }

        const activeIndex = category.voices.findIndex(voice => voice.id === activeData.data.id);
        const overIndex = category.voices.findIndex(voice => voice.id === overData.data.id);

        return [
          ...currentChannels.slice(0, categoryIndex),
          {
            ...category,
            voices: arrayMove(category.voices, activeIndex, overIndex),
          },
          ...currentChannels.slice(categoryIndex + 1),
        ];
      });
    } else if (activeData.type === "team" && overData.type === "team") {
      setTeams(currentTeams => {
        const activeIndex = currentTeams.findIndex(team => team.id === activeData.data.id);
        const overIndex = currentTeams.findIndex(team => team.id === overData.data.id);

        return arrayMove(currentTeams, activeIndex, overIndex);
      });
    } else if (activeData.type === "member" && overData.type === "member") {
      if (activeData.data.parentId === overData.data.parentId) {
        switch (activeData.group.type) {
          case "unselected":
            setUnselectedTravelers(currentTravelers => {
              return {
                ...currentTravelers,
                members: arrayMove(
                  currentTravelers.members,
                  currentTravelers.members.findIndex(member => member.id === activeData.data.id),
                  currentTravelers.members.findIndex(member => member.id === overData.data.id),
                ),
              };
            });
            break;
          case "destination":
            setVoiceTravelers(current => {
              const changeVoice = current.find(c => c.id === activeData.group.id);
              const changeVoiceIndex = current.findIndex(c => c.id === activeData.group.id);
              if (changeVoice === undefined || changeVoiceIndex === -1) {
                return current;
              }

              return [
                ...current.slice(0, changeVoiceIndex),
                {
                  ...changeVoice,
                  members: arrayMove(
                    changeVoice.members,
                    changeVoice.members.findIndex(member => member.id === activeData.data.id),
                    changeVoice.members.findIndex(member => member.id === overData.data.id),
                  ),
                },
                ...current.slice(changeVoiceIndex + 1),
              ];
            });
            break;
          case "team":
            setTeamTravelers(current => {
              const changeTeam = current.find(c => c.id === activeData.group.id);
              const changeTeamIndex = current.findIndex(c => c.id === activeData.group.id);
              if (changeTeam === undefined || changeTeamIndex === -1) {
                return current;
              }

              return [
                ...current.slice(0, changeTeamIndex),
                {
                  ...changeTeam,
                  members: arrayMove(
                    changeTeam.members,
                    changeTeam.members.findIndex(member => member.id === activeData.data.id),
                    changeTeam.members.findIndex(member => member.id === overData.data.id),
                  ),
                },
                ...current.slice(changeTeamIndex + 1),
              ];
            });
            break;
          default:
            break;
        }
      } else {
        // delete member
        switch (activeData.group.type) {
          case "unselected":
            setUnselectedTravelers(currentTravelers => {
              return {
                ...currentTravelers,
                members: currentTravelers.members.filter(member => member.id !== activeData.data.id),
              };
            });
            break;
          case "destination":
            setVoiceTravelers(current => {
              const changeVoice = current.find(c => c.id === activeData.group.id);
              const changeVoiceIndex = current.findIndex(c => c.id === activeData.group.id);
              if (changeVoice === undefined || changeVoiceIndex === -1) {
                return current;
              }

              return [
                ...current.slice(0, changeVoiceIndex),
                {
                  ...changeVoice,
                  members: changeVoice.members.filter(member => member.id !== activeData.data.id),
                },
                ...current.slice(changeVoiceIndex + 1),
              ];
            });
            break;
          case "team":
            setTeamTravelers(current => {
              const changeTeam = current.find(c => c.id === activeData.group.id);
              const changeTeamIndex = current.findIndex(c => c.id === activeData.group.id);
              if (changeTeam === undefined || changeTeamIndex === -1) {
                return current;
              }

              return [
                ...current.slice(0, changeTeamIndex),
                {
                  ...changeTeam,
                  members: changeTeam.members.filter(member => member.id !== activeData.data.id),
                },
                ...current.slice(changeTeamIndex + 1),
              ];
            });
            break;
          default:
            break;
        }

        // add member
        switch (overData.group.type) {
          case "destination":
            setVoiceTravelers(current => {
              const changeVoice = current.find(c => c.id === overData.group.id);
              const changeVoiceIndex = current.findIndex(c => c.id === overData.group.id);
              const overMemberIndex = changeVoice?.members.findIndex(member => member.id === overData.data.id);
              if (
                changeVoice === undefined ||
                overMemberIndex === undefined ||
                changeVoiceIndex === -1 ||
                overMemberIndex === -1
              ) {
                return current;
              }

              const members = changeVoice.members.slice();
              members.splice(overMemberIndex, 0, activeData.data);

              return [
                ...current.slice(0, changeVoiceIndex),
                {
                  ...changeVoice,
                  members,
                },
                ...current.slice(changeVoiceIndex + 1),
              ];
            });
            break;
          case "unselected":
            setUnselectedTravelers(currentTravelers => {
              const overMemberIndex = currentTravelers.members.findIndex(member => member.id === overData.data.id);
              if (overMemberIndex === -1) {
                return currentTravelers;
              }

              const members = currentTravelers.members.slice();
              members.splice(overMemberIndex, 0, activeData.data);

              return {
                ...currentTravelers,
                members,
              };
            });
            break;
          case "team":
            setTeamTravelers(current => {
              const changeTeam = current.find(c => c.id === overData.group.id);
              const changeTeamIndex = current.findIndex(c => c.id === overData.group.id);
              const overMemberIndex = changeTeam?.members.findIndex(member => member.id === overData.data.id);
              if (
                changeTeam === undefined ||
                overMemberIndex === undefined ||
                changeTeamIndex === -1 ||
                overMemberIndex === -1
              ) {
                return current;
              }

              const members = changeTeam.members.slice();
              members.splice(overMemberIndex, 0, activeData.data);

              return [
                ...current.slice(0, changeTeamIndex),
                {
                  ...changeTeam,
                  members,
                },
                ...current.slice(changeTeamIndex + 1),
              ];
            });
            break;
          default:
            break;
        }
      }
    } else if (activeData.type === "travelerTeam" && overData.type === "travelerTeam") {
      if (activeData.data.parentId === overData.data.parentId) {
        switch (activeData.group.type) {
          case "unselected":
            setUnselectedTravelers(currentTravelers => {
              return {
                ...currentTravelers,
                teams: arrayMove(
                  currentTravelers.teams,
                  currentTravelers.teams.findIndex(team => team.id === activeData.data.id),
                  currentTravelers.teams.findIndex(team => team.id === overData.data.id),
                ),
              };
            });
            break;

          case "destination":
            setVoiceTravelers(current => {
              const changeVoice = current.find(c => c.id === activeData.group.id);
              const changeVoiceIndex = current.findIndex(c => c.id === activeData.group.id);
              if (changeVoice === undefined || changeVoiceIndex === -1) {
                return current;
              }

              return [
                ...current.slice(0, changeVoiceIndex),
                {
                  ...changeVoice,
                  teams: arrayMove(
                    changeVoice.teams,
                    changeVoice.teams.findIndex(team => team.id === activeData.data.id),
                    changeVoice.teams.findIndex(team => team.id === overData.data.id),
                  ),
                },
                ...current.slice(changeVoiceIndex + 1),
              ];
            });
            break;
          default:
            break;
        }
      } else {
        // delete traveler team
        switch (activeData.group.type) {
          case "unselected":
            setUnselectedTravelers(currentTravelers => {
              return {
                ...currentTravelers,
                teams: currentTravelers.teams.filter(team => team.id !== activeData.data.id),
              };
            });
            break;
          case "destination":
            setVoiceTravelers(current => {
              const changeVoice = current.find(c => c.id === activeData.group.id);
              const changeVoiceIndex = current.findIndex(c => c.id === activeData.group.id);
              if (changeVoice === undefined || changeVoiceIndex === -1) {
                return current;
              }

              return [
                ...current.slice(0, changeVoiceIndex),
                {
                  ...changeVoice,
                  teams: changeVoice.teams.filter(team => team.id !== activeData.data.id),
                },
                ...current.slice(changeVoiceIndex + 1),
              ];
            });
            break;

          default:
            break;
        }

        // add traveler team
        switch (overData.group.type) {
          case "destination":
            setVoiceTravelers(current => {
              const changeVoice = current.find(c => c.id === overData.group.id);
              const changeVoiceIndex = current.findIndex(c => c.id === overData.group.id);
              const overTeamIndex = changeVoice?.teams.findIndex(team => team.id === overData.data.id);
              if (
                changeVoice === undefined ||
                overTeamIndex === undefined ||
                changeVoiceIndex === -1 ||
                overTeamIndex === -1
              ) {
                return current;
              }
              const teams = changeVoice.teams.slice();
              teams.splice(overTeamIndex, 0, activeData.data);

              return [
                ...current.slice(0, changeVoiceIndex),
                {
                  ...changeVoice,
                  teams,
                },
                ...current.slice(changeVoiceIndex + 1),
              ];
            });
            break;
          case "unselected":
            setUnselectedTravelers(currentTravelers => {
              const overTeamIndex = currentTravelers.teams.findIndex(team => team.id === overData.data.id);

              if (overTeamIndex === -1) {
                return currentTravelers;
              }

              const teams = currentTravelers.teams.slice();
              teams.splice(overTeamIndex, 0, activeData.data);

              return {
                ...currentTravelers,
                teams,
              };
            });
            break;
          default:
            break;
        }
      }
    } else if (
      activeData.type === "member" &&
      (overData.type === "voice" || overData.type === "team" || overData.type === "unselected")
    ) {
      // delete member
      switch (activeData.group.type) {
        case "unselected":
          setUnselectedTravelers(currentTravelers => {
            return {
              ...currentTravelers,
              members: currentTravelers.members.filter(member => member.id !== activeData.data.id),
            };
          });
          break;
        case "destination":
          setVoiceTravelers(current => {
            const changeVoice = current.find(c => c.id === activeData.group.id);
            const changeVoiceIndex = current.findIndex(c => c.id === activeData.group.id);
            if (changeVoice === undefined || changeVoiceIndex === -1) {
              return current;
            }

            return [
              ...current.slice(0, changeVoiceIndex),
              {
                ...changeVoice,
                members: changeVoice.members.filter(member => member.id !== activeData.data.id),
              },
              ...current.slice(changeVoiceIndex + 1),
            ];
          });
          break;
        case "team":
          setTeamTravelers(current => {
            const changeTeam = current.find(c => c.id === activeData.group.id);
            const changeTeamIndex = current.findIndex(c => c.id === activeData.group.id);
            if (changeTeam === undefined || changeTeamIndex === -1) {
              return current;
            }

            return [
              ...current.slice(0, changeTeamIndex),
              {
                ...changeTeam,
                members: changeTeam.members.filter(member => member.id !== activeData.data.id),
              },
              ...current.slice(changeTeamIndex + 1),
            ];
          });
          break;
        default:
          break;
      }

      // add member
      switch (overData.type) {
        case "voice":
          setVoiceTravelers(current => {
            const changeVoice = current.find(c => c.id === overData.data.id);
            const changeVoiceIndex = current.findIndex(c => c.id === overData.data.id);
            if (changeVoice === undefined || changeVoiceIndex === -1) {
              return current;
            }

            return [
              ...current.slice(0, changeVoiceIndex),
              {
                ...changeVoice,
                members: [...changeVoice.members, activeData.data],
              },
              ...current.slice(changeVoiceIndex + 1),
            ];
          });
          break;
        case "unselected":
          setUnselectedTravelers(currentTravelers => {
            return {
              ...currentTravelers,
              members: [...currentTravelers.members, activeData.data],
            };
          });
          break;
        case "team":
          setTeamTravelers(current => {
            const changeTeam = current.find(c => c.id === overData.data.id);
            const changeTeamIndex = current.findIndex(c => c.id === overData.data.id);
            if (changeTeam === undefined || changeTeamIndex === -1) {
              return current;
            }

            return [
              ...current.slice(0, changeTeamIndex),
              {
                ...changeTeam,
                members: [...changeTeam.members, activeData.data],
              },
              ...current.slice(changeTeamIndex + 1),
            ];
          });
          break;
        default:
          break;
      }
    } else if (activeData.type === "travelerTeam" && (overData.type === "voice" || overData.type === "unselected")) {
      // delete traveler team
      switch (activeData.group.type) {
        case "unselected":
          setUnselectedTravelers(currentTravelers => {
            return {
              ...currentTravelers,
              teams: currentTravelers.teams.filter(team => team.id !== activeData.data.id),
            };
          });
          break;
        case "destination":
          setVoiceTravelers(current => {
            const changeVoice = current.find(c => c.id === activeData.group.id);
            const changeVoiceIndex = current.findIndex(c => c.id === activeData.group.id);
            if (changeVoice === undefined || changeVoiceIndex === -1) {
              return current;
            }

            return [
              ...current.slice(0, changeVoiceIndex),
              {
                ...changeVoice,
                teams: changeVoice.teams.filter(team => team.id !== activeData.data.id),
              },
              ...current.slice(changeVoiceIndex + 1),
            ];
          });
          break;

        default:
          break;
      }

      // add traveler team
      switch (overData.type) {
        case "voice":
          setVoiceTravelers(current => {
            const changeVoice = current.find(c => c.id === overData.data.id);
            const changeVoiceIndex = current.findIndex(c => c.id === overData.data.id);
            if (changeVoice === undefined || changeVoiceIndex === -1) {
              return current;
            }

            return [
              ...current.slice(0, changeVoiceIndex),
              {
                ...changeVoice,
                teams: [...changeVoice.teams, activeData.data],
              },
              ...current.slice(changeVoiceIndex + 1),
            ];
          });
          break;
        case "unselected":
          setUnselectedTravelers(currentTravelers => {
            return {
              ...currentTravelers,
              teams: [...currentTravelers.teams, activeData.data],
            };
          });
          break;
        default:
          break;
      }
    }
  };
};

export { useDragEnd };
