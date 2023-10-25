import { NoCategory } from "stores/channels";
import { TravelerTeam } from "stores/travelers/type";
import { APICategory, APIMember, APIVoice } from "types/api/astvel";

export type TeamWithMembers = TravelerTeam & {
  members: APIMember[];
};

export type VoiceWithTravelers = APIVoice & {
  members: APIMember[];
  teams: TeamWithMembers[];
};

export type ChannelWithTravelers = (APICategory | NoCategory) & {
  voices: VoiceWithTravelers[];
};
