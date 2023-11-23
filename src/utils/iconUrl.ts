const baseUrl = "https://cdn.discordapp.com/embed/avatars/0.png";

const genUserAvatar = (id: string, avatar: string | null) =>
  avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : baseUrl;

const genGuildIcon = (id: string, icon: string) => `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

export { genUserAvatar, genGuildIcon };
