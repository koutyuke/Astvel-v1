import { useEffect, useMemo } from "react";
import { useTeamsValue } from "stores/teams";
import {
  TeamTravelers,
  VoiceTravelers,
  useTeamTravelersState,
  useSetUnselectedTravelers,
  useVoiceTravelersState,
} from "stores/travelers";
import { TravelerTeam } from "stores/travelers/type";
import { APIMember } from "types/api/astvel";
import { useAllMembers, useAllVoices } from "ui/guilds/hooks/swr";
import { v4 as uuid } from "uuid";

const useReflectTravelerChanges = (guildId: string | undefined) => {
  const apiMembers = useAllMembers(guildId);
  const apiVoices = useAllVoices(guildId);
  const allTeams = useTeamsValue();

  const [voiceTravelers, setVoiceTravelers] = useVoiceTravelersState();
  const setUnselectedTravelers = useSetUnselectedTravelers();
  const [teamTravelers, setTeamTravelers] = useTeamTravelersState();

  const selectedMembers = useMemo(
    () => [
      ...voiceTravelers.map(voiceTraveler => voiceTraveler.members).flat(),
      ...teamTravelers.map(teamTraveler => teamTraveler.members).flat(),
    ],
    [teamTravelers, voiceTravelers],
  );

  const selectedTeams = useMemo(
    () => [...voiceTravelers.map(voiceTraveler => voiceTraveler.teams).flat()],
    [voiceTravelers],
  );

  // set new members
  useEffect(() => {
    if (apiMembers.data === undefined) {
      return;
    }
    const apiMembersData = apiMembers.data;

    setUnselectedTravelers(currentUnselectedTravelers => {
      const newMembers = currentUnselectedTravelers.members.slice();
      apiMembersData.forEach(member => {
        if (
          !selectedMembers.some(selectedMember => selectedMember.id === member.id) &&
          !newMembers.some(m => m.id === member.id)
        ) {
          newMembers.push(member);
        }
      });

      return { ...currentUnselectedTravelers, members: newMembers };
    });
  }, [apiMembers.data, selectedMembers, setUnselectedTravelers]);

  // set new teams
  useEffect(() => {
    setUnselectedTravelers(currentUnselectedTravelers => {
      const newTeams = currentUnselectedTravelers.teams.slice();
      allTeams.forEach(team => {
        if (
          !selectedTeams.some(selectedTeam => selectedTeam.containerId === team.id) &&
          !currentUnselectedTravelers.teams.some(t => t.containerId === team.id)
        ) {
          const id = uuid();
          newTeams.push({ ...team, containerId: team.id, id });
        }
      });

      return { ...currentUnselectedTravelers, teams: newTeams };
    });
  }, [allTeams, selectedTeams, setUnselectedTravelers]);

  // Voice Travelers
  useEffect(() => {
    if (apiMembers.data === undefined || apiVoices.data === undefined) {
      return;
    }
    const apiVoicesData = apiVoices.data;
    const apiMembersData = apiMembers.data;

    setVoiceTravelers(currentVoiceTravelers => {
      const returnVoices = currentVoiceTravelers.reduce<VoiceTravelers[]>((acc, currentVoiceTraveler) => {
        if (apiVoicesData.some(v => v.id === currentVoiceTraveler.id)) {
          // Members
          const apiMembersInVoice = currentVoiceTraveler.members.reduce<APIMember[]>((memberAcc, member) => {
            const apiMember = apiMembersData.find(m => m.id === member.id);
            if (apiMember !== undefined) {
              memberAcc.push(apiMember);
            }
            return memberAcc;
          }, []);

          // Teams
          const teamsInVoice = currentVoiceTraveler.teams.reduce<TravelerTeam[]>((teamAcc, currentTeam) => {
            const team = allTeams.find(t => t.id === currentTeam.containerId);
            if (team !== undefined) {
              teamAcc.push({ ...team, id: currentTeam.id, containerId: currentTeam.containerId });
            }
            return teamAcc;
          }, []);

          // push
          acc.push({
            id: currentVoiceTraveler.id,
            members: apiMembersInVoice,
            teams: teamsInVoice,
          });
        }
        return acc;
      }, []);

      returnVoices.push(
        ...apiVoicesData.reduce<VoiceTravelers[]>((acc, apiVoice) => {
          if (!returnVoices.some(voice => voice.id === apiVoice.id)) {
            acc.push({
              id: apiVoice.id,
              members: [],
              teams: [],
            });
          }
          return acc;
        }, []),
      );

      return returnVoices;
    });
  }, [allTeams, apiMembers.data, apiVoices.data, setVoiceTravelers]);

  // Unselected Travelers
  useEffect(() => {
    if (apiMembers.data === undefined) {
      return;
    }
    const apiMembersData = apiMembers.data;

    setUnselectedTravelers(currentUnselectedTravelers => {
      const apiMembersInUnselected = currentUnselectedTravelers.members.reduce<APIMember[]>((memberAcc, member) => {
        const apiMember = apiMembersData.find(m => m.id === member.id);
        if (apiMember !== undefined) {
          memberAcc.push(apiMember);
        }
        return memberAcc;
      }, []);

      const teamsInUnselected = currentUnselectedTravelers.teams.reduce<TravelerTeam[]>((teamAcc, currentTeam) => {
        const team = allTeams.find(t => t.id === currentTeam.containerId);
        if (team !== undefined) {
          teamAcc.push({ ...team, id: currentTeam.id, containerId: currentTeam.containerId });
        }
        return teamAcc;
      }, []);

      return {
        id: null,
        members: apiMembersInUnselected,
        teams: teamsInUnselected,
      };
    });
  }, [allTeams, apiMembers.data, setUnselectedTravelers]);

  // Team Travelers
  useEffect(() => {
    if (apiMembers.data === undefined) {
      return;
    }
    const apiMembersData = apiMembers.data;

    setTeamTravelers(currentTeamTravelers => {
      const returnTeams = currentTeamTravelers.reduce<TeamTravelers[]>((acc, currentTeamTraveler) => {
        if (allTeams.some(team => team.id === currentTeamTraveler.id)) {
          const apiMembersInTeam = currentTeamTraveler.members.reduce<APIMember[]>((memberAcc, member) => {
            const apiMember = apiMembersData.find(m => m.id === member.id);
            if (apiMember !== undefined) {
              memberAcc.push(apiMember);
            }
            return memberAcc;
          }, []);

          acc.push({
            id: currentTeamTraveler.id,
            members: apiMembersInTeam,
          });
        }

        return acc;
      }, []);

      allTeams.forEach(team => {
        if (!returnTeams.some(t => t.id === team.id)) {
          returnTeams.push({
            id: team.id,
            members: [],
          });
        }
      });

      return returnTeams;
    });
  }, [allTeams, apiMembers.data, setTeamTravelers]);
};

export { useReflectTravelerChanges };
