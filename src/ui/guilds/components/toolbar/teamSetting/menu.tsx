import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTeamsState } from "stores/teams";
import { v4 as uuid } from "uuid";
import { PlusIcon } from "components/icon/plus";
import { ScrollArea } from "components/elements/scrollArea";
import { TeamEditor } from "./teamEditor";
import { EmojiPickerSetting } from "./store";
import { SelectEmoji } from "./selectEmoji";
import { EditTeam } from "./editTeam";
import { DeleteAllTeams } from "./deleteAllTeams";

type Props = {
  setClose: () => void;
};

const TeamSettingMenu: FC<Props> = ({ setClose }) => {
  const [teams, setTeams] = useTeamsState();
  const [pickerSetting, setPickerSetting] = useState<EmojiPickerSetting>({ open: false });

  const teamDelete = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const teamUpdate = (id: string, emoji: string, name: string) => {
    setTeams(
      teams.map(team => {
        if (team.id === id) {
          return {
            ...team,
            iconEmoji: emoji,
            name,
          };
        }
        return team;
      }),
    );
  };

  const deleteTeams = () => {
    setTeams([]);
  };

  return (
    <div className="flex aspect-[9/16] max-h-[90svh] w-[30rem] max-w-[90vw] flex-col items-center rounded-lg bg-black-1 p-6 outline outline-1 outline-gray-500 tablet:aspect-[3/4]">
      <p className="mb-4 text-center text-2xl font-semibold">Team Setting</p>
      <div className="relative inline-block h-1 w-full flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full" type="hover">
          <ul className=" w-full list-inside list-disc gap-y-4 space-y-4 overflow-x-hidden px-4 ">
            <li className="w-full space-y-4">
              <span>Create New Team</span>
              <div className="w-full">
                <TeamEditor
                  setPickerSetting={setPickerSetting}
                  onSubmit={value => {
                    const newId = uuid();
                    setTeams([
                      ...teams,
                      {
                        id: newId,
                        name: value.name,
                        iconEmoji: value.emoji,
                      },
                    ]);
                  }}
                  type="create"
                />
              </div>
            </li>
            {teams.length !== 0 && (
              <>
                <li className="w-full space-y-4">
                  <span>Edit and Update</span>
                  <div className="w-full space-y-2">
                    {teams.map(team => (
                      <EditTeam
                        setPickerSetting={setPickerSetting}
                        team={team}
                        key={`edit-team-${team.id}`}
                        deleteTeam={teamDelete}
                        updateTeam={teamUpdate}
                      />
                    ))}
                  </div>
                </li>
                <li className="w-full space-y-2">
                  <span>Danger Zone</span>
                  <DeleteAllTeams deleteTeams={deleteTeams} />
                </li>
              </>
            )}
          </ul>
        </ScrollArea>
        <SelectEmoji
          className={twMerge(
            "absolute left-0 top-0 z-20 w-full bg-black-1  duration-300",
            !pickerSetting.open && "hidden",
          )}
          close={() => {
            setPickerSetting({ open: false });
          }}
          currentEmoji={pickerSetting.open ? pickerSetting.currentEmoji : ""}
          onEmojiClick={pickerSetting.open ? pickerSetting.func : undefined}
        />
      </div>
      <div className="absolute right-6 top-6">
        <button
          type="button"
          className="group rounded-full border border-gray-500 transition hover:border-green-500"
          onClick={() => {
            setClose();
          }}
        >
          <PlusIcon size={24} className="rotate-45 stroke-gray-500 transition group-hover:stroke-green-500" />
        </button>
      </div>
    </div>
  );
};

export { TeamSettingMenu };
