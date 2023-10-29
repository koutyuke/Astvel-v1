/* eslint-disable no-bitwise */
import { ChannelType, Client, OverwriteType, PermissionFlagsBits, VoiceChannel } from "discord.js";
import { Request, Response } from "express";
import { prisma } from "libs/prisma";
import { permissionCheck } from "utils/permissionCheck";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
});

type Return = {
  id: string;
  displayName: string;
  nickName: string | null;
  avatar: string | null;
  userName: string;
  userAvatar: string | null;
  roles: string[];
};

const apiAllMembers = async (req: Request, res: Response, client: Client<boolean>) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);

  if (!query.success || userToken === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  const { user_id: userId, guild_id: guildId } = query.data;

  try {
    const account = await prisma.account.findFirst({
      where: {
        provider: "discord",
        userId,
      },
    });

    if (account === null) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    if (account.access_token === null || account.access_token !== userToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const guild = client.guilds.cache.find(g => g.id === guildId);
    const user = guild?.members.cache.find(u => u.id === account.providerAccountId);
    const channels = guild?.channels.cache.filter(c => c.type === ChannelType.GuildVoice) as VoiceChannel[] | undefined;
    const everyone = guild?.roles.cache.find(r => r.id === guildId)?.permissions.bitfield;

    if (guild === undefined || user === undefined || channels === undefined || everyone === undefined) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const { roles: guildRoles, ownerId } = guild;
    const { roles: userRoles } = user;

    let basePermissions = everyone;

    guildRoles.cache.forEach(guildRole => {
      if (userRoles.cache.some(userRole => userRole.id === guildRole.id)) {
        basePermissions |= guildRole.permissions.bitfield;
      }
    });

    const returnData = channels
      .filter(channel => {
        const permissionOverwriteRoles = channel.permissionOverwrites.cache.filter(
          overwrite => overwrite.type === OverwriteType.Role,
        );
        const permissionOverwriteMembers = channel.permissionOverwrites.cache.filter(
          overwrite => overwrite.type === OverwriteType.Member,
        );

        if (ownerId === account.providerAccountId) {
          return true;
        }

        if (permissionCheck(basePermissions, PermissionFlagsBits.Administrator)) {
          return true;
        }

        let channelPermission = basePermissions;
        let allow = BigInt(0);
        let deny = BigInt(0);
        const overwriteEveryone = permissionOverwriteRoles.find(role => role.id === guildId);
        const overwriteMember = permissionOverwriteMembers.find(m => m.id === account.providerAccountId);

        if (overwriteEveryone) {
          channelPermission &= ~overwriteEveryone.deny.bitfield;
          channelPermission |= overwriteEveryone.allow.bitfield;
        }

        userRoles.cache.forEach(userRole => {
          const overwriteRole = permissionOverwriteRoles.find(r => r.id === userRole.id);
          if (overwriteRole) {
            allow |= overwriteRole.allow.bitfield;
            deny |= overwriteRole.deny.bitfield;
          }
        });

        channelPermission &= ~deny;
        channelPermission |= allow;

        if (overwriteMember) {
          channelPermission &= ~overwriteMember.deny.bitfield;
          channelPermission |= overwriteMember.allow.bitfield;
        }

        // access ok
        if (
          permissionCheck(channelPermission, PermissionFlagsBits.Connect) &&
          permissionCheck(channelPermission, PermissionFlagsBits.ViewChannel) &&
          permissionCheck(channelPermission, PermissionFlagsBits.MoveMembers)
        ) {
          // console.log("sccess ok")
          return true;
        }

        return false;
      })
      .reduce(
        (before, current) => [
          ...before,
          ...current.members.map(member => ({
            id: member.id,
            displayName: member.displayName,
            nickName: member.nickname,
            avatar: member.avatar,
            userName: member.user.username,
            userAvatar: member.user.avatar,
            roles: member.roles.cache.map(r => r.id),
          })),
        ],
        [] as Return[],
      );

    res.status(200).json(returnData);
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export { apiAllMembers };
