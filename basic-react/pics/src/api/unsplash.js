import axios from 'axios';

const key = 'KkFeAA9QCQnNb7fePJjzK4_BzcK6RhnqhgiDvi08sYo';
export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID ${key}`,
  },
});
