import { APICategory, APIMember, APIVoice } from "types/api/astvel";
import { Team } from "stores/teams";
import { TravelerTeam } from "stores/travelers/type";
import { DestinationGroup, GroupType, UnselectedGroup } from "./group";

export type DndData =
  | {
      type: "member";
      data: APIMember & { parentId: string | null };
      group: GroupType;
    }
  | {
      type: "voice";
      data: APIVoice;
    }
  | {
      type: "category";
      data: APICategory;
    }
  | {
      type: "travelerTeam";
      data: TravelerTeam & { parentId: string | null };
      group: Extract<GroupType, DestinationGroup | UnselectedGroup>;
    }
  | {
      type: "team";
      data: Team;
    }
  | {
      type: "unselected";
      data: null;
    };
