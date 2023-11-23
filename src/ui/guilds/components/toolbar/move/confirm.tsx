import { BaseButton } from "components/elements/button";
import { Member } from "components/models/traveler/member";
import { isPrivateChannel } from "utils/isPrivateVoiceChannel";
import { APIMember } from "types/api/astvel";
import { TravelerTeam } from "stores/travelers/type";
import { useChannelsValue } from "stores/channels";
import { useTeamTravelersValue, useVoiceTravelersValue } from "stores/travelers";
import { genUserAvatar } from "utils/iconUrl";
import { useSetToast } from "features/toast/hooks";
import { FC } from "react";
import axios from "axios";
import { useValidatedSession } from "hooks/useValidatedSession";
import { PlusIcon } from "components/icon/plus";
import { ScrollArea } from "components/elements/scrollArea";
import { ChannelWithTravelers, TeamWithMembers, VoiceWithTravelers } from "./type";
import { Toggle } from "./toggle";

type Props = {
  guildId: string;
  setOpen: (open: boolean) => void;
};

const MoveConfirm: FC<Props> = ({ guildId, setOpen }) => {
  const toastSetter = useSetToast();
  const channels = useChannelsValue();
  const voiceTravelers = useVoiceTravelersValue();
  const teamTravelers = useTeamTravelersValue();

  const { session } = useValidatedSession();

  if (!session.success) {
    return null;
  }

  const moveCandidate = channels.reduce<ChannelWithTravelers[]>((acc, channel) => {
    const setVoices: VoiceWithTravelers[] = [];
    channel.voices.forEach(voice => {
      const { members, teams } = voiceTravelers.find(v => v.id === voice.id) ?? {
        members: [] as APIMember[],
        teams: [] as TravelerTeam[],
      };
      const setTeams = teams.reduce<TeamWithMembers[]>((current, team) => {
        const { members: teamMember } = teamTravelers.find(t => t.id === team.containerId) ?? {
          members: [] as APIMember[],
        };
        if (teamMember.length === 0) {
          return current;
        }
        return [...current, { ...team, members: teamMember }];
      }, []);
      if (members.length === 0 && setTeams.length === 0) {
        return;
      }
      setVoices.push({ ...voice, members, teams: setTeams });
    });
    if (setVoices.length === 0) {
      return acc;
    }
    return [...acc, { ...channel, voices: setVoices }];
  }, []);

  const isSelectedTraveler = moveCandidate.length !== 0;

  return (
    <div className="relative flex aspect-[9/16] max-h-[90svh] w-[30rem] max-w-[90vw] flex-col gap-y-4 rounded-lg bg-black-1 p-6 text-white outline outline-1 outline-gray-500 tablet:aspect-[3/4] tablet:px-10 tablet:py-6">
      <p className="w-full text-center text-2xl font-semibold">Move Member</p>
      <div className="text-center text-gray-400">
        {isSelectedTraveler ? (
          <p>
            Move Discord members.
            <br />
            Is This Okay?
          </p>
        ) : (
          <p>
            Member is not selected.
            <br />
            Please select a member to move.
          </p>
        )}
      </div>
      <div className="box-border h-1 w-full flex-1 overflow-x-hidden rounded-lg border border-gray-500">
        <ScrollArea className="h-full w-full" type="auto">
          <div className="w-full space-y-2 p-2">
            {moveCandidate.map(category => (
              <Toggle type="category" name={category.name} key={`move-confirm-${category.id}`}>
                <div className="flex w-full flex-col gap-y-2">
                  {category.voices.map(voice => {
                    const isPrivate = isPrivateChannel(guildId, voice.permissionOverwriteRoles);
                    return (
                      <Toggle
                        type={isPrivate ? "privateVoice" : "voice"}
                        name={voice.name}
                        key={`move-confirm-${voice.id}`}
                      >
                        <div className="flex w-full flex-col gap-y-2">
                          {voice.members.length !== 0 && (
                            <div className="flex w-full flex-col">
                              {voice.members.map(member => (
                                <Member
                                  key={`move-confirm-${member.id}`}
                                  name={member.displayName}
                                  image={genUserAvatar(member.id, member.avatar ?? member.userAvatar)}
                                  size="regular"
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex w-full flex-col gap-y-2">
                            {voice.teams.map(team => (
                              <Toggle type="team" name={team.name} key={`move-confirm-${team.id}`}>
                                <div className="flex w-full flex-col">
                                  {team.members.map(member => (
                                    <Member
                                      key={`move-confirm-${member.id}`}
                                      name={member.displayName}
                                      image={genUserAvatar(member.id, member.avatar ?? member.userAvatar)}
                                      size="regular"
                                    />
                                  ))}
                                </div>
                              </Toggle>
                            ))}
                          </div>
                        </div>
                      </Toggle>
                    );
                  })}
                </div>
              </Toggle>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-between">
        <BaseButton
          theme="normal"
          className="h-8"
          onClick={() => {
            setOpen(false);
          }}
        >
          <p>Cancel</p>
        </BaseButton>
        <BaseButton
          className="h-8"
          theme="safety"
          disabled={!isSelectedTraveler}
          onClick={async () => {
            setOpen(false);

            const patchData = moveCandidate
              .map(channel => [...channel.voices])
              .flat()
              .map(voice => ({
                id: voice.id,
                members: [
                  ...voice.members.map(({ id }) => id),
                  ...voice.teams.reduce(
                    (current, teams) => [...current, ...teams.members.map(({ id }) => id)],
                    [] as string[],
                  ),
                ],
              }));

            try {
              const res = await axios.patch("/api/move", patchData, {
                headers: { Authorization: `Bearer ${session.data.accessToken}` },
                params: {
                  guild_id: guildId,
                  user_id: session.data.user.id,
                },
              });

              if (res.status === 200) {
                toastSetter({ title: "Do Move", message: "Success for Move Member!!", status: "success" });
              } else {
                toastSetter({
                  title: "Cannot Move",
                  message: "Error for Move Member. please Check Internet",
                  status: "error",
                });
              }
            } catch {
              toastSetter({
                title: "Cannot Move",
                message: "Error for Move Member. please Check Internet",
                status: "error",
              });
            }
          }}
        >
          <p>Move</p>
        </BaseButton>
      </div>
      <div className="absolute right-6 top-6">
        <button
          type="button"
          className="group rounded-full border border-gray-500 transition hover:border-green-500"
          onClick={() => {
            setOpen(false);
          }}
        >
          <PlusIcon size={24} className="rotate-45 stroke-gray-500 transition group-hover:stroke-green-500" />
        </button>
      </div>
    </div>
  );
};

export { MoveConfirm };
