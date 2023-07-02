import axios from "axios";

type KeyType = {
  url: string;
  token: string;
  params: object;
};

const getAstvelAPI = <T>({ url, token, params }: KeyType) =>
  axios.get<T>(url, { headers: { Authorization: `Bearer ${token}` }, params }).then(res => res.data);
export default getAstvelAPI;
