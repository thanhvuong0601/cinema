import axios from "axios";
import queryString from "query-string";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  (config) => {
    config.headers = {
      "content-type": "application/json",
      TokenCybersoft: process.env.REACT_APP_TOKEN,
      Authorization: localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : "",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data.content) {
      return response.data.content;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;
