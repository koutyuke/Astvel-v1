import express from "express";
import { createServer } from "http";
import next, { NextApiHandler, NextApiRequest } from "next";
import { Server as SocketioServer } from "socket.io";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import apiGuild from "./api/guilds";
import apiVoiceChannel from "./api/channels/voices";
import apiAllVoiceChannels from "./api/channels/voices/all";
import apiCategoryChannel from "./api/channels/categories/indx";
import apiAllCategoryChannels from "./api/channels/categories/all";
import apiMember from "./api/members";
import apiAllMembers from "./api/members/all";
import apiRole from "./api/roles";
import apiAllRoles from "./api/roles/all";
import apiMove from "./api/move";

dotenv.config();
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle: NextApiHandler = app.getRequestHandler();

const botToken = process.env.DISCORD_BOT_TOKEN;
const allIntents = Object.values(GatewayIntentBits).filter(v => !Number.isNaN(Number(v))) as number[];
const client = new Client({ intents: allIntents });

app.prepare().then(() => {
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  const socketServer = createServer(expressApp);

  const io = new SocketioServer(socketServer);

  expressApp.get("/api/guilds", (req: express.Request, res: express.Response) => {
    apiGuild(req, res, client);
  });

  expressApp.get("/api/members", (req: express.Request, res: express.Response) => {
    apiMember(req, res, client);
  });

  expressApp.get("/api/members/all", (req: express.Request, res: express.Response) => {
    apiAllMembers(req, res, client);
  });

  expressApp.get("/api/roles", (req: express.Request, res: express.Response) => {
    apiRole(req, res, client);
  });

  expressApp.get("/api/roles/all", (req: express.Request, res: express.Response) => {
    apiAllRoles(req, res, client);
  });

  expressApp.get("/api/channels/categories", (req: express.Request, res: express.Response) => {
    apiCategoryChannel(req, res, client);
  });

  expressApp.get("/api/channels/categories/all", (req: express.Request, res: express.Response) => {
    apiAllCategoryChannels(req, res, client);
  });

  expressApp.get("/api/channels/voices", (req: express.Request, res: express.Response) => {
    apiVoiceChannel(req, res, client);
  });

  expressApp.get("/api/channels/voices/all", (req: express.Request, res: express.Response) => {
    apiAllVoiceChannels(req, res, client);
  });

  expressApp.patch("/api/move", (req: express.Request, res: express.Response) => {
    apiMove(req, res, client);
  });

  client.once("ready", () => {
    // eslint-disable-next-line no-console
    console.log("ready!!");
  });

  client.on("messageCreate", message => {
    if (!message.author.bot) {
      console.log(message.content);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expressApp.all("*", (req: NextApiRequest, res: any) => handle(req, res));
  socketServer.listen(port, () => {
    console.log(`Ready on http://localhost:${port}`);
  });

  client.login(botToken);
});
