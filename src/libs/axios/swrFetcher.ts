import axios from "axios";

type KeyType = {
  url: string;
  token: string;
  params: object;
};

const fetcherWithBearer = ({ url, token, params }: KeyType) =>
  axios.get(url, { headers: { Authorization: `Bearer ${token}` }, params }).then(res => res.data);
export default fetcherWithBearer;
