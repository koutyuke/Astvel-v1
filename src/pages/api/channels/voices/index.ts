/* eslint-disable no-bitwise */
import { isAxiosError } from "axios";
import {
  APIGuild,
  APIGuildChannel,
  APIGuildMember,
  ChannelType,
  OverwriteType,
  PermissionFlagsBits,
  Routes,
} from "discord.js";
import createDiscordAPI from "libs/axios/createDiscordAPI";
import prisma from "libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  channel_id: z.string(),
  user_id: z.string(),
});

const discordAPI = createDiscordAPI(`Bot ${process.env.DISCORD_BOT_TOKEN}`);

const permissionChecher = (permissions: bigint | number, target: bigint) => (BigInt(permissions) & target) === target;

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!query.success || userToken === undefined) {
    return res.status(400).json({ message: "Bad Request" });
  }
  if (botToken === undefined) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  const { user_id: userId, guild_id: guildId, channel_id: channelId } = query.data;

  try {
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: userId,
        },
      },
    });

    if (account === null || account.access_token === null || account.access_token !== userToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [{ roles: guildRoles, owner_id: ownerId }, { roles: userRoleIds }, channel] = await Promise.all([
      discordAPI.get<APIGuild>(Routes.guild(guildId)).then(g => g.data),
      discordAPI.get<APIGuildMember>(Routes.guildMember(guildId, userId)).then(u => u.data),
      discordAPI
        .get<APIGuildChannel<ChannelType.GuildVoice>>(Routes.channel(channelId))
        .then(c => (c.data.type === ChannelType.GuildVoice ? c.data : undefined)),
    ]);

    const everyone = guildRoles.find(role => role.id === guildId)?.permissions;

    if (everyone === undefined || channel === undefined) {
      return res.status(400).json({ message: "Bad Request" });
    }

    let permissions = BigInt(everyone);
    guildRoles.forEach(guildRole => {
      if (userRoleIds.includes(guildRole.id)) {
        permissions |= BigInt(guildRole.permissions);
      }
    });

    const permissionOverwriteRoles =
      channel.permission_overwrites?.filter(overwrite => overwrite.type === OverwriteType.Role) ?? [];
    const permissionOverwriteMembers =
      channel.permission_overwrites?.filter(overwrite => overwrite.type === OverwriteType.Member) ?? [];

    const returnData = {
      id: channel.id,
      name: channel.name,
      permissionOverwriteRoles,
      permissionOverwriteMembers,
      parentId: channel.parent_id,
    };

    // owenr
    if (ownerId === userId) {
      // console.log("owner");
      return res.status(200).json(returnData);
    }

    // admin
    if (permissionChecher(permissions, PermissionFlagsBits.Administrator)) {
      // console.log("admin");
      return res.status(200).json(returnData);
    }

    // create overwrited permission
    let allow = BigInt(0);
    let deny = BigInt(0);
    const overwriteEveryone = permissionOverwriteRoles.find(role => role.id === guildId);
    const overwriteMember = permissionOverwriteMembers.find(m => m.id === userId);

    if (overwriteEveryone) {
      permissions &= ~BigInt(overwriteEveryone.deny);
      permissions |= BigInt(overwriteEveryone.allow);
    }

    userRoleIds.forEach(userRoleId => {
      const overwriteRole = permissionOverwriteRoles.find(r => r.id === userRoleId);
      if (overwriteRole) {
        allow |= BigInt(overwriteRole.allow);
        deny |= BigInt(overwriteRole.deny);
      }
    });

    permissions &= ~deny;
    permissions |= allow;

    if (overwriteMember) {
      permissions &= ~BigInt(overwriteMember.deny);
      permissions |= BigInt(overwriteMember.allow);
    }

    // access ok
    if (
      permissionChecher(permissions, PermissionFlagsBits.Connect) &&
      permissionChecher(permissions, PermissionFlagsBits.ViewChannel) &&
      permissionChecher(permissions, PermissionFlagsBits.MoveMembers)
    ) {
      // console.log("sccess ok")
      return res.status(200).json(returnData);
    }

    return res.status(200).json(null);
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      // console.log(e.response);
      return res.status(e.response.status).json(e.response.data);
    }
    return res.status(400).json({ message: "Bad Request" });
  }
};

export default index;
