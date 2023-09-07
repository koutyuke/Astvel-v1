import type { NextPageWithLayout } from "next";
import { DndContext } from "@dnd-kit/core";
import { DragDataType, DropDataType } from "types/models/dnd";
import { Toast } from "featutres/toast/components/toast";
import { ToolBar } from "ui/guilds/components/toolbar";
import { useRouter } from "next/router";
import { useGuild } from "ui/guilds/hooks/swr";
import { useSocketEffect, useValidatedSession } from "hooks";
import { Layout } from "components/layouts";
import { DndOverlay } from "featutres/dnd/components/models/overlay";
import { DestinationChannels } from "ui/guilds/components/destinationChannels";
import { Team } from "ui/guilds/components/team/team";
import { NoSelect } from "ui/guilds/components/noSelect";
import { guildPageQuerySchema } from "stores/schema";
import { useDnDTravelersEffect, useUpdateDnD } from "featutres/dnd/hooks/dnd";
import { SelectGuild } from "ui/selectGuild";
import { InviteBot } from "ui/inviteBot";
import { ErrorMessage, NoSignIn } from "ui/errorMessage";

const Guilds: NextPageWithLayout = () => {
  const { session } = useValidatedSession();
  const router = useRouter();
  const QUERY = router.query;
  const query = guildPageQuerySchema.safeParse(QUERY);
  const guild = useGuild(query.success ? query.data.id : undefined);

  useDnDTravelersEffect(
    query.success && guild.data !== undefined && guild.error === undefined && guild.data !== null
      ? query.data.id
      : undefined,
  );
  useSocketEffect(guild.data?.id);

  const UpdateDnD = useUpdateDnD();

  if (!session.success) {
    return <NoSignIn />;
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
        <InviteBot />
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
      <div className="flex h-full w-full space-x-4 pl-16">
        <ToolBar guildId={query.data.id} />
        <DestinationChannels guildId={query.data.id} />
        <NoSelect guildId={query.data.id} />
        <Team guildId={query.data.id} />
      </div>
      <DndOverlay />
      <Toast />
    </DndContext>
  );
};

Guilds.getLayout = page => <Layout title="Guilds - Astvel">{page}</Layout>;

export default Guilds;
