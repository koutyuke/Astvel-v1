import { APIMember } from "types/api/astvel";
import { Team } from "types/recoil/dnd";

export type GroupType =
  | {
      type: "channel" | "team";
      id: string;
    }
  | {
      type: "noSelect";
      id: null;
    };

export type DragDataType = {
  group: GroupType;
} & (
  | {
      dataType: "member";
      data: APIMember;
    }
  | {
      dataType: "team";
      data: Team;
    }
);

export type DropDataType = {
  group: GroupType;
};
