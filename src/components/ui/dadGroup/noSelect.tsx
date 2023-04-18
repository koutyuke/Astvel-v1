import { FC } from "react";
import { useRecoilValue } from "recoil";
import { noSelectMembers } from "utils/recoil/keys";
import { GroupNoSelectType } from "types/models/dnd";
import NoSelectDropableArea from "featutres/dad/components/ui/dropableArea/noSelect";

const NoSelectAres: FC = () => {
  const data = useRecoilValue(noSelectMembers);
  const groupData: GroupNoSelectType = {
    type: "noSelect",
  };
  if (data.status === "failure") {
    return <div>error</div>;
  }
  return (
    <div className="flex h-full w-1/3 flex-col">
      <div className="h-12">No Select</div>
      <NoSelectDropableArea group={groupData} members={data.data.members} teams={data.data.teams} />
    </div>
  );
};

export default NoSelectAres;
