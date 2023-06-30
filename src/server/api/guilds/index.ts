import { Client } from "discord.js";
import { Request, Response } from "express";
import prisma from "libs/prisma";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
});

const apiGuild = async (req: Request, res: Response, client: Client<boolean>) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);

  if (!query.success || userToken === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  const { user_id: userId, guild_id: guildId } = query.data;

  try {
    const guild = client.guilds.cache.find(g => g.id === guildId);
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

    if (guild !== undefined && guild.members.cache.some(m => m.id === userId)) {
      res.status(200).json({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
      });
      return;
    }

    res.status(200).json(null);
    return;
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export default apiGuild;
