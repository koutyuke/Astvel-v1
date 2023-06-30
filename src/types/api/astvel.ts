import { PermissionOverwrites } from "discord.js";

type APIGuild = {
  id: string;
  name: string;
  icon: string;
};

type APICategory = {
  id: string;
  name: string;
  permissionOverwriteRoles: PermissionOverwrites[];
  permissionOverwriteMembers: PermissionOverwrites[];
  parentId: null;
};

type APIVoice = {
  id: string;
  name: string;
  permissionOverwriteRoles: PermissionOverwrites[];
  permissionOverwriteMembers: PermissionOverwrites[];
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
