import { Guild, Member, UserInfo } from "types/models/data";
import { DestinationChannels, NoSelect, Team } from "types/models/group";

export type UserKey =
  | {
      status: "success";
      data: UserInfo;
    }
  | {
      status: "noLogined" | "failure";
      data: null;
    };

type AddStatus<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "failure";
      data: null;
    };

export type GuildKey = AddStatus<Guild>;

export type DestinationChannelsKey = AddStatus<DestinationChannels>;

export type NoSelectKey = AddStatus<NoSelect>;

export type TeamsKey = AddStatus<Team[]>;

export type MembersKey = AddStatus<Member[]>;
