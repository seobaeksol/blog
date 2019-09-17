import axios from 'axios';

const client = axios.create();

/*
  Global Configuration Examples:

  client.defaults.baseURL = '';
  client.defaults.headers.common['Authorization'] = '';
  axios.intercepter.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error)
    }
  )
*/

export default client;
