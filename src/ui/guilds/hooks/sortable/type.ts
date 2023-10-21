import { UniqueIdentifier } from "@dnd-kit/core";
import { GroupType } from "types/models/group";

type SortProps = {
  oldId?: UniqueIdentifier;
  oldIndex?: number;
  newId?: UniqueIdentifier;
  newIndex?: number;
};

type RemoveProps = {
  id?: UniqueIdentifier;
  index?: number;
};

type AddProps<T> = {
  latterId?: UniqueIdentifier;
  index?: number;
  data: T;
};

type MoveProps<T> = {
  latterId?: UniqueIdentifier;
  index?: number;
  data: T;
  group: GroupType;
};

export type { SortProps, MoveProps, RemoveProps, AddProps };
