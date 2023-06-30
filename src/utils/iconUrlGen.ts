const iconUrlGen = (id: string, avatar: string | null) =>
  avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : "https://cdn.discordapp.com/embed/avatars/0.png";

export default iconUrlGen;
