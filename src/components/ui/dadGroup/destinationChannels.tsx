import { FC } from "react";
import { useRecoilValue } from "recoil";
import { destinationChannels } from "utils/recoil/keys";
import DestinationChannelDropArea from "featutres/dad/components/ui/dropableArea/destinationChannel";

const DestinationChannelsArea: FC = () => {
  const data = useRecoilValue(destinationChannels);
  if (data.status === "failure") {
    return <div>error</div>;
  }

  return (
    <div className="flex h-full w-1/3 flex-col">
      <div className="h-12">Destination Channel</div>
      <DestinationChannelDropArea data={data.data} />
    </div>
  );
};

export default DestinationChannelsArea;
