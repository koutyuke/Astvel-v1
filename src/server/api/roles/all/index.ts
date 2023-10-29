import { Client } from "discord.js";
import { Request, Response } from "express";
import { prisma } from "libs/prisma";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
});

const apiAllRoles = async (req: Request, res: Response, client: Client<boolean>) => {
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
    const roles = guild?.roles.cache;

    if (guild === undefined || user === undefined || roles === undefined) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const returnData = roles.map(role => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions.bitfield.toString(),
    }));

    res.status(200).json(returnData);
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export { apiAllRoles };
