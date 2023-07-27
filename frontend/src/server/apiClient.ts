import config from "@/config";
import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});

export default apiClient;
