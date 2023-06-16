import { atom, selectorFamily } from "recoil";
import { Member } from "types/models/data";
import { Team } from "types/models/group";
import { DestinationChannelsKey, MembersKey, NoSelectKey, TeamsKey } from "types/recoil/dnd";

export const guild = atom({
  key: "",
});

export const noSelectMembers = atom<NoSelectKey>({
  key: "noSelectMembers",
  default: {
    status: "success",
    data: {
      members: [],
      teams: [871, 870],
    },
  },
});

export const destinationChannels = atom<DestinationChannelsKey>({
  key: "destinationChannels",
  default: {
    status: "success",
    data: {
      noCategory: {
        id: 456,
        discordId: null,
        name: null,
        channels: [
          {
            id: 987,
            name: "sampleCh",
            discordId: 445,
            isPrivate: false,
            isShow: true,
            teams: [],
            members: [],
          },
          {
            id: 98700,
            name: "sa",
            discordId: 4245,
            isPrivate: false,
            isShow: true,
            teams: [],
            members: [],
          },
        ],
        isShow: true,
      },
      categories: [
        {
          id: 587,
          name: "first",
          discordId: 9876,
          isShow: true,
          channels: [
            {
              id: 9871,
              name: "sampleHo",
              discordId: 4415,
              isPrivate: false,
              isShow: true,
              teams: [87],
              members: [],
            },
          ],
        },
        {
          id: 5872,
          name: "ui",
          discordId: 98763,
          isShow: true,
          channels: [
            {
              id: 98761,
              name: "piyo",
              discordId: 44152,
              isPrivate: false,
              isShow: true,
              teams: [],
              members: [10],
            },
          ],
        },
      ],
    },
  },
});

export const teams = atom<TeamsKey>({
  key: "teams",
  default: {
    status: "success",
    data: [
      {
        id: 87,
        name: "teamA",
        iconEmoji: "😃",
        isShow: true,
        members: [],
      },
      {
        id: 871,
        name: "teamB",
        iconEmoji: "🚀",
        isShow: true,
        members: [],
      },
      {
        id: 870,
        name: "teamC",
        iconEmoji: "😄",
        isShow: true,
        members: [],
      },
    ],
  },
});

export const members = atom<MembersKey>({
  key: "members",
  default: {
    status: "success",
    data: [
      {
        id: 10,
        discordId: 219,
        name: "こうちゅけ",
        iconUrl: "https://cdn.discordapp.com/avatars/687588356875354126/94faa40856fd5f893eb7452b3bc0f898.png",
        discriminator: 9073,
        roles: [],
        isShow: true,
      },
    ],
  },
});

export const teamSelector = selectorFamily<Team | undefined, number>({
  key: "teamSelector",
  get:
    id =>
    ({ get }) => {
      const getTeams = get(teams);
      if (getTeams.status === "failure") {
        return undefined;
      }
      return getTeams.data.find(t => t.id === id);
    },
});

export const memberSelector = selectorFamily<Member | undefined, number>({
  key: "memberSelector",
  get:
    id =>
    ({ get }) => {
      const getMembers = get(members);
      if (getMembers.status === "failure") {
        return undefined;
      }
      return getMembers.data.find(t => t.id === id);
    },
});

export const teamListSelector = selectorFamily<Team[] | undefined, number[]>({
  key: "teamListSelector",
  get:
    idList =>
    ({ get }) => {
      const getTeams = get(teams);
      if (getTeams.status === "failure") {
        return undefined;
      }

      const result: Team[] = [];
      idList.forEach(id => {
        const teamData = getTeams.data.find(t => t.id === id);
        if (teamData) {
          result.push(teamData);
        }
      });
      return result;
      // return getTeams.data.filter(t => id.includes(t.id));
    },
});

export const memberListSelector = selectorFamily<Member[] | undefined, number[]>({
  key: "memberListSelector",
  get:
    idList =>
    ({ get }) => {
      const getMembers = get(members);
      if (getMembers.status === "failure") {
        return undefined;
      }

      const result: Member[] = [];
      idList.forEach(id => {
        const memberData = getMembers.data.find(t => t.id === id);
        if (memberData) {
          result.push(memberData);
        }
      });
      return result;

      // return getMembers.data.filter(t => id.includes(t.id));
    },
});
