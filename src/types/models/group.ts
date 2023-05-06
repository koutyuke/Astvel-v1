import { Category, NoCategory } from "./data";

export type DestinationChannels = {
  noCategory: NoCategory;
  categories: Category[];
};

export type NoSelect = {
  members: number[];
  teams: number[];
};

export type Team = {
  id: number;
  name: string;
  iconEmoji: string;
  members: number[];
  isShow: boolean;
};
