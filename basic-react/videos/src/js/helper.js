import axios from 'axios';
import { API_KEY } from './config.js';

export const axiosYoutube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: API_KEY,
  },
});
