/* eslint-disable no-bitwise */
import { ChannelType, Client, OverwriteType, PermissionFlagsBits, VoiceChannel } from "discord.js";
import { Request, Response } from "express";
import { prisma } from "libs/prisma";
import { permissionCheck } from "utils/permissionCheck";
import { z } from "zod";

const querySchema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
});

const bodySchema = z.array(
  z.object({
    id: z.string(),
    members: z.array(z.string()),
  }),
);

const apiMove = async (req: Request, res: Response, client: Client<boolean>) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = querySchema.safeParse(req.query);
  const body = bodySchema.safeParse(req.body);

  if (!query.success || !body.success || userToken === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  const { user_id: userId, guild_id: guildId } = query.data;
  const reqChannels = body.data;

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

    const organizedChannels = channels.map(channel => {
      const permissionOverwriteRoles = channel.permissionOverwrites.cache.filter(
        overwrite => overwrite.type === OverwriteType.Role,
      );
      const permissionOverwriteMembers = channel.permissionOverwrites.cache.filter(
        overwrite => overwrite.type === OverwriteType.Member,
      );
      return {
        id: channel.id,
        permissionOverwriteRoles,
        permissionOverwriteMembers,
      };
    });

    const accessibleChannelIds =
      ownerId === account.providerAccountId || permissionCheck(basePermissions, PermissionFlagsBits.Administrator)
        ? organizedChannels.map(({ id }) => id)
        : organizedChannels
            .filter(({ permissionOverwriteMembers, permissionOverwriteRoles }) => {
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

              return (
                permissionCheck(channelPermission, PermissionFlagsBits.Connect) &&
                permissionCheck(channelPermission, PermissionFlagsBits.ViewChannel) &&
                permissionCheck(channelPermission, PermissionFlagsBits.MoveMembers)
              );
            })
            .map(({ id }) => id);

    reqChannels.forEach(reqChannel => {
      reqChannel.members.forEach(reqMemberId => {
        const member = guild.members.cache.find(({ id }) => reqMemberId !== "" && id === reqMemberId);
        if (member === undefined) {
          return;
        }
        if (
          member.voice.channelId === null ||
          member.voice.channel === null ||
          member.voice.channel.type !== ChannelType.GuildVoice
        ) {
          return;
        }
        if (
          accessibleChannelIds.some(id => id === member.voice.channelId) &&
          accessibleChannelIds.some(id => id === reqChannel.id)
        ) {
          member.voice.setChannel(reqChannel.id).catch(() => {});
        }
      });
    });

    res.status(200).json({ message: "OK" });
  } catch {
    res.status(400).json({ message: "Bad Request" });
  }
};

export { apiMove };
