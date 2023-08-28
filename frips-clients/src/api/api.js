import axios from "axios";
import API_ENDPOINT from "./url";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

export default axiosInstance;
