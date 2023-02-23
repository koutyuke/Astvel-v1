import axios from "axios";

const getWithAuthorization = <T>(url: string, token: string) =>
  axios.get<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default getWithAuthorization;
