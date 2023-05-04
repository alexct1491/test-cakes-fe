import axios from "axios";
import { APIURL } from "../enviroment/stage";

const useEndPoints = () => {
  return {
    deleteCake: (id: string) => axios.delete(`${APIURL}/cakes/${id}`),
    getCakes: () => axios.get(`${APIURL}/cakes`),
    getCake: (id: string) => axios.get(`${APIURL}/cakes/${id}`),
    login: (body: { username: string; password: string }) =>
      axios.post(`${APIURL}/auth/login`, body),
    checkAuth: (token: string) =>
      axios.get(`${APIURL}/auth/check-auth`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    addQuantity: (id: string, quantity: number | string) =>
      axios.put(`${APIURL}/cakes/add-quantity/${id}`, { quantity }),
  };
};

export default useEndPoints;
