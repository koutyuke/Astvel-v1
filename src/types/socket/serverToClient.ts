export type ServerToClientEvents = {
  hello: (message: string) => void;
  join: (id: string) => void;
  memberVoiceState: (
    type: "join" | "leave" | "move",
    channelId: string | null | undefined,
    memberId: string | null | undefined,
  ) => void;
};
