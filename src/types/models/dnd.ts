import { Member, Team } from "./data";

export type GroupChannelType = {
  type: "channel";
  channelId: number;
} & (
  | {
      categoryType: "noCategory";
      categoryId: null;
    }
  | {
      categoryType: "category";
      categoryId: number;
    }
);

export type GroupNoSelectType = {
  type: "noSelect";
};

export type GroupTeamType = {
  type: "team";
  teamId: number;
};

export type GroupType = GroupChannelType | GroupNoSelectType | GroupTeamType;

export type DragDataType = {
  group: GroupType;
} & (
  | {
      dataType: "member";
      data: Member;
    }
  | {
      dataType: "team";
      data: Team;
    }
);

export type DropDataType = {
  group: GroupType;
};
