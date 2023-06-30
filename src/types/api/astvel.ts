import { OverwriteType } from "discord.js";

type Permission = {
  id: string;
  type: OverwriteType;
  allow: string;
  deny: string;
};

type APIGuild = {
  id: string;
  name: string;
  icon: string;
};

type APICategory = {
  id: string;
  name: string;
  permissionOverwriteRoles: Permission[];
  permissionOverwriteMembers: Permission[];
  parentId: null;
};

type APIVoice = {
  id: string;
  name: string;
  permissionOverwriteRoles: Permission[];
  permissionOverwriteMembers: Permission[];
  parentId: string | null;
};

type APIMember = {
  id: string;
  displayName: string;
  nickName: string | null;
  avatar: string | null;
  userName: string;
  userAvatar: string | null;
  roles: string[];
};

type APIRole = {
  id: string;
  name: string;
  permissions: string;
};

export type { APIGuild, APIMember, APIVoice, APICategory, APIRole };
