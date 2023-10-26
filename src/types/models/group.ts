export type DestinationGroup = {
  type: "destination";
  id: string | null;
};

export type TeamGroup = {
  type: "team";
  id: string;
};

export type UnselectedGroup = {
  type: "unselected";
  id: null;
};

export type GroupType = DestinationGroup | TeamGroup | UnselectedGroup;
