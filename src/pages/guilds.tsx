import type { NextPage } from "next";
import { DndContext } from "@dnd-kit/core";
import Overlay from "featutres/dnd/components/models/overlay";
import { DragDataType, DropDataType } from "types/models/dnd";
import DestinationChannelDropArea from "featutres/dnd/components/ui/dropableArea/destinationChannel";
import NoSelectDropableArea from "featutres/dnd/components/ui/dropableArea/noSelect";
import TeamDropArea from "featutres/dnd/components/ui/dropableArea/team";
import BaseToast from "components/elements/toast";
import ToolBar from "featutres/dnd/components/ui/toolbar";
import { useRouter } from "next/router";
import guildPageQuerySchema from "schema/guildPageQuery";
import useGuild from "featutres/dnd/hooks/swr/useGuild";
import useUpdateDnDTravelers from "featutres/dnd/hooks/useUpdateTravelers";
import useUpdateDnD from "featutres/dnd/hooks/useUpdateDnD";
import SelectGuild from "components/ui/selectGuild";
import ErrorMessage from "components/ui/errorMessage";
import InviteBot from "components/ui/inviteBot";
import useSocketEffect from "hooks/useSocketEffect";
import useValidatedSession from "hooks/useValidatedSession";

const Guilds: NextPage = () => {
  const { session } = useValidatedSession();
  const router = useRouter();
  const QUERY = router.query;
  const query = guildPageQuerySchema.safeParse(QUERY);
  const guild = useGuild(query.success ? query.data.id : undefined);

  useUpdateDnDTravelers(query.success ? query.data.id : undefined);
  useSocketEffect(guild.data?.id);

  const UpdateDnD = useUpdateDnD();

  if (!session.success) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorMessage title="No Sign In">Please Sign In with Discord.</ErrorMessage>
      </div>
    );
  }

  if (!query.success) {
    return (
      <div className="h-full w-full">
        <SelectGuild />
      </div>
    );
  }

  if (guild.isLoading) {
    return <div>loading</div>;
  }

  if (guild.data === undefined || guild.error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorMessage title="Access Error">
          Cannot Access Server.
          <br />
          Please Check Your Internet.
        </ErrorMessage>
      </div>
    );
  }

  if (guild.data === null) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
        <div className="text-center text-2xl">
          Astvel Discord Bot has not joined this server.
          <br />
          Please join the Bot!
        </div>
        <div className="h-80">
          <InviteBot />
        </div>
      </div>
    );
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
      <div className="flex h-full w-full max-w-[100rem] space-x-4 pl-16">
        <ToolBar guildId={query.data.id} />
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
