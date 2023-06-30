export type Team = {
  id: string;
  name: string;
  iconEmoji: string;
};

export type DnDMember = {
  id: string;
} & (
  | {
      attributionType: "channel" | "team";
      attributionId: string;
    }
  | {
      attributionType: "noSelect";
      attributionId: null;
    }
);

export type DnDTeam = {
  id: string;
} & (
  | {
      attributionType: "channel";
      attributionId: string;
    }
  | {
      attributionType: "noSelect";
      attributionId: null;
    }
);
