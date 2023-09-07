import axios from "axios";

type KeyType = {
  token: string;
  params: { [key: string]: unknown };
};

const discordAPI = ({ token, params }: KeyType) =>
  axios.create({
    baseURL: "https://discord.com/api/v10",
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

export { discordAPI };
