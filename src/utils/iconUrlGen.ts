const baseUrl = "https://cdn.discordapp.com/embed/avatars/0.png";

const avatarUrlGen = (id: string, avatar: string | null) =>
  avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : baseUrl;

const guildIconUrlGen = (id: string, icon: string) => `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

export { avatarUrlGen, guildIconUrlGen };
