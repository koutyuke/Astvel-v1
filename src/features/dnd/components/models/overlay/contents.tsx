import { Active } from "@dnd-kit/core";
import { CategoryIcon } from "components/icon/category";
import { DownIcon } from "components/icon/down";
import { DragIcon } from "components/icon/drag";
import { PrivateSpeakerIcon, SpeakerIcon } from "components/icon/speaker";
import { TeamIcon } from "components/icon/team";
import { Member } from "components/models/traveler/member";
import { Team } from "components/models/traveler/team";
import { FC, memo } from "react";
import { TravelerSize } from "stores/travelers";
import { DndData } from "types/models/dnd";
import { avatarUrlGen } from "utils/iconUrlGen";
import { permissionCheck } from "utils/permissionCheck";

type Props = {
  guildId: string;
  active: Active | null;
  size: TravelerSize;
};

const NoMemoOverlayContents: FC<Props> = ({ guildId, active, size }) => {
  const activeData = active?.data.current as DndData | undefined;
  const everyone =
    activeData?.type === "voice"
      ? activeData?.data.permissionOverwriteRoles.find(role => role.id === guildId)
      : undefined;

  if (activeData === undefined) {
    return null;
  }

  switch (activeData.type) {
    case "member":
      return (
        <Member
          image={avatarUrlGen(activeData.data.id, activeData.data.avatar ?? activeData.data.userAvatar)}
          name={activeData.data.displayName}
          size={size}
          className="cursor-grabbing bg-black-3 outline outline-1 outline-green-500"
        />
      );
    case "travelerTeam":
      return (
        <Team
          emoji={activeData.data.iconEmoji}
          name={activeData.data.name}
          size={size}
          className="cursor-grabbing bg-black-3 outline outline-1 outline-green-500"
        />
      );

    case "category":
      return (
        <div className="flex w-full items-center rounded-lg border border-green-500 bg-black-2 py-2.5 pl-1 pr-2.5">
          <div className="text-green-500">
            <DragIcon className="h-5 w-5" />
          </div>
          <CategoryIcon className="ml-1 h-5 w-5" />
          <p className="ml-2 grow truncate text-start">{activeData.data.name}</p>
          <DownIcon className="h-5 w-5 transition duration-300 hover:text-green-500" />
        </div>
      );

    case "voice":
      return (
        <div className="flex w-full items-center rounded-lg border border-green-500 bg-black-3 py-2.5 pl-1 pr-2.5">
          <div className="text-green-500">
            <DragIcon className="h-5 w-5" />
          </div>
          {everyone !== undefined &&
          permissionCheck(BigInt(everyone.deny), BigInt(1024)) &&
          permissionCheck(BigInt(everyone.deny), BigInt(1048576)) ? (
            <PrivateSpeakerIcon className="ml-1 h-5 w-5" backgroundColor="bg-black-3" />
          ) : (
            <SpeakerIcon className="ml-1 h-5 w-5" />
          )}
          <p className="ml-2 grow truncate text-start">{activeData.data.name}</p>
          <DownIcon className="h-5 w-5 transition duration-300 hover:text-green-500" />
        </div>
      );
    case "team":
      return (
        <div className="flex w-full items-center rounded-lg border border-green-500 bg-black-3 py-2.5 pl-1 pr-2.5">
          <div className="text-green-500">
            <DragIcon className="h-5 w-5" />
          </div>
          <TeamIcon className="ml-1 h-5 w-5" />
          <span className="ml-1 w-5 text-center">{activeData.data.iconEmoji}</span>
          <p className="ml-2 grow truncate text-start">{activeData.data.name}</p>
          <DownIcon className="h-5 w-5 transition duration-300 hover:text-green-500" />
        </div>
      );
    default:
      return null;
  }
};

const OverlayContents = memo(NoMemoOverlayContents);

export { OverlayContents };
