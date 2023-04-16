import { atom } from "recoil";
import { DestinationChannelsKey, NoSelectKey, TeamKey, UserKey } from "types/recoil/keys";

export const userInfo = atom<UserKey>({
  key: "userInfo",
  default: {
    status: "noLogined",
    data: null,
  },
});

export const guild = atom({
  key: "",
});

export const noSelectMembers = atom<NoSelectKey>({
  key: "noSelectMembers",
  default: {
    status: "success",
    data: {
      members: [
        {
          id: 123,
          discordId: 123,
          name: "koutyuke",
          discriminator: 3456,
          roles: [],
          isShow: true,
          iconUrl: "https://cdn.discordapp.com/avatars/687588356875354126/94faa40856fd5f893eb7452b3bc0f898.png",
        },
      ],
      teams: [
        {
          id: 234,
          name: "hoge",
          iconEmoji: "😄",
          members: [],
          isShow: true,
        },
        {
          id: 213,
          name: "fuga",
          iconEmoji: "",
          members: [],
          isShow: true,
        },
      ],
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
            isHome: false,
            isPrivate: false,
            isShow: true,
            teams: [
              {
                id: 298,
                name: "hoge",
                iconEmoji: "🤗",
                members: [],
                isShow: true,
              },
            ],
            members: [],
          },
        ],
        isShow: true,
      },
      categories: [],
    },
  },
});

export const teams = atom<TeamKey>({
  key: "team",
  default: {
    status: "success",
    data: [],
  },
});
