/* eslint-disable no-bitwise */
import { CategoryChannel, ChannelType, Client, OverwriteType } from "discord.js";
import { Request, Response } from "express";
import { prisma } from "libs/prisma";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
});

const apiAllCategoryChannels = async (req: Request, res: Response, client: Client<boolean>) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);

  if (!query.success || userToken === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  const { user_id: userId, guild_id: guildId } = query.data;

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
    const channels = guild?.channels.cache.filter(c => c.type === ChannelType.GuildCategory) as
      | CategoryChannel[]
      | undefined;

    if (guild === undefined || user === undefined || channels === undefined) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const returnData = channels.map(channel => {
      const permissionOverwriteRoles = channel.permissionOverwrites.cache.filter(
        overwrite => overwrite.type === OverwriteType.Role,
      );
      const permissionOverwriteMembers = channel.permissionOverwrites.cache.filter(
        overwrite => overwrite.type === OverwriteType.Member,
      );
      return {
        id: channel.id,
        name: channel.name,
        permissionOverwriteRoles,
        permissionOverwriteMembers,
        parentId: channel.parentId,
      };
    });

    res.status(200).json(returnData);
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export { apiAllCategoryChannels };
