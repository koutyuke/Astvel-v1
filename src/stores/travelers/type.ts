import { Team } from "stores/teams/type";
import { APIMember, APIVoice } from "types/api/astvel";

export type TravelerTeam = Team & { containerId: string };

export type VoiceTravelers = {
  id: APIVoice["id"];
  members: APIMember[];
  teams: TravelerTeam[];
};

export type UnselectedTravelers = {
  members: APIMember[];
  teams: TravelerTeam[];
};

export type TeamTravelers = {
  id: string;
  members: APIMember[];
};

export type TravelerSize = "small" | "regular" | "large";
