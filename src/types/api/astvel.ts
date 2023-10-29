import { OverwriteType } from "discord.js";

type Permission = {
  id: string;
  type: OverwriteType;
  allow: string;
  deny: string;
};

type APIUser = {
  id: string;
  username: string;
  global_name: string;
  avatar: string;
  discriminator: string;
  email: string;
  accent_color: string | null;
  flags: number;
  banner_color: string | null;
  premium_type: number;
  public_flags: number;
  verified: boolean;
  mfa_enabled: boolean;
};

type APIUserGuild = {
  id: string;
  name: string;
  icon?: string;
  owner: boolean;
  permissions: string;
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

export type { APIUser, APIGuild, APIMember, APIVoice, APICategory, APIRole, APIUserGuild, Permission };
