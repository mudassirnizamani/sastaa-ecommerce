import axios, {AxiosInstance} from 'axios';
import {config} from '../config';

const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});

export default apiClient;
