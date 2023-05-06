export type UserInfo = {
  id: number;
  name: string;
  discriminator: string;
  accessToken: string;
  astvelToken: string;
};

export type Guild = {
  id: number;
  discordId: number;
  name: string;
  user: {
    nickName: string;
    isOwner: boolean;
    isAdministrator: boolean;
    isMoveMembers: boolean;
    isManageRoles: boolean;
  };
};

export type Category = {
  id: number;
  discordId: number;
  name: string;
  channels: Channel[];
  isShow: boolean;
};

export type NoCategory = {
  id: number;
  discordId: null;
  name: null;
  channels: Channel[];
  isShow: boolean;
};

export type Channel = {
  id: number;
  discordId: number;
  name: string;
  isPrivate: boolean;
  members: number[];
  teams: number[];
  isShow: boolean;
};

export type Member = {
  id: number;
  discordId: number;
  name: string;
  iconUrl: string;
  nickName?: string;
  discriminator: number;
  roles: Role[];
  isShow: boolean;
};

export type Role = {
  id: number;
  name: string;
  posision: number;
  permissions: {
    administrator: boolean;
    moveMember: boolean;
    manageRoles: boolean;
  };
};
