/* eslint-disable no-bitwise */
import { CategoryChannel, ChannelType, Client, OverwriteType } from "discord.js";
import { Request, Response } from "express";
import prisma from "libs/prisma";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  category_id: z.string(),
  user_id: z.string(),
});

const apiCategoryChannel = async (req: Request, res: Response, client: Client<boolean>) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);

  if (!query.success || userToken === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  const { user_id: userId, guild_id: guildId, category_id: channelId } = query.data;

  try {
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: userId,
        },
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
    const user = guild?.members.cache.find(u => u.id === userId);
    const channel = guild?.channels.cache.find(c => c.id === channelId && c.type === ChannelType.GuildCategory) as
      | CategoryChannel
      | undefined;

    if (guild === undefined || user === undefined || channel === undefined) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const permissionOverwriteRoles = channel.permissionOverwrites.cache.filter(
      overwrite => overwrite.type === OverwriteType.Role,
    );
    const permissionOverwriteMembers = channel.permissionOverwrites.cache.filter(
      overwrite => overwrite.type === OverwriteType.Member,
    );

    const returnData = {
      id: channel.id,
      name: channel.name,
      permissionOverwriteRoles,
      permissionOverwriteMembers,
      parentId: channel.parentId,
    };

    res.status(200).json(returnData);
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export default apiCategoryChannel;
