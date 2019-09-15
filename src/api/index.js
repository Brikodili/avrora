import axios from 'axios';
import Cookie from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://68.183.119.148/api',
  headers: {
    Authorization: {
      toString () {
        return `Bearer ${Cookie.get('token')}`
      }
    }
  },
});
