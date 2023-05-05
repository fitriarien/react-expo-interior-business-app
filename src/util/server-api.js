import axios from 'axios';
import { Alert } from 'react-native';

const serverApi = axios.create({
  baseURL: 'http://192.168.101.13:8081/',
  responseType: 'json',
  withCredentials: true,
});

serverApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Alert.alert('Something error while fetching');
  return Promise.reject(error.message);
})

export default serverApi;