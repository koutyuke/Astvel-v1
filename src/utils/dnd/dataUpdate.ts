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
  if (overData !== undefined && activeData !== undefined && overData.group.type !== activeData.group.type) {
    if (activeData.dataType === "member") {
      const changeTarget = activeData.data;

      // 削除処理

      if (activeData.group.type === "channel") {
        const targetCategoryId = activeData.group.categoryId;
        const targetChannelId = activeData.group.channelId;

        if (activeData.group.categoryType === "category") {
          const changeCategory = destinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );

          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyMembers = changeChannel?.members.filter(member => member.id !== changeTarget.id);

          if (changeCategory !== undefined && changeChannel !== undefined && copyMembers !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                categories: [
                  ...destinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
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
            });
          }
        } else if (activeData.group.categoryType === "noCategory") {
          const changeChannel = destinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyMembers = changeChannel?.members.slice().filter(member => member.id !== changeTarget.id);

          if (changeChannel !== undefined && copyMembers !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                noCategory: {
                  ...destinationChannelsData.data.noCategory,
                  channels: [
                    ...destinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      members: copyMembers,
                    },
                  ],
                },
              },
            });
          }
        }
      } else if (activeData.group.type === "noSelect") {
        const copyMembers = noSelectMembersData.data.members.slice().filter(member => member.id !== changeTarget.id);
        setNoSelectMembers({
          ...noSelectMembersData,
          data: {
            ...noSelectMembersData.data,
            members: copyMembers,
          },
        });
      } else if (activeData.group.type === "team") {
        const targetTeamId = activeData.group.teamId;
        const changeTeam = teamsData.data.find(team => team.id === targetTeamId);
        const copyMembers = changeTeam?.members.slice().filter(member => member.id !== changeTarget.id);

        if (changeTeam !== undefined && copyMembers !== undefined) {
          setTeams({
            ...teamsData,
            data: [
              ...teamsData.data.filter(team => team.id !== targetTeamId),
              {
                ...changeTeam,
                members: copyMembers,
              },
            ],
          });
        }
      }

      // 追加処置
      if (overData.group.type === "channel") {
        const targetChannelId = overData.group.channelId;
        const targetCategoryId = overData.group.categoryId;

        if (overData.group.categoryType === "category") {
          const changeCategory = destinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );
          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyMembers = changeChannel?.members.slice();
          copyMembers?.push(changeTarget);

          if (changeCategory !== undefined && changeChannel !== undefined && copyMembers !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                categories: [
                  ...destinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
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
            });
          }
        } else if (overData.group.categoryType === "noCategory") {
          const changeChannel = destinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyMembers = changeChannel?.members.slice();
          copyMembers?.push(changeTarget);

          if (changeChannel !== undefined && copyMembers !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                noCategory: {
                  ...destinationChannelsData.data.noCategory,
                  channels: [
                    ...destinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      members: copyMembers,
                    },
                  ],
                },
              },
            });
          }
        }
      } else if (overData.group.type === "noSelect") {
        const copyMembers = noSelectMembersData.data.members.slice();
        copyMembers.push(changeTarget);

        setNoSelectMembers({
          ...noSelectMembersData,
          data: {
            ...noSelectMembersData.data,
            members: copyMembers,
          },
        });
      } else if (overData.group.type === "team") {
        const targetTeamId = overData.group.teamId;
        const changeTeam = teamsData.data.find(team => team.id === targetTeamId);
        const copyMembers = changeTeam?.members.slice();
        copyMembers?.push(changeTarget);

        if (changeTeam !== undefined && copyMembers !== undefined) {
          setTeams({
            ...teamsData,
            data: [
              ...teamsData.data.filter(team => team.id !== targetTeamId),
              {
                ...changeTeam,
                members: copyMembers,
              },
            ],
          });
        }
      }
    } else if (activeData.dataType === "team") {
      const changeTarget = activeData.data;

      // 削除処理

      if (activeData.group.type === "channel") {
        const targetCategoryId = activeData.group.categoryId;
        const targetChannelId = activeData.group.channelId;

        if (activeData.group.categoryType === "category") {
          const changeCategory = destinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );

          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyTeams = changeChannel?.teams.filter(team => team.id !== changeTarget.id);

          if (changeCategory !== undefined && changeChannel !== undefined && copyTeams !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                categories: [
                  ...destinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
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
            });
          }
        } else if (activeData.group.categoryType === "noCategory") {
          const changeChannel = destinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyTeams = changeChannel?.teams.slice().filter(team => team.id !== changeTarget.id);

          if (changeChannel !== undefined && copyTeams !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                noCategory: {
                  ...destinationChannelsData.data.noCategory,
                  channels: [
                    ...destinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      teams: copyTeams,
                    },
                  ],
                },
              },
            });
          }
        }
      } else if (activeData.group.type === "noSelect") {
        const copyTeams = noSelectMembersData.data.teams.slice().filter(team => team.id !== changeTarget.id);
        setNoSelectMembers({
          ...noSelectMembersData,
          data: {
            ...noSelectMembersData.data,
            teams: copyTeams,
          },
        });
      }

      // 追加処置
      if (overData.group.type === "channel") {
        const targetChannelId = overData.group.channelId;
        const targetCategoryId = overData.group.categoryId;

        if (overData.group.categoryType === "category") {
          const changeCategory = destinationChannelsData.data.categories.find(
            category => category.id === targetCategoryId,
          );
          const changeChannel = changeCategory?.channels.find(channel => channel.id === targetChannelId);
          const copyTeams = changeChannel?.teams.slice();
          copyTeams?.push(changeTarget);

          // console.log(changeCategory, changeChannel,copyTeams)

          if (changeCategory !== undefined && changeChannel !== undefined && copyTeams !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                categories: [
                  ...destinationChannelsData.data.categories.filter(category => category.id !== targetCategoryId),
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
            });

            // console.log("ok")
          }
        } else if (overData.group.categoryType === "noCategory") {
          const changeChannel = destinationChannelsData.data.noCategory.channels.find(
            channel => channel.id === targetChannelId,
          );
          const copyTeams = changeChannel?.teams.slice();
          copyTeams?.push(changeTarget);

          if (changeChannel !== undefined && copyTeams !== undefined) {
            setDestinationChannels({
              ...destinationChannelsData,
              data: {
                ...destinationChannelsData.data,
                noCategory: {
                  ...destinationChannelsData.data.noCategory,
                  channels: [
                    ...destinationChannelsData.data.noCategory.channels.filter(
                      channel => channel.id !== targetChannelId,
                    ),
                    {
                      ...changeChannel,
                      teams: copyTeams,
                    },
                  ],
                },
              },
            });
          }
        }
      } else if (overData.group.type === "noSelect") {
        const copyTeams = noSelectMembersData.data.teams.slice();
        copyTeams.push(changeTarget);
        setNoSelectMembers({
          ...noSelectMembersData,
          data: {
            ...noSelectMembersData.data,
            teams: copyTeams,
          },
        });
      }
    }
  }
};

export default dataUpdate;
