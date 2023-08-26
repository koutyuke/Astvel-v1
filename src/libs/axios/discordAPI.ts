import axios from "axios";

const discordAPI = (token: string) =>
  axios.create({
    baseURL: "https://discord.com/api/v10",
    headers: { Authorization: token },
  });

export { discordAPI };
