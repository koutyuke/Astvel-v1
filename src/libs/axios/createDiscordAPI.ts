import axios from "axios";

const createDiscordAPI = (token: string) =>
  axios.create({
    baseURL: "https://discord.com/api/v10",
    headers: { Authorization: token },
  });

export default createDiscordAPI;
