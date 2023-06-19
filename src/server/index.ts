import express from "express";
import { createServer } from "http";
import next, { NextApiHandler, NextApiRequest } from "next";
import { Server as SocketioServer } from "socket.io";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle: NextApiHandler = app.getRequestHandler();

const botToken = process.env.DISCORD_BOT_TOKEN;
const allIntents = Object.values(GatewayIntentBits).filter(v => !Number.isNaN(Number(v))) as number[];

app.prepare().then(() => {
  const socketApp = express();
  const socketServer = createServer(socketApp);
  const client = new Client({ intents: allIntents });
  const io = new SocketioServer(socketServer);

  client.once("ready", () => {
    console.log("ready!!");
  });

  client.on("messageCreate", message => {
    console.log("message");
    if (!message.author.bot) {
      console.log(message.content);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socketApp.all("*", (req: NextApiRequest, res: any) => handle(req, res));
  socketServer.listen(port, () => {
    console.log(`Ready on http://localhost:${port}`);
  });

  client.login(botToken);
});
