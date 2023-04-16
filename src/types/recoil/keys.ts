import { Category, Guild, NoCategory, NoSelect, Team, UserInfo } from "types/models/data";

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

export type DestinationChannelsKey = AddStatus<{
  noCategory: NoCategory;
  categories: Category[];
}>;

export type TeamKey = AddStatus<Team[]>;

export type NoSelectKey = AddStatus<NoSelect>;
