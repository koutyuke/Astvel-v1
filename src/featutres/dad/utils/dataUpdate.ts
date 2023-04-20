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
          const changeCategory = newDestinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );

          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyMembers = changeChannel?.members.filter(member => member.id !== changeTarget.id);

          if (changeCategory !== undefined && changeChannel !== undefined && copyMembers !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: [
                  ...newDestinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
                  {
                    ...changeCategory,
                    channels: [
                      ...changeCategory.channels.filter(channel => channel.id !== targetChannelId),
                      {
                        ...changeChannel,
                        members: copyMembers,
                      },
                    ],
                  },
                ],
              },
            };
          }
        } else if (activeData.group.categoryType === "noCategory") {
          const changeChannel = newDestinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyMembers = changeChannel?.members.slice().filter(member => member.id !== changeTarget.id);

          if (changeChannel !== undefined && copyMembers !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: [
                    ...newDestinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      members: copyMembers,
                    },
                  ],
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
        const changeTeam = newTeamsData.data.find(team => team.id === targetTeamId);
        const copyMembers = changeTeam?.members.slice().filter(member => member.id !== changeTarget.id);

        if (changeTeam !== undefined && copyMembers !== undefined) {
          newTeamsData = {
            ...newTeamsData,
            data: [
              ...newTeamsData.data.filter(team => team.id !== targetTeamId),
              {
                ...changeTeam,
                members: copyMembers,
              },
            ],
          };
        }
      }

      // 追加処置
      if (overData.group.type === "channel") {
        const targetChannelId = overData.group.channelId;
        const targetCategoryId = overData.group.categoryId;

        if (overData.group.categoryType === "category") {
          const changeCategory = newDestinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );
          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyMembers = changeChannel?.members.slice();
          copyMembers?.push(changeTarget);

          if (changeCategory !== undefined && changeChannel !== undefined && copyMembers !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: [
                  ...newDestinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
                  {
                    ...changeCategory,
                    channels: [
                      ...changeCategory.channels.filter(channel => channel.id !== targetChannelId),
                      {
                        ...changeChannel,
                        members: copyMembers,
                      },
                    ],
                  },
                ],
              },
            };
          }
        } else if (overData.group.categoryType === "noCategory") {
          const changeChannel = newDestinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyMembers = changeChannel?.members.slice();
          copyMembers?.push(changeTarget);

          if (changeChannel !== undefined && copyMembers !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: [
                    ...newDestinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      members: copyMembers,
                    },
                  ],
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
        const changeTeam = newTeamsData.data.find(team => team.id === targetTeamId);
        const copyMembers = changeTeam?.members.slice();
        copyMembers?.push(changeTarget);

        if (changeTeam !== undefined && copyMembers !== undefined) {
          newTeamsData = {
            ...newTeamsData,
            data: [
              ...newTeamsData.data.filter(team => team.id !== targetTeamId),
              {
                ...changeTeam,
                members: copyMembers,
              },
            ],
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
          const changeCategory = newDestinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );

          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyTeams = changeChannel?.teams.filter(team => team.id !== changeTarget.id);

          if (changeCategory !== undefined && changeChannel !== undefined && copyTeams !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: [
                  ...newDestinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
                  {
                    ...changeCategory,
                    channels: [
                      ...changeCategory.channels.filter(channel => channel.id !== targetChannelId),
                      {
                        ...changeChannel,
                        teams: copyTeams,
                      },
                    ],
                  },
                ],
              },
            };
          }
        } else if (activeData.group.categoryType === "noCategory") {
          const changeChannel = newDestinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyTeams = changeChannel?.teams.slice().filter(team => team.id !== changeTarget.id);

          if (changeChannel !== undefined && copyTeams !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: [
                    ...newDestinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      teams: copyTeams,
                    },
                  ],
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
          const changeCategory = newDestinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );
          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyTeams = changeChannel?.teams.slice();
          copyTeams?.push(changeTarget);

          // console.log(changeCategory, changeChannel,copyTeams)

          if (changeCategory !== undefined && changeChannel !== undefined && copyTeams !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                categories: [
                  ...newDestinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
                  {
                    ...changeCategory,
                    channels: [
                      ...changeCategory.channels.filter(channel => channel.id !== targetChannelId),
                      {
                        ...changeChannel,
                        teams: copyTeams,
                      },
                    ],
                  },
                ],
              },
            };

            // console.log("ok")
          }
        } else if (overData.group.categoryType === "noCategory") {
          const changeChannel = newDestinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyTeams = changeChannel?.teams.slice();
          copyTeams?.push(changeTarget);

          if (changeChannel !== undefined && copyTeams !== undefined) {
            newDestinationChannelsData = {
              ...newDestinationChannelsData,
              data: {
                ...newDestinationChannelsData.data,
                noCategory: {
                  ...newDestinationChannelsData.data.noCategory,
                  channels: [
                    ...newDestinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      teams: copyTeams,
                    },
                  ],
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
