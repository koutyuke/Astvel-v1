import { FC } from "react";
import { GroupNoSelectType } from "types/models/dnd";
import { useDroppable } from "@dnd-kit/core";
import { NoSelect } from "types/models/group";
import { useRecoilValue } from "recoil";
import { memberListSelector, teamListSelector } from "utils/recoil/dnd";
import DragTravelers from "../../dragableArea";

type Props = {
  data: NoSelect;
};

const NoSelectDropableArea: FC<Props> = ({ data }) => {
  const group: GroupNoSelectType = {
    type: "noSelect",
  };
  const { members: memberIdList, teams: teamIdList } = data;
  const { isOver, setNodeRef } = useDroppable({
    id: "noSelect",
    data: {
      group: { ...group },
      data: {},
    },
  });

  const members = useRecoilValue(memberListSelector(memberIdList));
  const teams = useRecoilValue(teamListSelector(teamIdList));

  if (members === undefined || teams === undefined) {
    return <div>error</div>;
  }

  return (
    <div
      className="h-full w-full  rounded-md bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] p-2"
      ref={setNodeRef}
    >
      <div
        className={`${
          isOver ? "scale-[1.015] drop-shadow-xl" : ""
        } h-full overflow-auto rounded-lg bg-[rgba(255,255,255,0.6);] outline-2 outline-offset-[3px] outline-white duration-300`}
      >
        <DragTravelers group={group} members={members} teams={teams} className="min-h-full py-2" />
      </div>
    </div>
  );
};

export default NoSelectDropableArea;
