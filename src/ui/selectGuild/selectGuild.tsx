import { FC } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { InviteBot } from "ui/inviteBot";
import { Guilds } from "./components/guilds";
import { useCurrentUserGuilds } from "./hooks/useCurrentUserGuilds";

const SelectGuild: FC = () => {
  const { data: guilds, error, isLoading } = useCurrentUserGuilds();

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (guilds === undefined || error) {
    return <div>error</div>;
  }

  return (
    <Tabs.Root
      defaultValue="guilds"
      className="flex h-[calc(100vh_-_10rem)] w-full  flex-col items-center justify-start text-gray-500"
    >
      <Tabs.TabsList className="h-16 w-full max-w-[60rem] text-center text-xl">
        <Tabs.TabsTrigger
          value="guilds"
          className="h-16 w-1/2 max-w-[30rem] rounded-tl-[1rem] border-b-4 border-red-100  bg-white data-[state=active]:border-red-400"
        >
          Select Guilds
        </Tabs.TabsTrigger>
        <Tabs.TabsTrigger
          value="bot"
          className="h-16 w-1/2 max-w-[30rem] rounded-tr-[1rem] border-b-4 border-red-100  bg-white data-[state=active]:border-red-400"
        >
          Invite Bot
        </Tabs.TabsTrigger>
      </Tabs.TabsList>
      <Tabs.Content
        value="guilds"
        className="h-[calc(100vh_-_14rem)] w-full max-w-[60rem]  overflow-hidden rounded-b-[1rem] bg-white data-[state=active]:block data-[state=inactive]:hidden"
      >
        <Guilds />
      </Tabs.Content>
      <Tabs.Content
        value="bot"
        className="h-[calc(100vh_-_14rem)] w-full max-w-[60rem] items-center justify-center overflow-hidden rounded-b-[1rem] bg-white data-[state=active]:flex data-[state=inactive]:hidden"
      >
        <InviteBot />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export { SelectGuild };
