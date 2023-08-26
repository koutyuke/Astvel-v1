import { astvelAPI } from "./astvelAPI";

type KeyType = {
  url: string;
  token: string;
  params: {
    guild_id: string;
    user_id: string;
  } & { [key: string]: unknown };
};

const swrAstvelFetcher = ({ url, token, params }: KeyType) =>
  astvelAPI({
    token,
    params: {
      guild_id: params.guild_id,
      user_id: params.user_id,
    },
  }).get(url, { params });
export { swrAstvelFetcher };
