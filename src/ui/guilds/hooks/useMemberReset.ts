import { useTeamTravelersState, useSetUnselectedTravelers, useVoiceTravelersState } from "stores/travelers";
import { TravelerTeam } from "stores/travelers/type";
import { APIMember } from "types/api/astvel";

const useMemberReset = () => {
  const [teamTravelers, teamMutater] = useTeamTravelersState();
  const unselectedMutater = useSetUnselectedTravelers();
  const [voiceTravelers, voiceMutater] = useVoiceTravelersState();

  return () => {
    const resetMembers: APIMember[] = [];
    const resetTeams = voiceTravelers.reduce<TravelerTeam[]>((acc, voice) => {
      acc.push(...voice.teams);
      return acc;
    }, []);

    teamTravelers.forEach(team => {
      resetMembers.push(...team.members);
    });

    voiceTravelers.forEach(voice => {
      resetMembers.push(...voice.members);
    });

    voiceMutater(voiceCurrent => {
      return voiceCurrent.map(voice => {
        return {
          ...voice,
          members: [],
          teams: [],
        };
      });
    });

    teamMutater(teamCurrent => {
      return teamCurrent.map(team => {
        return {
          ...team,
          members: [],
        };
      });
    });

    unselectedMutater(unselectedCurrent => {
      return {
        ...unselectedCurrent,
        members: resetMembers,
        teams: resetTeams,
      };
    });
  };
};

export { useMemberReset };
