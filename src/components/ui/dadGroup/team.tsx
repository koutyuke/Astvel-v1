import TeamDropArea from "featutres/dad/components/ui/dropableArea/team";
import type { FC } from "react";
import { useRecoilValue } from "recoil";
import { teams } from "utils/recoil/keys";

const TeamArea: FC = () => {
  const data = useRecoilValue(teams);
  if (data.status === "failure") {
    return <div>error</div>;
  }

  return (
    <div className="flex h-full w-1/3 flex-col">
      <div className="h-12">Teams</div>
      <TeamDropArea data={data.data} />
    </div>
  );
};

export default TeamArea;
