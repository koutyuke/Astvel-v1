import BaseDialog from "components/elements/dialog";
import useToastSetter from "hooks/useToastSetter";
import { FC, useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import BaseToolButton from "featutres/dnd/components/elements/button/tool";
import { useRecoilValue } from "recoil";
import { DnDMembersAtom, DnDTeamsAtom, TeamsAtom } from "utils/recoil/dnd";
import useAllMembers from "featutres/dnd/hooks/swr/useAllMembers";
import useValidatedSession from "hooks/useValidatedSession";
import useAllVoices from "featutres/dnd/hooks/swr/useAllVoices";
import BaseButton from "components/elements/button";
import SmallMemberModel from "components/models/traveler/member/smallMember";
import { avatarUrlGen } from "utils/iconUrlGen";
import SmallTeamModel from "components/models/traveler/team/smallTeam";
import axios from "axios";

type Props = {
  guildId: string;
};

const ToolMoveMenu: FC<Props> = ({ guildId }) => {
  const [open, setOpen] = useState(false);
  const AddDialog = BaseDialog(<BaseToolButton Icon={BsFillRocketTakeoffFill} title="Move" />);
  const toastSetter = useToastSetter();

  const { session } = useValidatedSession();
  const allVoices = useAllVoices(guildId);
  const allMembers = useAllMembers(guildId);
  const allTeams = useRecoilValue(TeamsAtom);
  const DnDMembers = useRecoilValue(DnDMembersAtom);
  const DnDTeams = useRecoilValue(DnDTeamsAtom);

  if (
    !session.success ||
    allMembers.data === undefined ||
    allMembers.error !== undefined ||
    allVoices.error !== undefined ||
    allVoices.data === undefined
  ) {
    return null;
  }

  const moveData = allVoices.data.map(voice => {
    const members =
      allMembers.data?.filter(member =>
        DnDMembers.some(
          DnDMember =>
            DnDMember.attributionType === "channel" &&
            DnDMember.id === member.id &&
            DnDMember.attributionId === voice.id,
        ),
      ) ?? [];
    const teams = allTeams
      .filter(team =>
        DnDTeams.some(
          DnDTeam =>
            DnDTeam.attributionType === "channel" && DnDTeam.id === team.id && DnDTeam.attributionId === voice.id,
        ),
      )
      .map(team => ({
        ...team,
        members:
          allMembers.data?.filter(member =>
            DnDMembers.some(
              DnDMember =>
                DnDMember.attributionType === "team" &&
                DnDMember.id === member.id &&
                DnDMember.attributionId === team.id,
            ),
          ) ?? [],
      }));
    return {
      ...voice,
      members,
      teams,
    };
  });

  const patchData = moveData.map(voice => ({
    id: voice.id,
    members: [
      ...voice.members.map(({ id }) => id),
      ...voice.teams.reduce((current, teams) => [...current, ...teams.members.map(({ id }) => id)], [] as string[]),
    ],
  }));

  return (
    <AddDialog open={open} setOpen={setOpen}>
      <div className="h-[60vh] w-[30vw] min-w-[24rem] space-y-2 rounded-lg bg-white px-8 py-6 text-gray-500">
        <p className="h-10 w-full text-center text-3xl">confirmation</p>
        <div className="flex h-[calc(100%_-_6rem)] flex-col space-y-2 overflow-auto rounded-lg bg-gray-200 px-4 py-2">
          {moveData.map(voice => {
            if (
              voice.members.length === 0 &&
              voice.teams.reduce((current, team) => current + team.members.length, 0) === 0
            ) {
              return null;
            }

            return (
              <div key={voice.id} className=" flex flex-col space-y-1">
                <p className="w-full truncate text-xl">{voice.name}</p>
                <div className="flex space-x-2 pl-4">
                  <div className="min-h-full w-[2px] bg-gray-400" />
                  <div>
                    {voice.members.map(member => (
                      <SmallMemberModel
                        imageUrl={avatarUrlGen(member.id, member.avatar ?? member.userAvatar)}
                        name={member.displayName}
                        key={member.id}
                      />
                    ))}
                    {voice.teams.map(team => {
                      if (team.members.length === 0) {
                        return null;
                      }
                      return (
                        <>
                          <SmallTeamModel emoji={team.iconEmoji} name={team.name} key={team.id} />
                          <div className="flex space-x-2 pl-[15px]">
                            <div className="min-h-full w-[2px] bg-gray-400" />
                            <div className="">
                              {team.members.map(member => (
                                <SmallMemberModel
                                  imageUrl={avatarUrlGen(member.id, member.avatar ?? member.userAvatar)}
                                  name={member.displayName}
                                  key={member.id}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex h-10 items-center justify-center">
          <BaseButton
            className="h-8 bg-green-300 text-green-700 duration-100 hover:scale-105"
            onClick={async () => {
              setOpen(false);

              try {
                const res = await axios.patch("/api/move", patchData, {
                  headers: { Authorization: `Bearer ${session.data.accessToken}` },
                  params: {
                    guild_id: guildId,
                    user_id: session.data.user.provider_id,
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
            Move!!
          </BaseButton>
        </div>
      </div>
    </AddDialog>
  );
};

export default ToolMoveMenu;
