import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://minths-shop-api.onrender.com/api/",
});
