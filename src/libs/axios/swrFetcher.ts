import { astvelAPI } from "./astvelAPI";
import { discordAPI } from "./discordAPI";

type AstvelKeyType = {
  url: string;
  token: string;
  params: {
    guild_id: string;
    user_id: string;
  } & { [key: string]: unknown };
};

type DiscordKeyType = {
  url: string;
  token: string;
  params: { [key: string]: unknown };
};

const swrAstvelFetcher = ({ url, token, params }: AstvelKeyType) =>
  astvelAPI({
    token,
    params: {
      guild_id: params.guild_id,
      user_id: params.user_id,
    },
  })
    .get(url, { params })
    .then(res => res.data);

const swrDiscordFetcher = ({ url, token, params }: DiscordKeyType) =>
  discordAPI({ token, params: {} })
    .get(url, { params })
    .then(res => res.data);

export { swrAstvelFetcher, swrDiscordFetcher };
