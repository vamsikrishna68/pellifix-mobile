import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://api.pellifix.com/v1'

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error, "error response")
    return error;
  }
);



export async function apiService({
  url = "",
  method = "GET",
  body = null,
  headers = {},
}) {
  const authToken = await AsyncStorage.getItem('@storage_Key')
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (authToken) {
    headers["x-access-token"] = `${authToken}`;
  }
  return axios.request({
    url,
    method,
    headers,
    [dataOrParams]: body,
  });
}