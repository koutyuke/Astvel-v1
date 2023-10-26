import { APICategory, APIVoice } from "types/api/astvel";

export type NoCategory = Omit<APICategory, "id" | "name"> & {
  id: "NoCategory";
  name: "No Category";
};

export type Channel = {
  voices: APIVoice[];
} & (APICategory | NoCategory);
