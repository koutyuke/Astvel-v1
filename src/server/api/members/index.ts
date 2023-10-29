/* eslint-disable no-bitwise */
import { ChannelType, Client, OverwriteType, PermissionFlagsBits, VoiceChannel } from "discord.js";
import { Request, Response } from "express";
import { prisma } from "libs/prisma";
import { permissionCheck } from "utils/permissionCheck";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
  member_id: z.string(),
});

const apiMember = async (req: Request, res: Response, client: Client<boolean>) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);

  if (!query.success || userToken === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  const { user_id: userId, guild_id: guildId, member_id: memberId } = query.data;

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
    const targetChannel = channels?.find(c => c.members.some(m => m.id === memberId));
    const member = targetChannel?.members.find(m => m.id === memberId);

    if (guild === undefined || user === undefined || channels === undefined || everyone === undefined) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }
    if (targetChannel === undefined || member === undefined) {
      res.status(200).json(null);
      return;
    }

    const { roles: guildRoles, ownerId } = guild;
    const { roles: userRoles } = user;

    let permissions = everyone;

    guildRoles.cache.forEach(guildRole => {
      if (userRoles.cache.some(userRole => userRole.id === guildRole.id)) {
        permissions |= guildRole.permissions.bitfield;
      }
    });

    const permissionOverwriteRoles = targetChannel.permissionOverwrites.cache.filter(
      overwrite => overwrite.type === OverwriteType.Role,
    );
    const permissionOverwriteMembers = targetChannel.permissionOverwrites.cache.filter(
      overwrite => overwrite.type === OverwriteType.Member,
    );

    const returnData = {
      id: member.id,
      displayName: member.displayName,
      nickName: member.nickname,
      avatar: member.avatar,
      userName: member.user.username,
      userAvatar: member.user.avatar,
      roles: member.roles.cache.map(r => r.id),
    };

    // owenr
    if (ownerId === account.providerAccountId) {
      // console.log("owner");
      res.status(200).json(returnData);
      return;
    }

    // admin
    if (permissionCheck(permissions, PermissionFlagsBits.Administrator)) {
      // console.log("admin");
      res.status(200).json(returnData);
      return;
    }

    let allow = BigInt(0);
    let deny = BigInt(0);
    const overwriteEveryone = permissionOverwriteRoles.find(role => role.id === guildId);
    const overwriteMember = permissionOverwriteMembers.find(m => m.id === account.providerAccountId);

    if (overwriteEveryone === undefined) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    if (overwriteEveryone) {
      permissions &= ~overwriteEveryone.deny.bitfield;
      permissions |= overwriteEveryone.allow.bitfield;
    }

    userRoles.cache.forEach(userRole => {
      const overwriteRole = permissionOverwriteRoles.find(r => r.id === userRole.id);
      if (overwriteRole) {
        allow |= overwriteRole.allow.bitfield;
        deny |= overwriteRole.deny.bitfield;
      }
    });

    permissions &= ~deny;
    permissions |= allow;

    if (overwriteMember) {
      permissions &= ~overwriteMember.deny.bitfield;
      permissions |= overwriteMember.allow.bitfield;
    }

    // access ok
    if (
      permissionCheck(permissions, PermissionFlagsBits.Connect) &&
      permissionCheck(permissions, PermissionFlagsBits.ViewChannel) &&
      permissionCheck(permissions, PermissionFlagsBits.MoveMembers)
    ) {
      // console.log("sccess ok")
      res.status(200).json(returnData);
      return;
    }
    res.status(200).json(null);
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export { apiMember };
