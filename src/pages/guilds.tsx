import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { DndContext } from "@dnd-kit/core";
import Overlay from "featutres/dnd/components/models/overlay";
import { DragDataType, DropDataType } from "types/models/dnd";
import DestinationChannelDropArea from "featutres/dnd/components/ui/dropableArea/destinationChannel";
import NoSelectDropableArea from "featutres/dnd/components/ui/dropableArea/noSelect";
import TeamDropArea from "featutres/dnd/components/ui/dropableArea/team";
import BaseToast from "components/elements/toast";
import ToolBar from "featutres/dnd/components/ui/toolbar";
import sessionSchema from "schema/session";
import { useRouter } from "next/router";
import guildPageQuerySchema from "schema/guildPageQuery";
import useGuild from "featutres/dnd/hooks/swr/useGuild";
import useUpdateDnDTravelers from "featutres/dnd/hooks/useUpdateTravelers";
import useUpdateDnD from "featutres/dnd/hooks/useUpdateDnD";

const Guilds: NextPage = () => {
  const { data: SESSION } = useSession();
  const session = sessionSchema.safeParse(SESSION);
  const router = useRouter();
  const QUERY = router.query;
  const query = guildPageQuerySchema.safeParse(QUERY);
  const guild = useGuild(query.success ? query.data.id : undefined);

  useUpdateDnDTravelers(query.success ? query.data.id : undefined);
  const UpdateDnD = useUpdateDnD();

  if (!session.success) {
    return <div>session error</div>;
  }

  if (!query.success) {
    return <div>not query</div>;
  }
  
  if(guild.isLoading){
    return <div>loading</div>
  }

  if (guild.data === undefined || guild.error) {
    return <div>guild is undefined</div>;
  }

  if (guild.data === null) {
    return <div>guild does not found</div>;
  }

  return (
    <DndContext
      id="index"
      onDragStart={() => {}}
      onDragEnd={e => {
        const activeData = e.active.data.current as DragDataType | undefined;
        const overData = e.over?.data.current as DropDataType | undefined;

        UpdateDnD(activeData, overData);
      }}
      onDragCancel={() => {}}
      onDragOver={() => {}}
      onDragMove={() => {}}
    >
      <div className="grid h-[calc(100vh_-_10rem)] grid-cols-[4rem_1fr_1fr_1fr] grid-rows-[minmax(0,1fr)] gap-x-4 px-10">
        <ToolBar />
        <DestinationChannelDropArea guildId={query.data.id} />
        <NoSelectDropableArea guildId={query.data.id} />
        <TeamDropArea guildId={query.data.id} />
      </div>
      <Overlay />
      <BaseToast />
    </DndContext>
  );
};

export default Guilds;
