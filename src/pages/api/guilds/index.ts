import { isAxiosError } from "axios";
import { APIGuild, APIGuildMember, Routes } from "discord.js";
import createDiscordAPI from "libs/axios/createDiscordAPI";
import prisma from "libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  guild_id: z.string(),
  user_id: z.string(),
});

const discordAPI = createDiscordAPI(`Bot ${process.env.DISCORD_BOT_TOKEN}`);

const apiGuilds = async (req: NextApiRequest, res: NextApiResponse) => {
  const userToken = req.headers.authorization?.replace("Bearer ", "");
  const query = schema.safeParse(req.query);
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!query.success || userToken === undefined) {
    return res.status(400).json({ message: "Bad Request" });
  }
  if (botToken === undefined) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  const { user_id: userId, guild_id: guildId } = query.data;

  try {
    const [, guildData] = await Promise.all([
      discordAPI.get<APIGuildMember>(Routes.guildMember(guildId, userId)),
      discordAPI.get<APIGuild>(Routes.guild(guildId)).then(r => r.data),
    ]);

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

    return res.status(200).json({
      id: guildData.id,
      name: guildData.name,
      icon: guildData.icon,
    });
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      // console.log(e);
      return res.status(e.response.status).json({ message: e.response.statusText });
    }
    return res.status(400).json({ message: "Bad Request" });
  }
};

export default apiGuilds;
