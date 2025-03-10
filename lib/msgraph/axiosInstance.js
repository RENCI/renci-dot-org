import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://graph.microsoft.com/v1.0",
});

let accessToken = null;
let tokenPromise = null;

apiClient.interceptors.request.use(async (config) => {
  if (accessToken) {
    console.log("Status: Access Token detected")
  }
  if (!accessToken) {
    console.log("Status: No Access Token")
    if (!tokenPromise) {
      console.log("Status: No token promise")
      tokenPromise = axios.get("/api/calendarToken").then((response) => {
        accessToken = response.data.token;
        tokenPromise = null;
        console.log("Status: Token received")
        return accessToken;
      }).catch((error) => {
        tokenPromise = null;
        console.log(error)
        throw error;
      });
    }

    accessToken = await tokenPromise;
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
