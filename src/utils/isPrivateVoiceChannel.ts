import { Permission } from "types/api/astvel";
import { permissionCheck } from "./permissionCheck";

const isPrivateChannel = (guildId: string, permissionOverwriteRoles: Permission[]): boolean => {
  const everyone = permissionOverwriteRoles.find(role => role.id === guildId);
  const isPrivate =
    everyone !== undefined
      ? permissionCheck(BigInt(everyone.deny), BigInt(1024)) && permissionCheck(BigInt(everyone.deny), BigInt(1048576))
      : false;
  return isPrivate;
};
export { isPrivateChannel };
