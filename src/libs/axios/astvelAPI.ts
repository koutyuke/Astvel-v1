import axios from "axios";

type KeyType = {
  token: string;
  params: {
    guild_id: string;
    user_id: string;
  };
};

const astvelAPI = ({ token, params }: KeyType) =>
  axios.create({ headers: { Authorization: `Bearer ${token}` }, params });

export { astvelAPI };
