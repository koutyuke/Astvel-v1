import { SetterOrUpdater } from "recoil";
import { Category, NoCategory, NoSelect, Team } from "types/models/data";
import { DragDataType, DropDataType } from "types/models/dnd";
import { DestinationChannelsKey, NoSelectKey, TeamKey } from "types/recoil/keys";

type DestinationChannelsDataType = {
  status: "success";
  data: {
    noCategory: NoCategory;
    categories: Category[];
  };
};

type NoSelectMembersDataType = {
  status: "success";
  data: NoSelect;
};

type TeamsDataType = {
  status: "success";
  data: Team[];
};

type Props = {
  activeData: DragDataType | undefined;
  overData: DropDataType | undefined;
  setDestinationChannels: SetterOrUpdater<DestinationChannelsKey>;
  setNoSelectMembers: SetterOrUpdater<NoSelectKey>;
  setTeams: SetterOrUpdater<TeamKey>;
  destinationChannelsData: DestinationChannelsDataType;
  noSelectMembersData: NoSelectMembersDataType;
  teamsData: TeamsDataType;
};

const dataUpdate = ({
  activeData,
  overData,
  setDestinationChannels,
  setNoSelectMembers,
  setTeams,
  destinationChannelsData,
  noSelectMembersData,
  teamsData,
}: Props): void => {
  if (overData !== undefined && activeData !== undefined) {
    if (
      overData.group.type === "channel" &&
      activeData.group.type === "channel" &&
      overData.group.channelId === activeData.group.channelId
    ) {
      return;
    }
    if (
      overData.group.type === "team" &&
      activeData.group.type === "team" &&
      overData.group.teamId === activeData.group.teamId
    ) {
      return;
    }
    if (overData.group.type === "noSelect" && activeData.group.type === "noSelect") {
      return;
    }
    if (overData.group.type === "team" && activeData.dataType === "team") {
      return;
    }

    let newDestinationChannelsData: DestinationChannelsDataType = destinationChannelsData;
    let newNoSelectMembersData: NoSelectMembersDataType = noSelectMembersData;
    let newTeamsData: TeamsDataType = teamsData;

    if (activeData.dataType === "member") {
      const changeTarget = activeData.data;

      // 削除処理

      if (activeData.group.type === "channel") {
        const targetCategoryId = activeData.group.categoryId;
        const targetChannelId = activeData.group.channelId;

        if (activeData.group.categoryType === "category") {
          const sliceCategories = newDestinationChannelsData.data.categories.slice();
          const updateCategory = sliceCategories.find(category => category.id === targetCategoryId);
          const sliceChannels = updateCategory?.channels.slice();
          const updateChannel = sliceChannels?.find(channel => channel.id === targetChannelId);
          const sliceMembers = updateChannel?.members.slice();

          const categoryIndex = sliceCategories.findIndex(category => category.id === targetCategoryId);
          const channelIndex = sliceChannels?.findIndex(channel => channel.id === targetChannelId);
          const memberIndex = sliceMembers?.findIndex(member => member.id === changeTarget.id);

          if (
            categoryIndex !== undefined &&
            channelIndex !== undefined &&
            memberIndex !== undefined &&
            categoryIndex !== -1 &&
            channelIndex !== -1 &&
            memberIndex !== -1 &&
            sliceCategories &&
            updateCategory &&
            sliceChannels &&
            updateChannel &&
            sliceMembers
          ) {
            sliceMembers.splice(memberIndex, 1);
            sliceChannels.splice(channelIndex, 1, {
              ...updateChannel,
              members: sliceMembers,
            });
            sliceCategories.splice(categoryIndex, 1, {
              ...updateCategory,
              channels: sliceChannels,
            });
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: [...sliceCategories],
              },
            };
          }
        } else if (activeData.group.categoryType === "noCategory") {
          const sliceChannels = newDestinationChannelsData.data.noCategory.channels.slice();
          const updateChannel = sliceChannels.find(channel => channel.id === targetChannelId);
          const sliceMembers = updateChannel?.members.slice();

          const channelIndex = sliceChannels.findIndex(channel => channel.id === targetChannelId);
          const memberIndex = sliceMembers?.findIndex(member => member.id === changeTarget.id);

          if (
            channelIndex !== undefined &&
            memberIndex !== undefined &&
            channelIndex !== -1 &&
            memberIndex !== -1 &&
            sliceChannels &&
            sliceMembers &&
            updateChannel
          ) {
            sliceMembers.splice(memberIndex, 1);
            sliceChannels.splice(channelIndex, 1, {
              ...updateChannel,
              members: sliceMembers,
            });
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: [...sliceChannels],
                },
              },
            };
          }
        }
      } else if (activeData.group.type === "noSelect") {
        const copyMembers = newNoSelectMembersData.data.members.slice().filter(member => member.id !== changeTarget.id);
        newNoSelectMembersData = {
          ...newNoSelectMembersData,
          data: {
            ...newNoSelectMembersData.data,
            members: copyMembers,
          },
        };
      } else if (activeData.group.type === "team") {
        const targetTeamId = activeData.group.teamId;

        const sliceTeams = newTeamsData.data.slice();
        const updateTeam = sliceTeams.find(team => team.id === targetTeamId);
        const sliceMembers = updateTeam?.members.slice();
        const teamIndex = sliceTeams.findIndex(team => team.id === targetTeamId);
        const memberIndex = sliceMembers?.findIndex(member => member.id === changeTarget.id);

        if (
          memberIndex !== undefined &&
          teamIndex !== undefined &&
          sliceMembers &&
          sliceTeams &&
          updateTeam &&
          memberIndex !== -1 &&
          teamIndex !== -1
        ) {
          sliceMembers.splice(memberIndex, 1);
          sliceTeams.splice(teamIndex, 1, {
            ...updateTeam,
            members: sliceMembers,
          });

          newTeamsData = {
            ...newTeamsData,
            data: [...sliceTeams],
          };
        }
      }

      // 追加処置
      if (overData.group.type === "channel") {
        const targetChannelId = overData.group.channelId;
        const targetCategoryId = overData.group.categoryId;

        if (overData.group.categoryType === "category") {
          const sliceCategories = newDestinationChannelsData.data.categories.slice();
          const updateCategory = sliceCategories.find(category => category.id === targetCategoryId);
          const slcieChannels = updateCategory?.channels.slice();
          const updateChannel = slcieChannels?.find(channel => channel.id === targetChannelId);
          const sliceMembers = updateChannel?.members.slice();

          const categoryIndex = sliceCategories.findIndex(category => category.id === targetCategoryId);
          const channelIndex = slcieChannels?.findIndex(channel => channel.id === targetChannelId);

          if (
            categoryIndex !== undefined &&
            channelIndex !== undefined &&
            categoryIndex !== -1 &&
            channelIndex !== -1 &&
            sliceCategories &&
            updateCategory &&
            slcieChannels &&
            updateChannel &&
            sliceMembers
          ) {
            sliceMembers.push(changeTarget);
            slcieChannels.splice(channelIndex, 1, {
              ...updateChannel,
              members: sliceMembers,
            });
            sliceCategories.splice(categoryIndex, 1, {
              ...updateCategory,
              channels: slcieChannels,
            });

            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: sliceCategories,
              },
            };
          }
        } else if (overData.group.categoryType === "noCategory") {
          const sliceChannels = newDestinationChannelsData.data.noCategory.channels.slice();
          const updateChannel = sliceChannels.find(channel => channel.id === targetChannelId);
          const sliceMembers = updateChannel?.members.slice();

          const channelIndex = sliceChannels.findIndex(channel => channel.id === targetChannelId);

          if (channelIndex !== undefined && channelIndex !== -1 && updateChannel && sliceMembers && sliceChannels) {
            sliceMembers.push(changeTarget);
            sliceChannels.splice(channelIndex, 1, {
              ...updateChannel,
              members: sliceMembers,
            });
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: sliceChannels,
                },
              },
            };
          }
        }
      } else if (overData.group.type === "noSelect") {
        const copyMembers = newNoSelectMembersData.data.members.slice();
        copyMembers.push(changeTarget);

        newNoSelectMembersData = {
          ...newNoSelectMembersData,
          data: {
            ...newNoSelectMembersData.data,
            members: copyMembers,
          },
        };
      } else if (overData.group.type === "team") {
        const targetTeamId = overData.group.teamId;
        const sliceTeams = newTeamsData.data.slice();
        const updateTeam = sliceTeams.find(team => team.id === targetTeamId);
        const sliceMembers = updateTeam?.members.slice();
        const teamIndex = sliceTeams.findIndex(team => team.id === targetTeamId);

        if (teamIndex !== undefined && sliceMembers && sliceTeams && updateTeam && teamIndex !== -1) {
          sliceMembers.push(changeTarget);
          sliceTeams.splice(teamIndex, 1, {
            ...updateTeam,
            members: sliceMembers,
          });

          newTeamsData = {
            ...newTeamsData,
            data: sliceTeams,
          };
        }
      }
    } else if (activeData.dataType === "team") {
      const changeTarget = activeData.data;

      // 削除処理

      if (activeData.group.type === "channel") {
        const targetCategoryId = activeData.group.categoryId;
        const targetChannelId = activeData.group.channelId;

        if (activeData.group.categoryType === "category") {
          const sliceCategories = newDestinationChannelsData.data.categories.slice();
          const updateCategory = sliceCategories.find(category => category.id === targetCategoryId);
          const sliceChannels = updateCategory?.channels.slice();
          const updateChannel = sliceChannels?.find(channel => channel.id === targetChannelId);
          const sliceTeams = updateChannel?.teams.slice();

          const categoryIndex = sliceCategories.findIndex(category => category.id === targetCategoryId);
          const channelIndex = sliceChannels?.findIndex(channel => channel.id === targetChannelId);
          const memberIndex = sliceTeams?.findIndex(team => team.id === changeTarget.id);

          if (
            categoryIndex !== undefined &&
            channelIndex !== undefined &&
            memberIndex !== undefined &&
            categoryIndex !== -1 &&
            channelIndex !== -1 &&
            memberIndex !== -1 &&
            sliceCategories &&
            updateCategory &&
            sliceChannels &&
            updateChannel &&
            sliceTeams
          ) {
            sliceTeams.splice(memberIndex, 1);
            sliceChannels.splice(channelIndex, 1, {
              ...updateChannel,
              teams: sliceTeams,
            });
            sliceCategories.splice(categoryIndex, 1, {
              ...updateCategory,
              channels: sliceChannels,
            });
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: [...sliceCategories],
              },
            };
          }
        } else if (activeData.group.categoryType === "noCategory") {
          const sliceChannels = newDestinationChannelsData.data.noCategory.channels.slice();
          const updateChannel = sliceChannels.find(channel => channel.id === targetChannelId);
          const sliceTeams = updateChannel?.teams.slice();

          const channelIndex = sliceChannels.findIndex(channel => channel.id === targetChannelId);
          const teamIndex = sliceTeams?.findIndex(team => team.id === changeTarget.id);

          if (
            channelIndex !== undefined &&
            teamIndex !== undefined &&
            channelIndex !== -1 &&
            teamIndex !== -1 &&
            sliceChannels &&
            sliceTeams &&
            updateChannel
          ) {
            sliceTeams.splice(teamIndex, 1);
            sliceChannels.splice(channelIndex, 1, {
              ...updateChannel,
              teams: sliceTeams,
            });
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: [...sliceChannels],
                },
              },
            };
          }
        }
      } else if (activeData.group.type === "noSelect") {
        const copyTeams = newNoSelectMembersData.data.teams.slice().filter(team => team.id !== changeTarget.id);
        newNoSelectMembersData = {
          ...newNoSelectMembersData,
          data: {
            ...newNoSelectMembersData.data,
            teams: copyTeams,
          },
        };
      }

      // 追加処置
      if (overData.group.type === "channel") {
        const targetChannelId = overData.group.channelId;
        const targetCategoryId = overData.group.categoryId;

        if (overData.group.categoryType === "category") {
          const sliceCategories = newDestinationChannelsData.data.categories.slice();
          const updateCategory = sliceCategories.find(category => category.id === targetCategoryId);
          const slcieChannels = updateCategory?.channels.slice();
          const updateChannel = slcieChannels?.find(channel => channel.id === targetChannelId);
          const sliceTeams = updateChannel?.teams.slice();

          const categoryIndex = sliceCategories.findIndex(category => category.id === targetCategoryId);
          const channelIndex = slcieChannels?.findIndex(channel => channel.id === targetChannelId);

          if (
            categoryIndex !== undefined &&
            channelIndex !== undefined &&
            categoryIndex !== -1 &&
            channelIndex !== -1 &&
            sliceCategories &&
            updateCategory &&
            slcieChannels &&
            updateChannel &&
            sliceTeams
          ) {
            sliceTeams.push(changeTarget);
            slcieChannels.splice(channelIndex, 1, {
              ...updateChannel,
              teams: sliceTeams,
            });
            sliceCategories.splice(categoryIndex, 1, {
              ...updateCategory,
              channels: slcieChannels,
            });

            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: sliceCategories,
              },
            };
          }
        } else if (overData.group.categoryType === "noCategory") {
          const sliceChannels = newDestinationChannelsData.data.noCategory.channels.slice();
          const updateChannel = sliceChannels.find(channel => channel.id === targetChannelId);
          const sliceTeams = updateChannel?.teams.slice();

          const channelIndex = sliceChannels.findIndex(channel => channel.id === targetChannelId);

          if (channelIndex !== undefined && channelIndex !== -1 && updateChannel && sliceTeams && sliceChannels) {
            sliceTeams.push(changeTarget);
            sliceChannels.splice(channelIndex, 1, {
              ...updateChannel,
              teams: sliceTeams,
            });
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: sliceChannels,
                },
              },
            };
          }
        }
      } else if (overData.group.type === "noSelect") {
        const copyTeams = newNoSelectMembersData.data.teams.slice();
        copyTeams.push(changeTarget);
        newNoSelectMembersData = {
          ...newNoSelectMembersData,
          data: {
            ...newNoSelectMembersData.data,
            teams: copyTeams,
          },
        };
      }
    }

    setDestinationChannels(newDestinationChannelsData);
    setNoSelectMembers(newNoSelectMembersData);
    setTeams(newTeamsData);
  }
};

export default dataUpdate;
